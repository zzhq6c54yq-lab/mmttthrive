
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ToolActionButton from './ToolActionButton';

interface InteractiveToolContentProps {
  toolName: string;
}

const InteractiveToolContent: React.FC<InteractiveToolContentProps> = ({ toolName }) => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "Getting Started",
      content: "Welcome to your personalized experience. This interactive guide will help you make the most of this tool.",
      action: "Begin"
    },
    {
      title: "Explore Features",
      content: "Explore the key features and functions available to support your wellness journey.",
      action: "Next"
    },
    {
      title: "Practice Together",
      content: "Let's try a simple exercise together to help you get comfortable with the tool.",
      action: "Start Exercise"
    },
    {
      title: "Reflect",
      content: "Take a moment to reflect on your experience and consider how you might incorporate this into your routine.",
      action: "Complete"
    }
  ];
  
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prevStep => prevStep + 1);
      toast({
        title: steps[activeStep + 1].title,
        description: "Moving to the next step in your journey",
      });
    } else {
      toast({
        title: "Session Complete",
        description: "You've completed this interactive session. Feel free to revisit anytime.",
      });
      setActiveStep(0);
    }
  };
  
  return (
    <div className="mt-8 space-y-6">
      <Card className="border-[#B87333]/30">
        <CardContent className="p-6">
          <h3 className="text-2xl font-light mb-4">{steps[activeStep].title}</h3>
          <p className="mb-6">{steps[activeStep].content}</p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="copper" 
              onClick={handleNext}
              className="hero-button"
            >
              {steps[activeStep].action}
            </Button>
            
            {activeStep > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setActiveStep(prevStep => Math.max(0, prevStep - 1))}
                className="border-[#B87333]/30"
              >
                Back
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <ToolActionButton 
          label="Save Progress" 
          toolName={toolName} 
          variant="outline_copper"
        />
        <ToolActionButton 
          label="Share Insights" 
          toolName={toolName}
        />
      </div>
    </div>
  );
};

export default InteractiveToolContent;
