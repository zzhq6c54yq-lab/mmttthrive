
import { useState, useEffect } from "react";

export type ScreenStateType = 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';

export const useScreenState = () => {
  const [screenState, setScreenState] = useState<ScreenStateType>('intro');
  
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const prevScreenState = localStorage.getItem('prevScreenState') as ScreenStateType;
    const forceOnboarding = new URLSearchParams(window.location.search).get('onboarding') === 'true';

    console.log("[useScreenState] Initialization - hasCompletedOnboarding:", hasCompletedOnboarding);
    console.log("[useScreenState] Previous screen state:", prevScreenState);
    console.log("[useScreenState] Force onboarding:", forceOnboarding);
    
    // If forced onboarding via URL parameter, always start from intro
    if (forceOnboarding) {
      console.log("[useScreenState] Force onboarding requested, starting from intro");
      localStorage.removeItem('hasCompletedOnboarding');
      setScreenState('intro');
      return;
    }
    
    // If onboarding is completed, go to main dashboard
    if (hasCompletedOnboarding) {
      console.log("[useScreenState] Onboarding completed, setting to main dashboard");
      setScreenState('main');
    } else {
      // If there's a valid previous screen state during onboarding, resume from there
      if (prevScreenState && prevScreenState !== 'main') {
        console.log("[useScreenState] Resuming onboarding at screen:", prevScreenState);
        setScreenState(prevScreenState);
      } else {
        console.log("[useScreenState] Starting fresh onboarding from intro");
        setScreenState('intro');
      }
    }
  }, []);

  // Enhanced setScreenState that prevents unwanted transitions
  const setScreenStateWithValidation = (newState: ScreenStateType) => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    
    // Prevent skipping to main if onboarding isn't completed
    if (newState === 'main' && !hasCompletedOnboarding) {
      console.log("[useScreenState] Prevented skipping to main - onboarding not completed");
      return;
    }
    
    console.log("[useScreenState] Transitioning to screen:", newState);
    setScreenState(newState);
    
    // Save the current state for resuming later (except for main)
    if (newState !== 'main') {
      localStorage.setItem('prevScreenState', newState);
    } else {
      // Mark onboarding as completed when reaching main
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.removeItem('prevScreenState');
    }
  };

  return {
    screenState,
    setScreenState: setScreenStateWithValidation
  };
};

export default useScreenState;
