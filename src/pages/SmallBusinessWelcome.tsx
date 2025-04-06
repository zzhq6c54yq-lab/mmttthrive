
import React from "react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";
import { Briefcase } from "lucide-react";

const SmallBusinessWelcome: React.FC = () => {
  return (
    <SpecializedProgramWelcome
      title="Small Business Portal"
      description="Welcome to your dedicated mental wellness space for entrepreneurs and small business employees. Running or working at a small business brings unique challenges – we're here to support your entrepreneurial journey."
      whatToExpect={[
        "Resources tailored for managing the stress of running a business",
        "Support for balancing work demands, financial pressure, and personal wellbeing",
        "Tools to help create a mentally healthy workplace culture",
        "Specialized resources for both business owners and employees",
        "Strategies for managing work-life balance in a small business environment",
        "Access to workshops led by mental health experts with business experience"
      ]}
      color="amber-600"
      gradientFrom="amber-500"
      gradientTo="orange-600"
      borderColor="#F97316"
      portalPath="/small-business-portal"
      icon={<Briefcase className="h-12 w-12 text-amber-400" />}
    />
  );
};

export default SmallBusinessWelcome;
