
import React from "react";
import { Button } from "@/components/ui/button";
import { LifeBuoy } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface SupportResourcesProps {
  onResourceClick: (resource: string) => void;
}

const SupportResources: React.FC<SupportResourcesProps> = ({ onResourceClick }) => {
  const { preferredLanguage, isSpanish, isPortuguese } = useTranslation();
  
  const texts = {
    title: {
      'English': 'Need Assistance?',
      'Español': '¿Necesita Ayuda?',
      'Português': 'Precisa de Ajuda?'
    },
    description: {
      'English': 'Resources for emergency help, caregiver support, or technical assistance.',
      'Español': 'Recursos para ayuda de emergencia, apoyo al cuidador o asistencia técnica.',
      'Português': 'Recursos para ajuda de emergência, suporte ao cuidador ou assistência técnica.'
    },
    emergency: {
      'English': 'Emergency Resources',
      'Español': 'Recursos de Emergencia',
      'Português': 'Recursos de Emergência'
    },
    technical: {
      'English': 'Technical Support',
      'Español': 'Soporte Técnico',
      'Português': 'Suporte Técnico'
    }
  };
  
  const title = texts.title[preferredLanguage as keyof typeof texts.title] || texts.title['English'];
  const description = texts.description[preferredLanguage as keyof typeof texts.description] || texts.description['English'];
  const emergencyText = texts.emergency[preferredLanguage as keyof typeof texts.emergency] || texts.emergency['English'];
  const technicalText = texts.technical[preferredLanguage as keyof typeof texts.technical] || texts.technical['English'];

  return (
    <div className="bg-amber-900/20 border border-amber-300/30 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="mb-4 md:mb-0">
        <div className="flex items-center">
          <LifeBuoy className="h-5 w-5 text-amber-300 mr-2" />
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        <p className="text-sm text-amber-100">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          size="sm" 
          className="bg-amber-700 hover:bg-amber-800 text-white"
          onClick={() => onResourceClick("Emergency Resources")}
        >
          {emergencyText}
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-amber-400 text-amber-100 hover:bg-amber-900/50"
          onClick={() => onResourceClick("Technical Support")}
        >
          {technicalText}
        </Button>
      </div>
    </div>
  );
};

export default SupportResources;
