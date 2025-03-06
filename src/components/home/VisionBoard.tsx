
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
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
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if at least one quality and one goal is selected
    setIsValid(selectedQualities.length > 0 && selectedGoals.length > 0);
  }, [selectedQualities, selectedGoals]);

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
    if (!isValid) {
      toast({
        title: "Selection Required",
        description: "Please select at least one quality and one goal.",
        variant: "destructive"
      });
      return;
    }
    
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
          Select the qualities you want to embody and the goals you're working toward. <span className="text-[#B87333]">*Please select at least one from each section</span>
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
          {selectedQualities.length === 0 && (
            <p className="text-sm text-red-400 mt-2">Please select at least one quality</p>
          )}
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
          {selectedGoals.length === 0 && (
            <p className="text-sm text-red-400 mt-2">Please select at least one goal</p>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#B87333]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
          </Button>
          
          <Button 
            onClick={handleSave} 
            variant="bronze" 
            disabled={!isValid}
            className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;
