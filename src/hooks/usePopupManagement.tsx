
import { useState, useEffect } from "react";

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
  mainTutorial: boolean;
  transitionTutorial: boolean;
}

export const usePopupManagement = (screenState: string) => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
  const [showTransitionTutorial, setShowTransitionTutorial] = useState(false);
  const [showMainTutorial, setShowMainTutorial] = useState(true); // Set to true by default
  const [popupsShown, setPopupsShown] = useState<PopupState>(() => {
    // Initialize with empty state
    const storedState = localStorage.getItem('popupsShown');
    
    // For testing purposes, always reset the storage
    localStorage.removeItem('popupsShown');
    localStorage.removeItem('hasVisitedThriveMT');
    localStorage.removeItem('dashboardTutorialShown');
    
    return {
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false,
      transitionTutorial: false
    };
  });

  // Reset popup state when URL has reset parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('reset') || queryParams.has('tutorial')) {
      console.log("Resetting popup states due to URL parameter");
      resetPopupStates();
      
      // Force tutorial to show
      setShowMainTutorial(true);
      console.log("Setting showMainTutorial to true due to URL parameter");
    }
  }, []);

  // Main effect for handling popups based on screen state
  useEffect(() => {
    console.log("usePopupManagement - Current screen:", screenState, "showMainTutorial:", showMainTutorial);
    
    if (screenState === 'main') {
      // Show co-pay credit popup if not shown yet
      if (!popupsShown.coPayCredit) {
        setShowCoPayCredit(true);
        setPopupsShown(prev => ({ ...prev, coPayCredit: true }));
      }
      
      // Show Henry when navigating to main from registration or vision board
      const prevScreenState = localStorage.getItem('prevScreenState');
      if (!popupsShown.henryIntro && 
          (prevScreenState === 'visionBoard' || prevScreenState === 'subscription')) {
        setShowHenry(true);
        setPopupsShown(prev => ({ ...prev, henryIntro: true }));
      }
      
      // ALWAYS force tutorial to show when in main screen
      console.log("On main screen - forcing tutorial to show");
      setShowMainTutorial(true);
      
      // Reset flags to ensure tutorial shows
      localStorage.removeItem('popupsShown');
      localStorage.removeItem('hasVisitedThriveMT');
      localStorage.removeItem('dashboardTutorialShown');
    }
    
    // Save current screen state as previous for next navigation
    localStorage.setItem('prevScreenState', screenState);
  }, [screenState]);

  // Method to mark tutorial as completed
  const markTutorialCompleted = () => {
    console.log("Marking tutorial as completed");
    setPopupsShown(prev => ({ ...prev, mainTutorial: true, transitionTutorial: true }));
    setShowMainTutorial(false);
    localStorage.setItem('hasVisitedThriveMT', 'true');
    localStorage.setItem('dashboardTutorialShown', 'true');
  };

  // Method to reset popup states (useful for testing)
  const resetPopupStates = () => {
    console.log("Resetting all popup states");
    
    // Clear ALL localStorage items that might interfere
    localStorage.removeItem('popupsShown');
    localStorage.removeItem('hasVisitedThriveMT');
    localStorage.removeItem('prevScreenState');
    localStorage.removeItem('dashboardTutorialShown');
    localStorage.removeItem('tutorialShown');
    
    // Reset state
    setPopupsShown({
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false,
      transitionTutorial: false
    });
    
    // Force show tutorial
    setShowMainTutorial(true);
    
    console.log("Reset complete - tutorial should now show on next navigation to main screen");
  };

  return {
    showCoPayCredit,
    setShowCoPayCredit,
    showHenry,
    setShowHenry,
    showTransitionTutorial,
    setShowTransitionTutorial,
    showMainTutorial,
    setShowMainTutorial,
    popupsShown,
    markTutorialCompleted,
    resetPopupStates
  };
};

export default usePopupManagement;
