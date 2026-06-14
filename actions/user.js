"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // 1. Query the database first OUTSIDE the transaction block
    let industryInsight = await db.industryInsight.findUnique({
      where: {
        industry: data.industry,
      },
    });

    // 2. Fetch Gemini AI insights OUTSIDE the transaction if they don't exist
    // This stops slow external network requests from holding your database connection pool hostage.
    if (!industryInsight) {
      const insights = await generateAIInsights(data.industry);

      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // 3. Start a very fast database transaction solely for local write queries
    const result = await db.$transaction(
      async (tx) => {
        // FIX: Safely split and trim comma-separated user inputs into a true array of strings (String[])
        const parsedSkills = typeof data.skills === "string"
          ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
          : [];

        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: parseInt(data.experience, 10) || 0, // Enforces integer validation
            bio: data.bio,
            skills: parsedSkills, // Correctly mapped to your schema's String[] array field
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // 10 seconds is now massive overkill since this operation completes in under 50ms
      }
    );

    revalidatePath("/");
    return result.updatedUser;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error(error.message || "Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}