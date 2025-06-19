
import { useState, useEffect } from "react";

export type ScreenStateType = 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';

export const useScreenState = () => {
  const [screenState, setScreenState] = useState<ScreenStateType>('intro');
  
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const forceOnboarding = new URLSearchParams(window.location.search).get('onboarding') === 'true';
    const forceReset = new URLSearchParams(window.location.search).get('forceReset') === 'true';

    console.log("[useScreenState] Current localStorage value:", localStorage.getItem('hasCompletedOnboarding'));
    console.log("[useScreenState] hasCompletedOnboarding:", hasCompletedOnboarding);
    console.log("[useScreenState] forceOnboarding:", forceOnboarding);
    console.log("[useScreenState] forceReset:", forceReset);
    
    // For investment demo - ensure onboarding shows for new users
    // Reset if forced or if no explicit completion
    if (forceReset || forceOnboarding || !hasCompletedOnboarding) {
      console.log("[useScreenState] Starting onboarding flow");
      localStorage.removeItem('hasCompletedOnboarding');
      setScreenState('intro');
    } else {
      console.log("[useScreenState] Onboarding completed, going to main");
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
