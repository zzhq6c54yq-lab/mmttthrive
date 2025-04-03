
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
}

interface FeatureTutorialProps {
  featureId: string;
  onClose: () => void;
  embedded?: boolean;
}

const FeatureTutorial: React.FC<FeatureTutorialProps> = ({ featureId, onClose, embedded = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Get tutorial content based on feature ID
  const tutorialSteps = getTutorialSteps(featureId);
  const totalSteps = tutorialSteps.length;
  
  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const currentTutorial = tutorialSteps[currentStep];
  
  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden">
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 z-10 rounded-full bg-black/20 text-white hover:bg-black/30 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        
        {currentTutorial.image && (
          <div className="w-full h-48 md:h-56 overflow-hidden border-b border-white/10">
            <img 
              src={currentTutorial.image} 
              alt={currentTutorial.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl text-white">{currentTutorial.title}</CardTitle>
        <CardDescription className="text-white/70">
          Step {currentStep + 1} of {totalSteps}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-white/90">{currentTutorial.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={handlePrevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button 
          className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white"
          onClick={handleNextStep}
        >
          {currentStep === totalSteps - 1 ? (
            <>
              Finish <CheckCircle2 className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Tutorial steps for different features
const getTutorialSteps = (featureId: string): TutorialStep[] => {
  switch (featureId) {
    case 'dashboard':
      return [
        {
          title: "Welcome to Your Thrive MT Dashboard",
          description: "This is your personalized space for mental wellness. We've designed it to be intuitive and supportive of your journey.",
          image: "/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png"
        },
        {
          title: "Daily Wellness Challenges",
          description: "Engage with daily activities designed to boost your mental wellbeing. Each challenge takes just a few minutes but can have lasting benefits.",
          image: "/lovable-uploads/11170587-bb45-4563-93d6-add9916cea87.png"
        },
        {
          title: "Specialized Programs",
          description: "Explore programs tailored to specific needs and situations. Whether you're a college student, military member, or dealing with specific challenges, we have resources for you.",
          image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png"
        },
        {
          title: "Track Your Progress",
          description: "Monitor your wellness journey with our tracking tools. See your growth, recognize patterns, and celebrate your achievements.",
          image: "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png"
        }
      ];
    case 'workshops':
      return [
        {
          title: "Explore Wellness Workshops",
          description: "Discover a variety of workshops designed to support different aspects of your mental health journey.",
          image: "/lovable-uploads/10d9c6f1-9335-46e4-8942-4d4c198d3f5b.png"
        },
        {
          title: "Workshop Structure",
          description: "Each workshop includes videos, interactive exercises, and downloadable resources to help you apply what you learn.",
        },
        {
          title: "Track Your Progress",
          description: "As you complete workshops, your progress is tracked, allowing you to see your journey and build on your achievements.",
        }
      ];
    default:
      return [
        {
          title: "Welcome to Thrive MT",
          description: "We're here to support your mental wellness journey with personalized resources and tools.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
        },
        {
          title: "Getting Started",
          description: "Explore the dashboard to find daily challenges, specialized programs, and resources tailored to your needs.",
        }
      ];
  }
};

export default FeatureTutorial;
