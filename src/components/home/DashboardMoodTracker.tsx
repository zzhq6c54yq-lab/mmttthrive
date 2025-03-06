
import React from "react";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Annoyed, HeartCrack, Angry } from "lucide-react";

interface DashboardMoodTrackerProps {
  currentMood: string | null;
  encouragementMessage: string;
  onMoodSelect: (mood: string) => void;
}

const DashboardMoodTracker: React.FC<DashboardMoodTrackerProps> = ({
  currentMood,
  encouragementMessage,
  onMoodSelect,
}) => {
  return (
    <div className="mb-12 bg-[#2a2a30] rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">How are you feeling today?</h2>
      <p className="text-gray-400 mb-6">{encouragementMessage}</p>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          { emoji: <Smile className="h-6 w-6" />, label: "Content", color: "bg-[#2a2a30]" },
          { emoji: <Meh className="h-6 w-6" />, label: "Moderate", color: "bg-[#2a2a30]" },
          { emoji: <Meh className="h-6 w-6" />, label: "Neutral", color: "bg-[#2a2a30]" },
          { emoji: <Frown className="h-6 w-6 rotate-180" />, label: "Uneasy", color: "bg-[#2a2a30]" },
          { emoji: <Frown className="h-6 w-6" />, label: "Distressed", color: "bg-[#2a2a30]" },
          { emoji: <Annoyed className="h-6 w-6" />, label: "Anxious", color: "bg-[#2a2a30]" },
          { emoji: <Angry className="h-6 w-6" />, label: "Angry", color: "bg-[#2a2a30]" },
          { emoji: <HeartCrack className="h-6 w-6" />, label: "Overwhelmed", color: "bg-[#2a2a30]" },
        ].map((mood) => (
          <Button
            key={mood.label}
            variant="ghost"
            className={`flex flex-col items-center p-4 rounded-lg border ${
              currentMood === mood.label
                ? `border-[#B87333] bg-[#B87333]/10`
                : "border-gray-700 hover:border-[#B87333]/50"
            }`}
            onClick={() => onMoodSelect(mood.label)}
          >
            <div className={`${mood.color} p-2 rounded-full mb-1 flex items-center justify-center text-[#B87333]`}>
              {mood.emoji}
            </div>
            <span>{mood.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DashboardMoodTracker;
