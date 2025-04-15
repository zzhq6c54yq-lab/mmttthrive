
import React from "react";
import IntroScreen from "@/components/home/IntroScreen";
import MoodScreen from "@/components/home/MoodScreen";
import MoodResponse from "@/components/home/MoodResponse";
import RegistrationScreen from "@/components/home/RegistrationScreen";
import SubscriptionScreen from "@/components/home/SubscriptionScreen";
import SubscriptionAddOns from "@/components/home/SubscriptionAddOns";
import VisionBoard from "@/components/home/VisionBoard";
import MainDashboard from "@/components/home/MainDashboard";
import useTranslation from "@/hooks/useTranslation";

interface IndexScreenManagerProps {
  screenState: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  userInfo: {
    name: string;
    email: string;
    password: string;
  };
  selectedPlan: string | null;
  selectedAddOns: string[];
  selectedQualities: string[];
  selectedGoals: string[];
  showHenry: boolean;
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onUserInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQualityToggle: (id: string) => void;
  onGoalToggle: (id: string) => void;
  onPlanSelect: (planTitle: string) => void;
  onAddOnToggle: (id: string) => void;
  onHenryToggle: () => void;
  navigateToFeature: (path: string) => void;
  handleSubscriptionContinue: () => void;
  handleAddOnsContinue: () => void;
  handleVisionBoardContinue: () => void;
  handleRegister: (e: React.FormEvent) => void;
  setScreenState: (state: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main') => void;
  markTutorialCompleted?: () => void;
}

const IndexScreenManager: React.FC<IndexScreenManagerProps> = ({
  screenState,
  selectedMood,
  userInfo,
  selectedPlan,
  selectedAddOns,
  selectedQualities,
  selectedGoals,
  showHenry,
  onMoodSelect,
  onUserInfoChange,
  onQualityToggle,
  onGoalToggle,
  onPlanSelect,
  onAddOnToggle,
  onHenryToggle,
  navigateToFeature,
  handleSubscriptionContinue,
  handleAddOnsContinue,
  handleVisionBoardContinue,
  handleRegister,
  setScreenState,
  markTutorialCompleted
}) => {
  const { isSpanish } = useTranslation();
  
  React.useEffect(() => {
    const prevState = localStorage.getItem('prevScreenState');
    console.log("IndexScreenManager: Screen changing from", prevState, "to", screenState);
    localStorage.setItem('prevScreenState', screenState);
  }, [screenState]);

  React.useEffect(() => {
    if (screenState === 'intro') {
      console.log("Starting new session from intro screen");
      
      // Reset onboarding flag to ensure complete onboarding flow
      localStorage.removeItem('hasCompletedOnboarding');
    }
  }, [screenState]);

  const handlePrevious = () => {
    let newScreenState: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main' = 'intro';
    
    if (screenState === 'mood') {
      newScreenState = 'intro';
    } else if (screenState === 'moodResponse') {
      newScreenState = 'mood';
    } else if (screenState === 'register') {
      newScreenState = 'moodResponse';
    } else if (screenState === 'subscription') {
      newScreenState = 'register';
    } else if (screenState === 'subscriptionAddOns') {
      newScreenState = 'subscription';
    } else if (screenState === 'visionBoard') {
      newScreenState = 'subscriptionAddOns';
    } else if (screenState === 'main') {
      newScreenState = 'visionBoard';
    }
    
    setScreenState(newScreenState);
  };

  const handleSkip = () => {
    setScreenState('main');
  };

  switch (screenState) {
    case 'intro':
      return <IntroScreen onContinue={() => setScreenState('mood')} />;
    case 'mood':
      return (
        <MoodScreen
          onMoodSelect={onMoodSelect}
        />
      );
    case 'moodResponse':
      return (
        <MoodResponse
          selectedMood={selectedMood}
          onContinue={() => setScreenState('register')}
          onPrevious={() => setScreenState('mood')}
        />
      );
    case 'register':
      return (
        <RegistrationScreen
          userInfo={userInfo}
          onUserInfoChange={onUserInfoChange}
          onSubmit={handleRegister}
          onPrevious={() => setScreenState('moodResponse')}
          onSkip={() => setScreenState('subscription')}
        />
      );
    case 'subscription':
      return (
        <SubscriptionScreen
          selectedPlan={selectedPlan}
          onPlanSelect={onPlanSelect}
          onContinue={handleSubscriptionContinue}
          onPrevious={() => setScreenState('register')}
          onSkip={() => setScreenState('subscriptionAddOns')}
        />
      );
    case 'subscriptionAddOns':
      return (
        <SubscriptionAddOns
          selectedPlan={selectedPlan}
          selectedAddOns={selectedAddOns}
          onAddOnToggle={onAddOnToggle}
          onContinue={handleAddOnsContinue}
          onPrevious={() => setScreenState('subscription')}
          onSkip={() => setScreenState('visionBoard')}
        />
      );
    case 'visionBoard':
      return (
        <VisionBoard
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
          onQualityToggle={onQualityToggle}
          onGoalToggle={onGoalToggle}
          onContinue={handleVisionBoardContinue}
          onPrevious={() => setScreenState('subscriptionAddOns')}
          onSkip={() => setScreenState('main')}
        />
      );
    case 'main':
      return (
        <MainDashboard
          userName={userInfo.name}
          showHenry={showHenry}
          onHenryToggle={onHenryToggle}
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
          navigateToFeature={navigateToFeature}
          markTutorialCompleted={markTutorialCompleted}
        />
      );
    default:
      return null;
  }
};

export default IndexScreenManager;
