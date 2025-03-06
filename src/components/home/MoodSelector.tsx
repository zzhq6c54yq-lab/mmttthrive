
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Smile, Meh, Frown, Annoyed, HeartCrack } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, onBack, onContinue }) => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-[#1a1a20] flex flex-col items-center justify-center text-white px-4">
      <div className="w-full max-w-4xl bg-[#2a2a30] rounded-lg p-8 shadow-xl">
        <h1 className="text-4xl font-bold mb-12 text-center copper-text">How are you feeling today?</h1>
        
        <div className="flex flex-wrap justify-center gap-10 mb-12">
          {[
            { emoji: <Smile className="h-12 w-12 stroke-[2.25]" />, label: "Content" },
            { emoji: <Meh className="h-12 w-12 stroke-[2.25]" />, label: "Moderate" },
            { emoji: <Meh className="h-12 w-12 stroke-[2.25]" />, label: "Neutral" },
            { emoji: <Frown className="h-12 w-12 stroke-[2.25]" />, label: "Uneasy" },
            { emoji: <Frown className="h-12 w-12 stroke-[2.25]" />, label: "Distressed" },
            { emoji: <Annoyed className="h-12 w-12 stroke-[2.25]" />, label: "Anxious" },
            { emoji: <HeartCrack className="h-12 w-12 stroke-[2.25]" />, label: "Overwhelmed" },
          ].map((mood) => (
            <Button
              key={mood.label}
              variant="ghost"
              className="flex flex-col items-center justify-center py-2 px-4 rounded-xl hover:scale-110 transition-all"
              onClick={() => onMoodSelect(mood.label)}
            >
              <div className="mb-1 text-[#B87333] flex items-center justify-center h-14">
                {mood.emoji}
              </div>
              <span className="text-lg font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#B87333] p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button 
            onClick={onContinue} 
            variant="bronze" 
            size="lg"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;
