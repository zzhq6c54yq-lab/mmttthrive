
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScreenHistory = (
  screenState: string,
  setScreenState: (state: any) => void
) => {
  const location = useLocation();

  useEffect(() => {
    // Check for first visit to properly show onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
    // Debug current state
    console.log("Current screen state:", screenState);
    console.log("Completed onboarding:", hasCompletedOnboarding);
    console.log("Current location:", location.pathname);
    
    // Handle special program paths
    const isSpecialProgramPath = location.pathname.includes('cancer-support') || 
                                location.pathname.includes('chronic-illness') ||
                                location.pathname.includes('golden-years') ||
                                location.pathname.includes('small-business');
    
    if (isSpecialProgramPath) {
      console.log("Detected special program path:", location.pathname);
      // For specialized programs, ensure we're in main state to render properly
      if (screenState !== 'main') {
        console.log("Setting screen state to main for specialized program");
        setScreenState('main');
        
        window.history.replaceState(
          { ...window.history.state, screenState: 'main' }, 
          document.title
        );
      }
      return;
    }
    
    // Handle incoming state from navigation
    if (location.state) {
      console.log("Navigation state:", location.state);
      
      // If returnToFeature is true, we're coming back from an action in a feature
      if (location.state.returnToFeature) {
        // Stay on the current screen state, don't change anything
        console.log("Returning to feature, maintaining state");
      }
      // If we're returning from another feature to the main dashboard
      else if (location.state.returnToMain) {
        setScreenState('main');
        
        window.history.replaceState(
          { ...window.history.state, screenState: 'main', returnToMain: true }, 
          document.title
        );
      } 
      // If we have a specific screen state to set
      else if (location.state.screenState) {
        setScreenState(location.state.screenState);
        
        window.history.replaceState(
          { ...window.history.state, screenState: location.state.screenState }, 
          document.title
        );
      } 
      // If we're explicitly returning to intro
      else if (location.state.returnToIntro) {
        setScreenState('intro');
        
        window.history.replaceState(
          { ...window.history.state, screenState: 'intro' }, 
          document.title
        );
      }
    } else {
      // When returning without state (like browser back button or initial load)
      // Handle root path specially to ensure proper initial display
      if (location.pathname === '/') {
        // If onboarding wasn't completed, start from the beginning
        if (!hasCompletedOnboarding) {
          console.log("Starting onboarding from beginning - no completion record found");
          setScreenState('intro');
          window.history.replaceState(
            { ...window.history.state, screenState: 'intro' }, 
            document.title
          );
        } else {
          // Return to main if onboarding is completed
          console.log("Onboarding already completed, going to main dashboard");
          setScreenState('main');
          window.history.replaceState(
            { ...window.history.state, screenState: 'main' }, 
            document.title
          );
        }
      }
    }
  }, [location, setScreenState, screenState]);

  useEffect(() => {
    console.log("Screen state changed to:", screenState);
    window.history.replaceState(
      { ...window.history.state, screenState }, 
      document.title
    );
    
    // Store the previous screen state for transition detection
    localStorage.setItem('prevScreenState', screenState);
    
    // Mark onboarding as completed when reaching main screen
    if (screenState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  }, [screenState]);
};

export default useScreenHistory;
