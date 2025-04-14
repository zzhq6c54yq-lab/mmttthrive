
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useMousePosition from "@/hooks/useMousePosition";
import useScreenHistory from "@/hooks/useScreenHistory";
import usePopupManagement from "@/hooks/usePopupManagement";
import useTranslation from "@/hooks/useTranslation";
import useIndexState from "@/hooks/useIndexState";
import IndexContent from "@/components/home/IndexContent";

const Index = () => {
  // Custom hooks
  const { 
    screenState, 
    setScreenState,
    selectedMood,
    userInfo,
    selectedPlan,
    selectedQualities,
    selectedGoals,
    isFirstVisit,
    setIsFirstVisit,
    handleUserInfoChange,
    handleRegister,
    handleSubscriptionSelect: onPlanSelect,
    toggleQuality,
    toggleGoal,
    handleSubscriptionContinue,
    handleVisionBoardContinue,
    handleMoodSelect
  } = useIndexState();
  
  const mousePosition = useMousePosition();
  const navigate = useNavigate();
  const location = useLocation();
  const { getTranslatedText } = useTranslation();
  
  const { 
    showCoPayCredit, 
    setShowCoPayCredit, 
    showHenry, 
    setShowHenry,
    popupsShown,
    markTutorialCompleted
  } = usePopupManagement(screenState);

  // Check for URL parameters on component mount to ensure they're processed before rendering
  useEffect(() => {
    // Check if there's a URL parameter to force reset onboarding
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('resetOnboarding') === 'true' || searchParams.get('forceReset') === 'true') {
      console.log("Resetting onboarding due to URL parameter in Index component");
      localStorage.removeItem('hasCompletedOnboarding');
      localStorage.removeItem('prevScreenState');
      setScreenState('intro');
    }
    
    // Force onboarding flow when no record of completion
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding && screenState !== 'intro') {
      console.log("No onboarding completion record found, starting from intro");
      setScreenState('intro');
    }
  }, [location.search, setScreenState]);

  // Use the screen history hook
  useScreenHistory(screenState, setScreenState);

  useEffect(() => {
    if (location.state && location.state.showHenry) {
      setShowHenry(true);
    }
  }, [location.state, setShowHenry]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedThriveMT');
    if (!hasVisited && screenState === 'main') {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedThriveMT', 'true');
    }
  }, [screenState, setIsFirstVisit]);

  const toggleHenry = () => {
    setShowHenry(prev => !prev);
  };

  const navigateToFeature = (path: string) => {
    if (path.startsWith('/')) {
      if (path === '/small-business-portal') {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals,
            fromMainMenu: true 
          }
        });
      } else {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals 
          }
        });
      }
    }
  };

  // Helper function to reset onboarding - can be called from external links or buttons
  const resetOnboarding = () => {
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem('prevScreenState');
    setScreenState('intro');
    console.log("Onboarding reset manually");
  };

  // Log current state for debugging
  useEffect(() => {
    console.log("Index component rendered with screenState:", screenState);
    console.log("Onboarding completed status:", localStorage.getItem('hasCompletedOnboarding'));
  }, [screenState]);

  return (
    <IndexContent
      screenState={screenState}
      selectedMood={selectedMood}
      userInfo={userInfo}
      selectedPlan={selectedPlan}
      selectedQualities={selectedQualities}
      selectedGoals={selectedGoals}
      showHenry={showHenry}
      isFirstVisit={isFirstVisit}
      setIsFirstVisit={setIsFirstVisit}
      showCoPayCredit={showCoPayCredit}
      setShowCoPayCredit={setShowCoPayCredit}
      popupsShown={popupsShown}
      getTranslatedText={getTranslatedText}
      onMoodSelect={handleMoodSelect}
      onUserInfoChange={handleUserInfoChange}
      onQualityToggle={toggleQuality}
      onGoalToggle={toggleGoal}
      onPlanSelect={onPlanSelect}
      onHenryToggle={toggleHenry}
      navigateToFeature={navigateToFeature}
      handleSubscriptionContinue={handleSubscriptionContinue}
      handleVisionBoardContinue={handleVisionBoardContinue}
      handleRegister={handleRegister}
      setScreenState={setScreenState}
      markTutorialCompleted={markTutorialCompleted}
    />
  );
};

export default Index;
