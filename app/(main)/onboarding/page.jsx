import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import { getUserOnboardingStatus } from "@/actions/user";
import OnBoardingForm from "./_components/onboarding-form";

const OnboardingPage = async() => {
  // Check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnBoardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;