
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VisionBoardItem {
  id: string;
  label: string;
}

interface VisionBoardProps {
  qualities: VisionBoardItem[];
  goals: VisionBoardItem[];
  onBack: () => void;
  onSave: () => void;
  initialSelectedQualities?: string[];
  initialSelectedGoals?: string[];
}

const VisionBoard: React.FC<VisionBoardProps> = ({
  qualities,
  goals,
  onBack,
  onSave,
  initialSelectedQualities = [],
  initialSelectedGoals = [],
}) => {
  const [selectedQualities, setSelectedQualities] = useState<string[]>(initialSelectedQualities);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialSelectedGoals);
  const { toast } = useToast();

  const toggleQuality = (qualityId: string) => {
    setSelectedQualities(prev => 
      prev.includes(qualityId) 
        ? prev.filter(id => id !== qualityId) 
        : [...prev, qualityId]
    );
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId) 
        : [...prev, goalId]
    );
  };

  const handleSave = () => {
    toast({
      title: "Vision Board Updated",
      description: "Your personal vision board has been saved.",
    });
    onSave();
  };

  return (
    <div className="min-h-screen bg-[#1a1a20] flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-4xl bg-[#2a2a30] rounded-lg p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#B87333] p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold text-center copper-text flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-[#B87333]" />
            My Vision Board
          </h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
        
        <p className="text-gray-400 mb-8 text-center">
          Select the qualities you want to embody and the goals you're working toward.
        </p>

        <div className="mb-8">
          <h3 className="font-semibold mb-4 text-xl">I want to be:</h3>
          <div className="flex flex-wrap gap-3">
            {qualities.map((quality) => (
              <Button
                key={quality.id}
                variant={selectedQualities.includes(quality.id) ? "copper" : "outline_copper"}
                size="sm"
                onClick={() => toggleQuality(quality.id)}
                className="mb-2"
              >
                {quality.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-4 text-xl">I'm working on:</h3>
          <div className="flex flex-wrap gap-3">
            {goals.map((goal) => (
              <Button
                key={goal.id}
                variant={selectedGoals.includes(goal.id) ? "copper" : "outline_copper"}
                size="sm"
                onClick={() => toggleGoal(goal.id)}
                className="mb-2"
              >
                {goal.label}
              </Button>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} variant="bronze" className="w-full">
          Save My Vision Board
        </Button>
      </div>
    </div>
  );
};

export default VisionBoard;
