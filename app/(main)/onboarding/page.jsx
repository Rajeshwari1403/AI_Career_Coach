import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import { getUserOnboardingStatus } from "@/actions/user";
import OnBoardingForm from "./_components/onboarding-form";

const OnboardingPage = async ({ searchParams }) => {
  const { isOnboarded } = await getUserOnboardingStatus();

  const params = await searchParams;
  const editMode = params?.edit === "true";

  if (isOnboarded && !editMode) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnBoardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;