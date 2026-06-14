import { auth } from "@clerk/nextjs/server";

export default async function TestPage() {
  const { userId } = await auth();

  return (
    <div className="p-10 text-2xl">
      User ID: {userId || "NOT SIGNED IN"}
    </div>
  );
}