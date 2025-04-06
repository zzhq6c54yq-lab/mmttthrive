
import React from "react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";
import { GraduationCap } from "lucide-react";

const CollegeWelcome: React.FC = () => {
  return (
    <SpecializedProgramWelcome
      title="College Experience Portal"
      description="Welcome to a mental wellness space designed specifically for students navigating the unique challenges of college life. This portal offers resources to help you thrive academically while maintaining your mental wellbeing."
      whatToExpect={[
        "Strategies for managing academic stress and exam anxiety",
        "Tools for balancing studies, social life, and self-care",
        "Resources for common mental health challenges faced by students",
        "Peer support networks to connect with other college students",
        "Sleep, nutrition, and exercise guidance tailored for campus life",
        "Study techniques and time management strategies for academic success"
      ]}
      color="purple-600"
      gradientFrom="purple-500"
      gradientTo="indigo-600" 
      borderColor="#8B5CF6"
      portalPath="/college-portal"
      icon={<GraduationCap className="h-12 w-12 text-purple-400" />}
    />
  );
};

export default CollegeWelcome;
