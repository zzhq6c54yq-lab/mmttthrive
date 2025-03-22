
import { useLocation } from "react-router-dom";

export const useButtonVisibility = () => {
  const location = useLocation();
  
  // Determine if the button should be visible based on the current route
  const shouldShowButton = () => {
    console.log("Current path for button visibility check:", location.pathname);
    
    // On the index page, we need to check the screenState
    if (location.pathname === "/" || location.pathname === "/index") {
      // Get state from location if available
      const state = location.state as { screenState?: string } | null;
      const screenState = state?.screenState;
      
      // Only show the button on the main dashboard after completing the onboarding
      if (screenState === 'main') {
        console.log("Showing button: On main dashboard");
        return true;
      }
      
      // Hide on all onboarding screens
      const excludedScreenStates = ['intro', 'mood', 'moodResponse', 'register', 'subscription', 'visionBoard'];
      if (excludedScreenStates.includes(String(screenState))) {
        console.log("Hiding button: On excluded screen state:", screenState);
        return false;
      }
      
      // Hide on all other/unknown states of the index page
      console.log("Hiding button: Unknown index page state:", screenState);
      return false;
    }
    
    // Now we will show buttons on all screens except for these specific ones
    const excludedScreens = [
      '/creator' // Only exclude the creator screen
    ];
    
    // Check if the current path is in the excluded screens list
    if (excludedScreens.includes(location.pathname)) {
      console.log("Hiding button: Exact match for excluded screen:", location.pathname);
      return false;
    }
    
    // By default, now show the button on all screens after the main screen is shown
    console.log("Showing button: Default for path:", location.pathname);
    return true;
  };

  return shouldShowButton();
};
