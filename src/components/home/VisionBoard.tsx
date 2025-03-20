
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface VisionBoardProps {
  selectedQualities: string[];
  selectedGoals: string[];
  onQualityToggle: (id: string) => void;
  onGoalToggle: (id: string) => void;
  onContinue: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const VisionBoard: React.FC<VisionBoardProps> = ({
  selectedQualities,
  selectedGoals,
  onQualityToggle,
  onGoalToggle,
  onContinue,
  onPrevious,
  onSkip
}) => {
  const qualities = [
    { id: "peaceful", label: "Peaceful" },
    { id: "mindful", label: "Mindful" },
    { id: "resilient", label: "Resilient" },
    { id: "grateful", label: "Grateful" },
    { id: "balanced", label: "Balanced" },
    { id: "creative", label: "Creative" },
    { id: "empathetic", label: "Empathetic" },
    { id: "focused", label: "Focused" },
    { id: "present", label: "Present" },
    { id: "joyful", label: "Joyful" },
    { id: "energetic", label: "Energetic" }
  ];

  const goals = [
    { id: "reducing-anxiety", label: "Reducing Anxiety" },
    { id: "managing-stress", label: "Managing Stress" },
    { id: "improving-sleep", label: "Improving Sleep" },
    { id: "emotional-regulation", label: "Emotional Regulation" },
    { id: "better-relationships", label: "Better Relationships" },
    { id: "work-life-balance", label: "Work-Life Balance" },
    { id: "finding-purpose", label: "Finding Purpose" },
    { id: "building-confidence", label: "Building Confidence" },
    { id: "setting-boundaries", label: "Setting Boundaries" },
    { id: "career-growth", label: "Career Growth" },
    { id: "health-wellness", label: "Health & Wellness" },
    { id: "overcoming-trauma", label: "Overcoming Trauma" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Create Your Vision Board</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select qualities you want to embody and goals you want to achieve in your mental wellness journey.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Qualities I Want to Embody</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {qualities.map((quality) => (
              <Button
                key={quality.id}
                onClick={() => onQualityToggle(quality.id)}
                variant="outline"
                className={`h-auto py-3 relative ${
                  selectedQualities.includes(quality.id)
                    ? "bg-[#B87333]/10 border-[#B87333] text-[#B87333]"
                    : ""
                }`}
              >
                {quality.label}
                {selectedQualities.includes(quality.id) && (
                  <Check className="h-4 w-4 absolute top-1 right-1 text-[#B87333]" />
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Goals I Want to Achieve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <Button
                key={goal.id}
                onClick={() => onGoalToggle(goal.id)}
                variant="outline"
                className={`h-auto py-3 relative ${
                  selectedGoals.includes(goal.id)
                    ? "bg-[#B87333]/10 border-[#B87333] text-[#B87333]"
                    : ""
                }`}
              >
                {goal.label}
                {selectedGoals.includes(goal.id) && (
                  <Check className="h-4 w-4 absolute top-1 right-1 text-[#B87333]" />
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-12">
          <Button onClick={onPrevious} variant="outline">
            Previous
          </Button>
          <Button onClick={onSkip} variant="ghost">
            Skip
          </Button>
          <Button 
            onClick={onContinue}
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;
