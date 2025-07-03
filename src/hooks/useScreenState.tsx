
import { useState, useEffect } from "react";

export type ScreenStateType = 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';

export const useScreenState = () => {
  const [screenState, setScreenState] = useState<ScreenStateType>('intro');
  
  console.log("[useScreenState] Hook initialized with screenState:", screenState);
  
  useEffect(() => {
    console.log("[useScreenState] useEffect running...");
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const forceOnboarding = new URLSearchParams(window.location.search).get('onboarding') === 'true';
    const forceReset = new URLSearchParams(window.location.search).get('forceReset') === 'true';

    console.log("[useScreenState] Current localStorage value:", localStorage.getItem('hasCompletedOnboarding'));
    console.log("[useScreenState] hasCompletedOnboarding:", hasCompletedOnboarding);
    console.log("[useScreenState] forceOnboarding:", forceOnboarding);
    console.log("[useScreenState] forceReset:", forceReset);
    
    // For demo purposes - ALWAYS clear onboarding completion unless there's a specific completion flag
    // This ensures onboarding always shows in preview mode
    const hasExplicitCompletion = localStorage.getItem('hasCompletedOnboarding') === 'true';
    
    if (forceReset) {
      console.log("[useScreenState] Force reset - clearing onboarding");
      localStorage.removeItem('hasCompletedOnboarding');
      setScreenState('intro');
    } else if (!hasExplicitCompletion || forceOnboarding) {
      console.log("[useScreenState] No explicit completion found or forced onboarding - starting onboarding flow");
      localStorage.removeItem('hasCompletedOnboarding'); // Clear any partial completion
      setScreenState('intro');
    } else {
      console.log("[useScreenState] Explicit completion found, going to main");
      setScreenState('main');
    }
  }, []);

  const setScreenStateWithValidation = (newState: ScreenStateType) => {
    console.log("[useScreenState] Transitioning from", screenState, "to", newState);
    setScreenState(newState);
    
    // Only mark onboarding as completed when explicitly reaching main
    if (newState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      console.log("[useScreenState] Onboarding marked as completed in localStorage");
    }
  };

  return {
    screenState,
    setScreenState: setScreenStateWithValidation
  };
};

export default useScreenState;
