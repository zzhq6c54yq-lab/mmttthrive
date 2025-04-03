
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, X, ArrowRight, ArrowLeft } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  isWelcome?: boolean;
  userName?: string;
}

interface FeatureTutorialProps {
  featureId: string;
  onClose: () => void;
  embedded?: boolean;
  userName?: string;
}

const FeatureTutorial: React.FC<FeatureTutorialProps> = ({ featureId, onClose, embedded = false, userName = "" }) => {
  const { isSpanish, getTranslatedText } = useTranslation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Get tutorial content for this feature
  const tutorialSteps = getTutorialSteps(featureId, userName, isSpanish);
  const currentTutorial = tutorialSteps[currentStepIndex]; 
  
  const handleNext = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  return (
    <Card className={`${embedded ? "" : "w-full max-w-md"} bg-white/10 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden`}>
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 z-10 rounded-full bg-black/20 text-white hover:bg-black/30 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">{isSpanish ? "Cerrar" : "Close"}</span>
        </Button>
        
        {currentTutorial.image && (
          <div className="w-full flex justify-center items-center py-6 border-b border-white/10 bg-gradient-to-r from-[#181820] via-[#221F26] to-[#181820]">
            <img 
              src={currentTutorial.image} 
              alt={currentTutorial.title} 
              className={currentTutorial.isWelcome ? "h-20 w-20 object-contain" : "h-24 w-24 object-contain"}
            />
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl text-white">
          {currentTutorial.isWelcome && userName 
            ? `${currentTutorial.title}, ${userName}!` 
            : currentTutorial.title}
        </CardTitle>
        {tutorialSteps.length > 1 && (
          <div className="flex items-center justify-center mt-2">
            {tutorialSteps.map((_, index) => (
              <div 
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  index === currentStepIndex ? "bg-[#B87333]" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <p className="text-white/90">{currentTutorial.description}</p>
        
        {currentStepIndex === 0 && (
          <div className="mt-4 bg-black/20 p-3 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full border-2 border-[#B87333] bg-gradient-to-br from-[#181820] to-[#1f1a25] flex items-center justify-center">
                <div className="text-[#B87333] font-bold text-lg leading-none tracking-tighter flex flex-col items-center">
                  <span className="text-[7px] opacity-80 mb-0.5">THRIVE</span>
                  <span>MT</span>
                </div>
              </div>
              <p className="text-sm text-white/80">
                {getTranslatedText('tutorialButtonHelp')}
              </p>
            </div>
          </div>
        )}
        
        {featureId === "dashboard" && currentStepIndex === 1 && (
          <div className="mt-4 space-y-3">
            <div className="bg-black/20 p-3 rounded-lg border border-white/10">
              <h3 className="text-[#B87333] font-medium mb-1">Key Features</h3>
              <p className="text-sm text-white/80">Access mental wellness workshops, games, tools, and personalized resources designed to support your journey.</p>
            </div>
            
            <div className="bg-black/20 p-3 rounded-lg border border-white/10">
              <h3 className="text-[#B87333] font-medium mb-1">Navigation Help</h3>
              <p className="text-sm text-white/80">Use the Thrive MT button in the top right corner to access this tutorial anytime you need guidance.</p>
            </div>
          </div>
        )}
        
        {featureId === "dashboard" && currentStepIndex === 2 && (
          <div className="mt-4 space-y-3">
            <div className="bg-black/20 p-3 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <div>
                <h3 className="text-[#B87333] font-medium mb-1">Meet Henry</h3>
                <p className="text-sm text-white/80">Your AI mental health companion is always ready to help guide you through the platform.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {tutorialSteps.length > 1 && currentStepIndex > 0 ? (
          <Button 
            variant="outline" 
            className="border-white/20 text-white/80 hover:bg-white/10"
            onClick={handlePrevious}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {isSpanish ? "Anterior" : "Previous"}
          </Button>
        ) : (
          <div></div>
        )}
        
        <Button 
          className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white"
          onClick={handleNext}
        >
          {currentStepIndex < tutorialSteps.length - 1 ? (
            <>
              {isSpanish ? "Siguiente" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <ArrowRight className="mr-2 h-4 w-4" /> {isSpanish ? "Finalizar" : "Finish"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Tutorial steps for different features
const getTutorialSteps = (featureId: string, userName: string = "", isSpanish: boolean): TutorialStep[] => {
  switch (featureId) {
    case 'dashboard':
      return [
        {
          title: isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT",
          description: isSpanish 
            ? "Tu panel de bienestar mental personalizado está listo. Lo hemos diseñado para apoyar tu viaje hacia una mejor salud mental, centrándote en Horizontes Esperanzadores, Empoderamiento a través de la Educación, Conexiones Nutridas, Resiliencia y Recuperación, y asegurando que Tu Viaje Importa."
            : "Your personalized mental wellness dashboard is ready. We've designed it to support your journey to better mental health, focusing on Hopeful Horizons, Empowerment through Education, Nurtured Connections, Resilience and Recovery, and ensuring Your Journey Matters.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png",
          isWelcome: true,
          userName: userName
        },
        {
          title: isSpanish ? "Explora Tu Panel" : "Explore Your Dashboard",
          description: isSpanish
            ? "Tu panel personalizado te ofrece acceso a todas las herramientas y recursos disponibles para apoyar tu bienestar mental. Descubre talleres, juegos, herramientas y contenido adaptado específicamente para ti."
            : "Your personalized dashboard gives you access to all the tools and resources available to support your mental wellbeing. Discover workshops, games, tools, and content tailored specifically for you.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
        },
        {
          title: isSpanish ? "Ayuda Siempre Disponible" : "Help Always Available",
          description: isSpanish
            ? "Henry, tu compañero de IA para la salud mental, está disponible en cualquier momento para ayudarte a navegar por la plataforma. Haz clic en el botón Henry o en el botón Thrive MT en la esquina superior derecha para obtener ayuda."
            : "Henry, your AI mental health companion, is available anytime to help you navigate the platform. Click the Henry button or the Thrive MT button in the top right corner for assistance.",
          image: "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png"
        }
      ];
    case 'workshops':
      return [
        {
          title: isSpanish ? "Explora Talleres de Bienestar" : "Explore Wellness Workshops",
          description: isSpanish
            ? "Descubre una variedad de talleres diseñados para apoyar diferentes aspectos de tu viaje de salud mental."
            : "Discover a variety of workshops designed to support different aspects of your mental health journey.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
        }
      ];
    default:
      return [
        {
          title: isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT",
          description: isSpanish
            ? "Estamos aquí para apoyar tu viaje de bienestar mental con herramientas y recursos personalizados."
            : "We're here to support your mental wellness journey with personalized resources and tools.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
        }
      ];
  }
};

export default FeatureTutorial;
