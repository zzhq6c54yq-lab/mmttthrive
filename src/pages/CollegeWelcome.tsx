
import React from "react";
import { GraduationCap, Book, Brain, Coffee, HeartPulse, Users } from "lucide-react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";

const CollegeWelcome: React.FC = () => {
  const whatToExpect = [
    "Access to specialized resources for managing academic stress, exam anxiety, and campus life challenges",
    "Interactive tools to help balance studies, social life, work, and mental health",
    "Peer support networks connecting you with other students facing similar challenges",
    "Expert-led workshops on study techniques, time management, and stress reduction",
    "Assessment tools to identify your specific needs and strengths as a student",
    "Personalized recommendations for maintaining wellness during high-pressure academic periods"
  ];

  return (
    <SpecializedProgramWelcome
      title="College Student Wellness"
      description="Welcome to specialized mental wellness resources designed for college and university students. Navigate the unique challenges of academic life while prioritizing your mental health."
      whatToExpect={whatToExpect}
      color="purple-600"
      gradientFrom="purple-700"
      gradientTo="indigo-500"
      borderColor="#8B5CF6"
      portalPath="/college-portal"
      icon={<GraduationCap className="h-12 w-12 text-purple-300" />}
    />
  );
};

export default CollegeWelcome;
