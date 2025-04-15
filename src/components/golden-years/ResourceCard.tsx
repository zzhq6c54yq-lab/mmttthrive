
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onResourceClick: (title: string) => void;
  buttonText?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  icon, 
  onResourceClick,
  buttonText
}) => {
  const { preferredLanguage } = useTranslation();
  
  const defaultButtonTexts = {
    'English': 'Explore Resources',
    'Español': 'Explorar Recursos',
    'Português': 'Explorar Recursos'
  };
  
  const finalButtonText = buttonText || defaultButtonTexts[preferredLanguage as keyof typeof defaultButtonTexts] || defaultButtonTexts['English'];

  return (
    <div className="bg-[#1A1811]/70 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl p-6 hover:bg-[#1A1811]/80 hover:border-[#D4AF37]/40 transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-medium text-[#F5DEB3]">{title}</h3>
        <div className="p-2 bg-[#D4AF37]/30 rounded-full">
          {icon}
        </div>
      </div>
      <p className="mb-6 text-white/90">
        {description}
      </p>
      <Button 
        className="w-full bg-[#3A302A] hover:bg-[#5D4C3B] text-white flex items-center justify-center border border-[#D4AF37]/20"
        onClick={() => onResourceClick(title)}
      >
        {finalButtonText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ResourceCard;
