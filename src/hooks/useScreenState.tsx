
import { useState, useEffect } from "react";

export type ScreenStateType = 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';

export const useScreenState = () => {
  // Always start with intro for proper onboarding flow
  const [screenState, setScreenState] = useState<ScreenStateType>('intro');
  
  // Initialize state based on onboarding completion
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    
    console.log("[useScreenState] Initial render, hasCompletedOnboarding:", hasCompletedOnboarding);
    
    // Only set to main if onboarding is definitely completed
    if (hasCompletedOnboarding) {
      console.log("[useScreenState] Onboarding completed, setting to main dashboard");
      setScreenState('main');
    } else {
      console.log("[useScreenState] Starting fresh onboarding from intro");
      // Clear any conflicting localStorage items
      localStorage.removeItem('prevScreenState');
      localStorage.removeItem('introLoaded');
      localStorage.removeItem('stuckDetected');
      
      // Ensure we start from intro
      setScreenState('intro');
    }
  }, []);

  return {
    screenState,
    setScreenState
  };
};

export default useScreenState;
