
import React, { useEffect, useState } from "react";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import IndexScreenManager from "@/components/home/IndexScreenManager";
import TestTutorial from "@/components/tutorials/TestTutorial";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface IndexContentProps {
  screenState: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'visionBoard' | 'main';
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  userInfo: {
    name: string;
    email: string;
    password: string;
  };
  selectedPlan: string | null;
  selectedQualities: string[];
  selectedGoals: string[];
  showHenry: boolean;
  isFirstVisit: boolean;
  setIsFirstVisit: (value: boolean) => void;
  showCoPayCredit: boolean;
  setShowCoPayCredit: (value: boolean) => void;
  showMainTutorial: boolean;
  popupsShown: any;
  getTranslatedText: (key: string) => string;
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onUserInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQualityToggle: (id: string) => void;
  onGoalToggle: (id: string) => void;
  onPlanSelect: (planTitle: string) => void;
  onHenryToggle: () => void;
  navigateToFeature: (path: string) => void;
  handleSubscriptionContinue: () => void;
  handleVisionBoardContinue: () => void;
  handleRegister: (e: React.FormEvent) => void;
  setScreenState: (state: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'visionBoard' | 'main') => void;
  markTutorialCompleted: () => void;
}

const IndexContent: React.FC<IndexContentProps> = ({
  screenState,
  selectedMood,
  userInfo,
  selectedPlan,
  selectedQualities,
  selectedGoals,
  showHenry,
  isFirstVisit,
  setIsFirstVisit,
  showCoPayCredit,
  setShowCoPayCredit,
  showMainTutorial,
  popupsShown,
  getTranslatedText,
  onMoodSelect,
  onUserInfoChange,
  onQualityToggle,
  onGoalToggle,
  onPlanSelect,
  onHenryToggle,
  navigateToFeature,
  handleSubscriptionContinue,
  handleVisionBoardContinue,
  handleRegister,
  setScreenState,
  markTutorialCompleted
}) => {
  const { toast } = useToast();
  const [forceTutorial, setForceTutorial] = useState(false);
  
  // Force tutorial on first load of main screen
  useEffect(() => {
    if (screenState === 'main') {
      console.log("Main screen detected - setting forceTutorial to true");
      setForceTutorial(true);
    }
  }, []);
  
  // Effect to handle tutorial display logic
  useEffect(() => {
    // Check for URL parameter to force tutorial display
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('tutorial')) {
      console.log("Forcing tutorial display due to URL parameter");
      setForceTutorial(true);
      return;
    }
    
    if (screenState === 'main') {
      console.log("Main screen detected. isFirstVisit:", isFirstVisit, "showMainTutorial:", showMainTutorial);
      
      // Check if coming from onboarding flow
      const prevScreenState = localStorage.getItem('prevScreenState');
      console.log("Previous screen state:", prevScreenState);
      
      const comingFromOnboarding = (
        prevScreenState === 'visionBoard' || 
        prevScreenState === 'subscription' || 
        prevScreenState === 'register' || 
        prevScreenState === 'moodResponse'
      );
      
      if (comingFromOnboarding || showMainTutorial) {
        console.log("Coming from onboarding or showMainTutorial is true");
        
        // Ensure the tutorial shows
        setIsFirstVisit(true);
        setForceTutorial(true);
        
        // Set a flag for onboarding completion
        if (comingFromOnboarding) {
          sessionStorage.setItem('justCompletedOnboarding', 'true');
        }
        
        // Force clear localStorage items that might prevent tutorial
        localStorage.removeItem('popupsShown');
        localStorage.removeItem('hasVisitedThriveMT');
        localStorage.removeItem('dashboardTutorialShown');
      }
    }
  }, [screenState, showMainTutorial, setIsFirstVisit, isFirstVisit]);

  const handleCloseTutorial = () => {
    console.log("Tutorial closed - marking as completed");
    setIsFirstVisit(false);
    setForceTutorial(false);
    markTutorialCompleted();
    
    // Show welcome toast after onboarding
    if (sessionStorage.getItem('justCompletedOnboarding')) {
      toast({
        title: getTranslatedText("welcomeToThrive"),
        description: getTranslatedText("exploreAllFeatures"),
      });
      sessionStorage.removeItem('justCompletedOnboarding');
    }
  };

  console.log("IndexContent rendering - screenState:", screenState, "isFirstVisit:", isFirstVisit, "showMainTutorial:", showMainTutorial, "forceTutorial:", forceTutorial);

  // Determine if tutorial should be visible
  const shouldShowTutorial = forceTutorial || (screenState === 'main' && (isFirstVisit || showMainTutorial));
  console.log("Should show tutorial:", shouldShowTutorial);

  return (
    <div className="relative z-10">
      {/* Test button to force show tutorial */}
      {screenState === 'main' && (
        <div className="absolute top-20 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("Force tutorial button clicked");
              setForceTutorial(true);
            }}
            className="bg-red-500/80 hover:bg-red-600 text-white border-red-400"
          >
            Force Tutorial
          </Button>
        </div>
      )}
      
      {/* CoPayCredit Popup */}
      {showCoPayCredit && !popupsShown.coPayCredit && 
        <CoPayCreditPopup 
          open={showCoPayCredit} 
          onOpenChange={setShowCoPayCredit} 
        />
      }
      
      {/* Main Content */}
      <IndexScreenManager
        screenState={screenState}
        selectedMood={selectedMood}
        userInfo={userInfo}
        selectedPlan={selectedPlan}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        showHenry={showHenry}
        onMoodSelect={onMoodSelect}
        onUserInfoChange={onUserInfoChange}
        onQualityToggle={onQualityToggle}
        onGoalToggle={onGoalToggle}
        onPlanSelect={onPlanSelect}
        onHenryToggle={onHenryToggle}
        navigateToFeature={navigateToFeature}
        handleSubscriptionContinue={handleSubscriptionContinue}
        handleVisionBoardContinue={handleVisionBoardContinue}
        handleRegister={handleRegister}
        setScreenState={setScreenState}
      />
      
      {/* Tutorial */}
      <TestTutorial
        isOpen={shouldShowTutorial}
        onClose={handleCloseTutorial}
      />
    </div>
  );
};

export default IndexContent;
