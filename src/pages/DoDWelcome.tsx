
import React from "react";
import { Shield, Star, Flag, Medal, Heart } from "lucide-react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";

const DoDWelcome: React.FC = () => {
  const whatToExpect = [
    "Access to specialized PTSD and combat stress management resources developed by experts with military experience",
    "Tools specifically designed to support transition to civilian life, including career resources and adjustment strategies",
    "Family support resources for deployments, relocations, and navigating the unique challenges of military family life",
    "Peer community connections with other service members and veterans who understand your experiences",
    "Evidence-based assessments designed for military-specific challenges, with confidential results",
    "Access to workshops led by professionals with military experience who understand your unique challenges"
  ];

  return (
    <div className="min-h-screen text-white py-8 px-4 relative">
      {/* Enhanced patriotic background with American flag elements */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0a1845] via-[#0c1b44] to-[#1a1e2c]">
        {/* Red and white stripes - more visible */}
        <div className="absolute bottom-0 left-0 right-0 h-full opacity-25">
          {[...Array(13)].map((_, i) => (
            <div 
              key={i} 
              className={`h-[7.69%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
            />
          ))}
        </div>
        
        {/* Stars field in the upper left */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 opacity-30">
          <div className="grid grid-cols-6 gap-6 p-6">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="text-white">
                <Star className="h-5 w-5 fill-white" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional patriotic elements */}
        <div className="absolute top-1/4 right-1/4 opacity-20">
          <Flag className="h-32 w-32 text-white" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-10">
          <Medal className="h-40 w-40 text-amber-300" />
        </div>
      </div>
      
      <SpecializedProgramWelcome
        title="Service Members & Veterans - We Honor Your Service"
        description="Welcome to a dedicated space created with deep appreciation for your sacrifice and commitment to our nation. Your service has protected our freedom, and now we're here to support your well-being journey with resources tailored specifically for those who have bravely worn the uniform."
        whatToExpect={whatToExpect}
        color="blue-600"
        gradientFrom="blue-700"
        gradientTo="blue-500"
        borderColor="#3B82F6"
        portalPath="/dod-portal"
        icon={<Shield className="h-12 w-12 text-blue-300" />}
        textColor="text-white"
        descriptionTextColor="text-white"
        backgroundColor="bg-gradient-to-b from-[#0a1845] via-[#0c1b44] to-[#1a1e2c]"
      />
    </div>
  );
};

export default DoDWelcome;
