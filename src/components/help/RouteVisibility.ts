
import { useLocation } from "react-router-dom";

export const useButtonVisibility = () => {
  const location = useLocation();
  
  // Determine if the button should be visible based on the current route
  const shouldShowButton = () => {
    // Define the main menu routes where the button SHOULD start to appear
    const mainMenuRoutes = [
      '/',      // Main menu
      '/index'  // Main menu alternate route
    ];
    
    // Feature routes after the main menu where the button should also appear
    const featureRoutes = [
      '/mental-wellness-tools',
      '/workshops',
      '/real-time-therapy',
      '/scheduling',
      '/privacy-security',
      '/my-sponsor',
      '/therapist-questionnaire',
      '/therapist-matches',
      '/workshop',
      '/virtual-meetings',
      '/mental-health-games',
      '/personalized-content',
      '/community-support',
      '/resource-library',
      '/progress-reports'
    ];
    
    // First screens before the main menu where button should NEVER appear
    const preMainMenuScreens = [
      '/initial-screen',
      '/emotional-check',
      '/registration',
      '/pricing-plan',
      '/vision-board',
      '/onboarding',
      '/cheese-plant',
      '/creator'
    ];
    
    // Current path checking logic - debug output to see why button might still be showing
    console.log("Current path:", location.pathname);
    
    // First, check if we're on a pre-main menu screen - if so, NEVER show the button
    for (const screen of preMainMenuScreens) {
      if (location.pathname === screen || location.pathname.startsWith(`${screen}/`)) {
        console.log("Hiding button: On pre-main menu screen");
        return false;
      }
    }
    
    // Check if the path contains any keywords indicating it's part of the pre-main menu flow
    const preMainMenuKeywords = ['initial', 'emotional', 'registration', 'pricing', 'vision', 'onboarding', 'cheese', 'creator'];
    
    for (const keyword of preMainMenuKeywords) {
      if (location.pathname.includes(keyword)) {
        console.log("Hiding button: Path contains pre-main menu keyword:", keyword);
        return false;
      }
    }
    
    // Check if current path is exactly a main menu route - show button
    if (mainMenuRoutes.includes(location.pathname)) {
      console.log("Showing button: On main menu");
      return true;
    }
    
    // Check if current path matches or is a sub-route of a feature route - show button
    for (const route of featureRoutes) {
      if (location.pathname === route || location.pathname.startsWith(`${route}/`)) {
        console.log("Showing button: On feature route");
        return true;
      }
    }
    
    // If we're on the first 5 screens, hide the button
    // This is a fallback for any screens that might be before the main menu
    // but aren't explicitly listed in preMainMenuScreens
    console.log("Default visibility decision for path:", location.pathname);
    
    // For unknown paths, default to hiding the button to be safe
    // This ensures the button only appears on known, post-main-menu screens
    return false;
  };

  return shouldShowButton();
};
