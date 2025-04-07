
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
    <div className="min-h-screen text-white py-8 px-4 relative">
      {/* College-themed background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#2d1b44] via-[#342456] to-[#2b2136]">
        {/* Subtle patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 h-full">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="h-4 w-4 absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: 'radial-gradient(circle, rgba(139,92,246,1) 0%, rgba(139,92,246,0) 70%)',
                  animation: 'pulse 4s infinite',
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
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
        textColor="text-white"
        descriptionTextColor="text-white/90"
        backgroundColor="bg-gradient-to-b from-[#2d1b44] via-[#342456] to-[#2b2136]"
      />
    </div>
  );
};

export default CollegeWelcome;
