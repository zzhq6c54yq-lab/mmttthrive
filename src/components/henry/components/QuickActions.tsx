
import React from "react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction }) => {
  const actions = [
    "How can you help me?",
    "I'm feeling anxious",
    "Mental health resources",
    "Guided breathing exercise"
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onQuickAction(action)}
          className="bg-[#2A2A2A] border-[#B87333]/30 text-white hover:bg-[#3A3A3A] text-xs py-1"
        >
          {action}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
