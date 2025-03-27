
import React from "react";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PortalOption from "./PortalOption";

interface PortalOptionsScreenProps {
  onSelectOption: (option: 'business' | 'employee') => void;
}

const PortalOptionsScreen: React.FC<PortalOptionsScreenProps> = ({ onSelectOption }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border-[#B87333]/40 hover:border-[#B87333] transition-all duration-300 transform hover:scale-105"
          onClick={() => navigate("/", { state: { screenState: 'main' } })}
          aria-label="Return to main screen"
          title="Return to main screen"
        >
          <span className="sr-only">Return home</span>
          <ArrowRight className="h-4 w-4 text-white/70" />
        </Button>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
        Choose Your Path
      </h1>
      
      <div className="max-w-5xl w-full mx-auto mb-10">
        <p className="text-xl mb-8 text-white/90 font-medium">
          Select the program that best matches your needs:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <PortalOption 
            title="Business Hub"
            description="Resources designed for entrepreneurs and business owners managing the stress of running a business."
            icon={<Briefcase className="h-6 w-6 text-white" />}
            onClick={() => onSelectOption('business')}
            gradient="from-[#F97316]/80 to-[#FB923C]/80"
            borderColor="#F97316"
          />
          
          <PortalOption 
            title="Employee Readiness"
            description="Support and tools for employees in the workforce to maintain mental health and achieve work-life balance."
            icon={<Users className="h-6 w-6 text-white" />}
            onClick={() => onSelectOption('employee')}
            gradient="from-[#22C55E]/80 to-[#4ADE80]/80"
            borderColor="#22C55E"
          />
        </div>
      </div>
    </div>
  );
};

export default PortalOptionsScreen;
