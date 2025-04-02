
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Annoyed } from "lucide-react";

interface MoodScreenProps {
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onPrevious: () => void;
}

const MoodScreen: React.FC<MoodScreenProps> = ({ onMoodSelect, onPrevious }) => {
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    title: isSpanish ? "¿Cómo te sientes hoy?" : "How are you feeling today?",
    happy: isSpanish ? "Feliz" : "Happy",
    justOk: isSpanish ? "Más o Menos" : "Just Ok",
    neutral: isSpanish ? "Neutral" : "Neutral",
    down: isSpanish ? "Decaído" : "Feeling Down",
    sad: isSpanish ? "Triste" : "Sad",
    overwhelmed: isSpanish ? "Abrumado" : "Overwhelmed",
    previous: isSpanish ? "Anterior" : "Previous",
    happyTooltip: isSpanish ? "Me siento alegre y optimista hoy" : "I feel joyful and optimistic about today!",
    justOkTooltip: isSpanish ? "Estoy bien, con altibajos hoy" : "I'm managing fine, with ups and downs today",
    neutralTooltip: isSpanish ? "Me siento equilibrado y estable hoy" : "I'm feeling balanced and steady today",
    downTooltip: isSpanish ? "Podría usar un poco de positividad hoy" : "I could use a little boost of positivity today",
    sadTooltip: isSpanish ? "Estoy experimentando emociones más fuertes hoy" : "I'm experiencing some heavier emotions today",
    overwhelmedTooltip: isSpanish ? "Las cosas se sienten intensas, pero busco equilibrio" : "Things feel intense, but I'm seeking balance"
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] animate-fade-in relative overflow-hidden">
      <div className="floating-bg"></div>
      <div className="text-center max-w-md mx-auto px-4 z-10">
        <h2 className="text-2xl md:text-3xl text-white mb-8 gradient-heading">
          {translations.title}
        </h2>
        
        {/* Container with more horizontal space */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 w-full max-w-md mx-auto">
          <button 
            onClick={() => onMoodSelect('happy')}
            className="mood-button group"
            aria-label={translations.happy}
          >
            <Smile className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">{translations.happy}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              {translations.happyTooltip}
            </div>
          </button>
          
          <button 
            onClick={() => onMoodSelect('ok')}
            className="mood-button group"
            aria-label={translations.justOk}
          >
            <Annoyed className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">{translations.justOk}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              {translations.justOkTooltip}
            </div>
          </button>
          
          <button 
            onClick={() => onMoodSelect('neutral')}
            className="mood-button group"
            aria-label={translations.neutral}
          >
            <Meh className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">{translations.neutral}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              {translations.neutralTooltip}
            </div>
          </button>
          
          <button 
            onClick={() => onMoodSelect('down')}
            className="mood-button group"
            aria-label={translations.down}
          >
            <HeartCrack className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block truncate px-1">{translations.down}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              {translations.downTooltip}
            </div>
          </button>
          
          <button 
            onClick={() => onMoodSelect('sad')}
            className="mood-button group"
            aria-label={translations.sad}
          >
            <Frown className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">{translations.sad}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              {translations.sadTooltip}
            </div>
          </button>
          
          <button 
            onClick={() => onMoodSelect('overwhelmed')}
            className="mood-button group"
            aria-label={translations.overwhelmed}
          >
            <Angry className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block truncate px-1">{translations.overwhelmed}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              {translations.overwhelmedTooltip}
            </div>
          </button>
        </div>
        
        <div className="mt-10 flex justify-center gap-4">
          <Button 
            className="group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2 hero-button"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
            {translations.previous}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodScreen;
