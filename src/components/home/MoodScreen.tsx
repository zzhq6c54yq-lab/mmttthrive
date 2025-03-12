
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Annoyed } from "lucide-react";

interface MoodScreenProps {
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onPrevious: () => void;
}

const MoodScreen: React.FC<MoodScreenProps> = ({ onMoodSelect, onPrevious }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] animate-fade-in relative overflow-hidden">
      <div className="floating-bg"></div>
      <div className="text-center max-w-md mx-auto px-4 z-10">
        <h2 className="text-2xl md:text-3xl text-white mb-8 gradient-heading">
          How are you feeling today?
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-4 mb-4">
          <button 
            onClick={() => onMoodSelect('happy')}
            className="mood-button group"
            aria-label="I'm feeling happy"
          >
            <Smile className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">Happy</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              I feel joyful and optimistic about today!
            </div>
          </button>
          <button 
            onClick={() => onMoodSelect('ok')}
            className="mood-button group"
            aria-label="I'm feeling just ok"
          >
            <Annoyed className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">Just Ok</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              I'm managing fine, with ups and downs today
            </div>
          </button>
          <button 
            onClick={() => onMoodSelect('neutral')}
            className="mood-button group"
            aria-label="I'm feeling neutral"
          >
            <Meh className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">Neutral</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              I'm feeling balanced and steady today
            </div>
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-4">
          <button 
            onClick={() => onMoodSelect('down')}
            className="mood-button group"
            aria-label="I'm feeling down"
          >
            <HeartCrack className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">Feeling Down</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              I could use a little boost of positivity today
            </div>
          </button>
          <button 
            onClick={() => onMoodSelect('sad')}
            className="mood-button group"
            aria-label="I'm feeling sad"
          >
            <Frown className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">Sad</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              I'm experiencing some heavier emotions today
            </div>
          </button>
          <button 
            onClick={() => onMoodSelect('overwhelmed')}
            className="mood-button group"
            aria-label="I'm feeling overwhelmed"
          >
            <Angry className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
            <span className="text-xs text-white mt-1 block">Overwhelmed</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-16 bg-[#222] p-2 rounded-md text-xs text-white w-36 pointer-events-none">
              Things feel intense, but I'm seeking balance
            </div>
          </button>
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <Button 
            className="group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2 hero-button"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodScreen;
