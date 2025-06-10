
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScreenHistory = (
  screenState: string,
  setScreenState: (state: any) => void
) => {
  const location = useLocation();

  // Handle initial routing and special program paths
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    
    console.log("[useScreenHistory] Current screen state:", screenState);
    console.log("[useScreenHistory] Completed onboarding:", hasCompletedOnboarding);
    console.log("[useScreenHistory] Current location:", location.pathname);
    
    // Handle special program paths - always ensure we're in main state for these
    const isSpecialProgramPath = location.pathname.includes('cancer-support') || 
                                location.pathname.includes('chronic-illness') ||
                                location.pathname.includes('golden-years') ||
                                location.pathname.includes('small-business');
    
    if (isSpecialProgramPath) {
      console.log("[useScreenHistory] Detected special program path:", location.pathname);
      if (screenState !== 'main') {
        console.log("[useScreenHistory] Setting screen state to main for specialized program");
        setScreenState('main');
      }
      return;
    }
    
    // Only handle history state if we're on the root path
    if (location.pathname !== '/') {
      return;
    }
    
    // Handle incoming state from navigation
    if (location.state) {
      console.log("[useScreenHistory] Navigation state:", location.state);
      
      if (location.state.returnToFeature) {
        console.log("[useScreenHistory] Returning to feature, maintaining state");
        return;
      } else if (location.state.returnToMain) {
        setScreenState('main');
        return;
      } else if (location.state.screenState) {
        setScreenState(location.state.screenState);
        return;
      } else if (location.state.returnToIntro) {
        setScreenState('intro');
        return;
      }
    }
    
    // For the root path, respect the onboarding completion status
    if (location.pathname === '/') {
      // If onboarding is completed, only then go to main
      if (hasCompletedOnboarding === 'true' && screenState !== 'main') {
        console.log("[useScreenHistory] Onboarding completed, navigating to main");
        setScreenState('main');
      }
      // If onboarding is not completed, ensure we start from intro
      else if (hasCompletedOnboarding !== 'true' && screenState === 'main') {
        console.log("[useScreenHistory] Onboarding not completed, resetting to intro");
        setScreenState('intro');
      }
    }
  }, [location, setScreenState, screenState]);

  // Record screen state changes to localStorage
  useEffect(() => {
    console.log("[useScreenHistory] Screen state changed to:", screenState);
    
    // Store the previous screen state for transition detection
    localStorage.setItem('prevScreenState', screenState);
    
    // Only mark onboarding as completed when explicitly reaching main screen through the flow
    if (screenState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  }, [screenState]);
};

export default useScreenHistory;
