
import React from "react";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface FeaturedContentProps {
  onFeatureClick: (feature: string) => void;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ onFeatureClick }) => {
  const { preferredLanguage, isSpanish, isPortuguese } = useTranslation();
  
  const texts = {
    title: {
      'English': 'Featured: Legacy Journal',
      'Español': 'Destacado: Diario de Legado',
      'Português': 'Destaque: Diário de Legado'
    },
    description: {
      'English': 'Preserve your life story, wisdom, and memories for future generations. Our guided journaling experience helps you document your journey in a meaningful way that can be shared with loved ones.',
      'Español': 'Preserva tu historia de vida, sabiduría y recuerdos para las futuras generaciones. Nuestra experiencia de diario guiado te ayuda a documentar tu viaje de una manera significativa que puede ser compartida con seres queridos.',
      'Português': 'Preserve sua história de vida, sabedoria e memórias para as gerações futuras. Nossa experiência de diário guiado ajuda você a documentar sua jornada de uma forma significativa que pode ser compartilhada com entes queridos.'
    },
    button: {
      'English': 'Start Your Journal',
      'Español': 'Comienza Tu Diario',
      'Português': 'Comece Seu Diário'
    }
  };
  
  const title = texts.title[preferredLanguage as keyof typeof texts.title] || texts.title['English'];
  const description = texts.description[preferredLanguage as keyof typeof texts.description] || texts.description['English'];
  const buttonText = texts.button[preferredLanguage as keyof typeof texts.button] || texts.button['English'];

  return (
    <div className="bg-amber-900/30 backdrop-blur-md border border-amber-200/30 rounded-xl p-6 mb-10">
      <h2 className="text-2xl font-medium mb-4 flex items-center">
        <Trophy className="mr-2 h-6 w-6 text-amber-300" />
        {title}
      </h2>
      <p className="mb-6 text-amber-50">
        {description}
      </p>
      <Button 
        className="bg-amber-500 hover:bg-amber-600 text-white px-6"
        onClick={() => onFeatureClick("Legacy Journal")}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default FeaturedContent;
