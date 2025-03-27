
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useMousePosition from "@/hooks/useMousePosition";
import useScreenHistory from "@/hooks/useScreenHistory";
import usePopupManagement from "@/hooks/usePopupManagement";
import useUserJourney from "@/hooks/useUserJourney";
import IndexScreenManager from "@/components/home/IndexScreenManager";
import PopupManager from "@/components/home/PopupManager";

const Index = () => {
  // Screen state management
  const [screenState, setScreenState] = useState<'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'visionBoard' | 'main'>('intro');
  
  // Custom hooks
  const mousePosition = useMousePosition();
  const location = useLocation();
  const { 
    showCoPayCredit, 
    setShowCoPayCredit, 
    showHenry, 
    setShowHenry,
    popupsShown
  } = usePopupManagement(screenState);
  
  const {
    userInfo,
    selectedMood,
    selectedPlan,
    selectedQualities,
    selectedGoals,
    handleUserInfoChange,
    handleRegister,
    handleSubscriptionSelect,
    toggleQuality,
    toggleGoal,
    handleSubscriptionContinue,
    handleVisionBoardContinue,
    navigateToFeature,
    handleMoodSelect
  } = useUserJourney();
  
  // Handle location/history state
  useScreenHistory(screenState, setScreenState);

  // Check for Henry show directive from location state
  useEffect(() => {
    if (location.state && location.state.showHenry) {
      setShowHenry(true);
    }
  }, [location.state, setShowHenry]);

  // Handler wrappers that update screen state
  const onRegisterSubmit = (e: React.FormEvent) => {
    const nextScreen = handleRegister(e);
    if (nextScreen) {
      setScreenState(nextScreen);
    }
  };

  const onMoodSelect = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    const nextScreen = handleMoodSelect(mood);
    setScreenState(nextScreen);
  };

  const onSubscriptionContinue = () => {
    const nextScreen = handleSubscriptionContinue(
      location.state && location.state.returnToMain
    );
    
    if (nextScreen) {
      setScreenState(nextScreen);
      
      if (nextScreen === 'main') {
        window.history.replaceState(
          { ...window.history.state, returnToMain: false }, 
          document.title
        );
      }
    }
  };

  const onVisionBoardContinue = () => {
    const nextScreen = handleVisionBoardContinue();
    if (nextScreen) {
      setScreenState(nextScreen);
    }
  };

  const toggleHenry = () => {
    setShowHenry(prev => !prev);
  };

  return (
    <PopupManager
      showCoPayCredit={showCoPayCredit}
      setShowCoPayCredit={setShowCoPayCredit}
      popupsShown={popupsShown}
    >
      <IndexScreenManager
        screenState={screenState}
        selectedMood={selectedMood}
        userInfo={userInfo}
        selectedPlan={selectedPlan}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        showHenry={showHenry}
        onMoodSelect={onMoodSelect}
        onUserInfoChange={handleUserInfoChange}
        onQualityToggle={toggleQuality}
        onGoalToggle={toggleGoal}
        onPlanSelect={handleSubscriptionSelect}
        onHenryToggle={toggleHenry}
        navigateToFeature={navigateToFeature}
        handleSubscriptionContinue={onSubscriptionContinue}
        handleVisionBoardContinue={onVisionBoardContinue}
        handleRegister={onRegisterSubmit}
        setScreenState={setScreenState}
      />
    </PopupManager>
  );
};

export default Index;
