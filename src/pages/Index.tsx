import React from "react";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import CrisisOverlay from "@/components/crisis/CrisisOverlay";

const Index = () => {
  return (
    <div className="min-h-screen">
      <OnboardingContainer />
      <CrisisOverlay />
    </div>
  );
};

export default Index;
