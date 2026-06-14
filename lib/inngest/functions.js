import { inngest } from "./client";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client securely using the robust gemini-2.5-flash model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const aiModel = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash", 
  generationConfig: { responseMimeType: "application/json" }
});

export const generateIndustryInsights = inngest.createFunction(
  // 1. First Argument: Grouped Config Object (ID, Name, and Triggers combined!)
  { 
    id: "generate-industry-insights",
    name: "Generate Industry Insights",
    cron: "0 0 * * 0" // Scheduled to run every Sunday at midnight
  }, 
  // 2. Second Argument: Async Handler with Inngest step context
  async ({ step }) => {
    
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    if (!industries || industries.length === 0) return;

    for (const { industry } of industries) {
      const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

      const insights = await step.run(`Process ${industry} market data`, async () => {
        const res = await aiModel.generateContent(prompt);
        const text = res.response.text() || "";
        // Safely strip standard markdown syntax formatting triggers
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        return JSON.parse(cleanedText);
      });

      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);