
import { useEffect } from "react";

/**
 * Hook for logging screen state changes and helping with debugging
 */
const useScreenDebugger = (screenState: string) => {
  useEffect(() => {
    console.log("[useScreenDebugger] Current screen:", screenState);
    
    // Special handling for the intro screen
    if (screenState === 'intro') {
      console.log("[useScreenDebugger] On intro screen - checking for potential issues");
      
      // Check if localStorage has any conflicting values
      const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
      const prevScreenState = localStorage.getItem('prevScreenState');
      const stuckDetected = localStorage.getItem('stuckDetected');
      const introLoaded = localStorage.getItem('introLoaded');
      
      console.log("[useScreenDebugger] LocalStorage values:", {
        hasCompletedOnboarding,
        prevScreenState,
        stuckDetected,
        introLoaded
      });
      
      // Set introLoaded to detect potential stuck states
      if (!introLoaded) {
        localStorage.setItem('introLoaded', 'true');
        console.log("[useScreenDebugger] Setting introLoaded flag");
      }
    } else if (screenState === 'mood') {
      // Clear the intro loaded flag when successfully moving to mood screen
      localStorage.removeItem('introLoaded');
      localStorage.removeItem('stuckDetected');
      console.log("[useScreenDebugger] Successfully progressed to mood screen");
    }
  }, [screenState]);
};

export default useScreenDebugger;
