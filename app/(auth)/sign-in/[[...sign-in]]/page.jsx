import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex justify-center mt-8 mb-16 px-4">
      <SignIn />
    </div>
  );
}