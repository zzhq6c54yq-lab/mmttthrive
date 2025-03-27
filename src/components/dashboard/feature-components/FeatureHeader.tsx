
import React from "react";
import { Sparkles } from "lucide-react";

interface FeatureHeaderProps {
  title: string;
  subtitle: string;
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
          {title}
        </h2>
        <p className="text-gray-300 mt-2">{subtitle}</p>
      </div>
      <div className="hidden md:block">
        <Sparkles className="h-12 w-12 text-[#E5C5A1] opacity-60 animate-pulse" />
      </div>
    </div>
  );
};

export default FeatureHeader;
