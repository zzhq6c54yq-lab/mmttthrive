
import { useState, useEffect } from "react";

export type ScreenStateType = 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';

export const useScreenState = () => {
  // Initialize screenState properly
  const [screenState, setScreenState] = useState<ScreenStateType>('intro');
  
  // Initialize state based on onboarding completion
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const prevScreenState = localStorage.getItem('prevScreenState') as ScreenStateType;

    console.log("[useScreenState] Initialization - hasCompletedOnboarding:", hasCompletedOnboarding);
    console.log("[useScreenState] Previous screen state:", prevScreenState);
    
    if (hasCompletedOnboarding) {
      console.log("[useScreenState] Onboarding completed, setting to main dashboard");
      setScreenState('main');
    } else {
      // If there's a valid previous screen state and it's not main, use it
      if (prevScreenState && prevScreenState !== 'main') {
        console.log("[useScreenState] Resuming onboarding at screen:", prevScreenState);
        setScreenState(prevScreenState);
      } else {
        console.log("[useScreenState] Starting fresh onboarding from intro");
        setScreenState('intro');
      }
    }
  }, []);

  return {
    screenState,
    setScreenState
  };
};

export default useScreenState;
