
import React from "react";
import { Siren } from "lucide-react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";

const FirstRespondersWelcome = () => {
  const whatToExpect = [
    "24/7 crisis support tailored for emergency service professionals",
    "Peer support networks with other first responders",
    "Stress management tools for high-pressure situations",
    "Post-incident trauma and decompression resources",
    "Work-life balance strategies for shift workers",
    "Family support services for emergency personnel"
  ];

  return (
    <SpecializedProgramWelcome
      title="First Responders Program"
      description="Supporting the mental health and wellbeing of our emergency service professionals through specialized resources and peer support."
      whatToExpect={whatToExpect}
      color="red-600"
      gradientFrom="red-600"
      gradientTo="red-500"
      borderColor="#DC2626"
      portalPath="/first-responders-portal"
      icon={<Siren className="h-12 w-12 text-white" />}
    />
  );
};

export default FirstRespondersWelcome;
