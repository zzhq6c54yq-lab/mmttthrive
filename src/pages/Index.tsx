
import React from "react";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import useIndexState from "@/hooks/useIndexState";
import useScreenHistory from "@/hooks/useScreenHistory";
import IndexContent from "@/components/home/IndexContent";

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
  mainTutorial: boolean;
  transitionTutorial: boolean;
}

export default function Index() {
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

  // Disable all popups to prevent white popup issues
  const [showCoPayCredit, setShowCoPayCredit] = React.useState(false);
  const [showHenry, setShowHenry] = React.useState(false);
  const [popupsShown, setPopupsShown] = React.useState<PopupState>({
    coPayCredit: true, // Always mark as shown to prevent popup
    henryIntro: true, // Always mark as shown to prevent popup
    mainTutorial: true, // Always mark as shown to prevent popup
    transitionTutorial: true, // Always mark as shown to prevent popup
  });

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
    setPopupsShown(prev => ({
      ...prev,
      mainTutorial: true,
      transitionTutorial: true
    }));
  };

  const navigateToFeature = (path: string) => {
    console.log("[Index] Navigating to feature:", path);
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? "Cargando recurso solicitado" : "Loading requested resource",
      duration: 1500,
    });
    
    const isAssessmentPath = path.includes('/mental-wellness') || path.includes('/games-and-quizzes');
    
    window.history.pushState(
      { 
        fromMainMenu: true,
        preventTutorial: true,
        directToAssessment: isAssessmentPath,
        startAssessment: isAssessmentPath
      }, 
      '', 
      path
    );
    window.location.href = path;
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
      showHenry={showHenry}
      isFirstVisit={isFirstVisit}
      setIsFirstVisit={setIsFirstVisit}
      showCoPayCredit={false} // Force disable
      setShowCoPayCredit={() => {}} // Disable function
      popupsShown={popupsShown}
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
