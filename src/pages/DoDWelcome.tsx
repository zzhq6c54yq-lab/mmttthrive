
import React from "react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";
import { Shield } from "lucide-react";

const DoDWelcome: React.FC = () => {
  return (
    <SpecializedProgramWelcome
      title="Department of Defense Portal"
      description="Welcome to our dedicated mental wellness space for military personnel, veterans, and their families. This portal provides specialized resources tailored to the unique challenges faced by the military community."
      whatToExpect={[
        "Access to specialized PTSD and combat stress management resources",
        "Tools specifically designed to support transition to civilian life",
        "Family support resources for deployments and military lifestyle",
        "Peer community connections with other service members and veterans",
        "Evidence-based assessments designed for military-specific challenges",
        "Access to workshops led by professionals with military experience"
      ]}
      color="blue-600"
      gradientFrom="blue-500"
      gradientTo="blue-700"
      borderColor="#0EA5E9"
      portalPath="/dod-portal"
      icon={<Shield className="h-12 w-12 text-blue-400" />}
    />
  );
};

export default DoDWelcome;
