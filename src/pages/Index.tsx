
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import useIndexState from "@/hooks/useIndexState";
import useScreenHistory from "@/hooks/useScreenHistory";
import IndexContent from "@/components/home/IndexContent";

export default function Index() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  
  const {
    screenState,
    setScreenState,
    selectedMood,
    userInfo,
    selectedPlan,
    selectedAddOns,
    selectedQualities,
    selectedGoals,
    isFirstVisit,
    setIsFirstVisit,
    handleUserInfoChange,
    handleRegister,
    handleSubscriptionSelect,
    toggleQuality,
    toggleGoal,
    toggleAddOn,
    handleSubscriptionContinue,
    handleAddOnsContinue,
    handleVisionBoardContinue,
    handleMoodSelect
  } = useIndexState();

  useScreenHistory(screenState, setScreenState);

  // Completely disable all popups and floating elements
  const [showHenry, setShowHenry] = React.useState(false);

  React.useEffect(() => {
    console.log("[Index] Current screen state:", screenState);
    console.log("[Index] Has completed onboarding:", localStorage.getItem('hasCompletedOnboarding'));
  }, [screenState]);

  const handleHenryToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("[Index] Toggling Henry display");
    setShowHenry(!showHenry);
  };

  const markTutorialCompleted = () => {
    console.log("[Index] Tutorial marked as completed");
  };

  // Fixed navigation using React Router instead of manual window manipulation
  const navigateToFeature = (path: string) => {
    console.log("[Index] Navigating to feature:", path);
    
    // Show loading toast
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? "Cargando recurso solicitado" : "Loading requested resource",
      duration: 1500,
    });
    
    // Determine if this is an assessment-related path
    const isAssessmentPath = path.includes('/mental-wellness') || path.includes('/games-and-quizzes');
    
    // Use React Router navigate instead of manual window manipulation
    navigate(path, {
      state: {
        fromMainMenu: true,
        preventTutorial: true,
        directToAssessment: isAssessmentPath,
        startAssessment: isAssessmentPath,
        screenState: 'main'
      }
    });
  };

  const getTranslatedText = (key: string) => {
    const translations: Record<string, string> = {
      skipForNow: isSpanish ? "Omitir por ahora" : "Skip for now",
      tutorialAccess: isSpanish ? "Puedes acceder al tutorial más tarde desde el menú de ayuda" : "You can access the tutorial later from the help menu"
    };
    return translations[key] || key;
  };

  return (
    <IndexContent
      screenState={screenState}
      selectedMood={selectedMood}
      userInfo={userInfo}
      selectedPlan={selectedPlan}
      selectedAddOns={selectedAddOns}
      selectedQualities={selectedQualities}
      selectedGoals={selectedGoals}
      showHenry={false} // Always false to prevent popup artifacts
      isFirstVisit={isFirstVisit}
      setIsFirstVisit={setIsFirstVisit}
      showCoPayCredit={false} // Always false to prevent popup artifacts
      setShowCoPayCredit={() => {}} // No-op function
      popupsShown={{
        coPayCredit: true, // Mark as shown to prevent rendering
        henryIntro: true, // Mark as shown to prevent rendering
        mainTutorial: true, // Mark as shown to prevent rendering
        transitionTutorial: true, // Mark as shown to prevent rendering
      }}
      getTranslatedText={getTranslatedText}
      onMoodSelect={handleMoodSelect}
      onUserInfoChange={handleUserInfoChange}
      onQualityToggle={toggleQuality}
      onGoalToggle={toggleGoal}
      onPlanSelect={handleSubscriptionSelect}
      onAddOnToggle={toggleAddOn}
      onHenryToggle={handleHenryToggle}
      navigateToFeature={navigateToFeature}
      handleSubscriptionContinue={handleSubscriptionContinue}
      handleAddOnsContinue={handleAddOnsContinue}
      handleVisionBoardContinue={handleVisionBoardContinue}
      handleRegister={handleRegister}
      setScreenState={setScreenState}
      markTutorialCompleted={markTutorialCompleted}
      isInOnboarding={screenState !== 'main'}
    />
  );
}
