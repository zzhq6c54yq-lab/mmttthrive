
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeaserScreenProps {
  onContinue: () => void;
}

const TeaserScreen: React.FC<TeaserScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
        Small Business Mental Health
      </h1>
      <div className="max-w-2xl mb-8">
        <p className="text-xl mb-6 text-white/90 font-medium">
          Our specialized program for small business owners and employees
          focuses on the unique mental health challenges of entrepreneurship.
        </p>
      </div>
      <Button 
        onClick={onContinue}
        className="bg-[#F97316] hover:bg-[#FB923C] text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
      >
        Continue to Portal <ArrowRight className="ml-1 h-5 w-5" />
      </Button>
    </div>
  );
};

export default TeaserScreen;
