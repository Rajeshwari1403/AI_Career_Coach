import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex justify-center mt-[-26px] mb-16 px-4">
      <SignUp />
    </div>
  );
}