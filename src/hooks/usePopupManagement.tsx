
import { useState, useEffect } from "react";

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
  mainTutorial: boolean;
}

export const usePopupManagement = (screenState: string) => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
  const [showMainTutorial, setShowMainTutorial] = useState(false);
  const [popupsShown, setPopupsShown] = useState<PopupState>(() => {
    // Initialize state
    return {
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false
    };
  });

  // Reset popup state when URL has reset parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('reset') || queryParams.has('tutorial')) {
      console.log("usePopupManagement: Resetting popup states due to URL parameter");
      resetPopupStates();
      
      // Force tutorial to show
      setShowMainTutorial(true);
    }
  }, []);

  // Main effect for handling popups based on screen state
  useEffect(() => {
    console.log("usePopupManagement: Current screen:", screenState, "showMainTutorial:", showMainTutorial);
    
    if (screenState === 'main') {
      // Show co-pay credit popup if not shown yet
      if (!popupsShown.coPayCredit) {
        setShowCoPayCredit(true);
        setPopupsShown(prev => ({ ...prev, coPayCredit: true }));
      }
      
      // Show Henry when navigating to main from certain screens
      const prevScreenState = localStorage.getItem('prevScreenState');
      if (!popupsShown.henryIntro && 
          (prevScreenState === 'visionBoard' || prevScreenState === 'subscription')) {
        setShowHenry(true);
        setPopupsShown(prev => ({ ...prev, henryIntro: true }));
      }
      
      // Check if tutorial should be shown
      const tutorialShown = localStorage.getItem('mainTutorialShown') === 'true';
      
      if (!tutorialShown || localStorage.getItem('forceTutorial') === 'true') {
        console.log("usePopupManagement: Main screen - showing tutorial");
        setShowMainTutorial(true);
        
        // Clear force flag
        localStorage.removeItem('forceTutorial');
      }
    }
    
    // Save current screen state for next navigation
    localStorage.setItem('prevScreenState', screenState);
  }, [screenState]);

  // Method to mark tutorial as completed
  const markTutorialCompleted = () => {
    console.log("usePopupManagement: Marking tutorial as completed");
    setPopupsShown(prev => ({ ...prev, mainTutorial: true }));
    setShowMainTutorial(false);
    localStorage.setItem('mainTutorialShown', 'true');
  };

  // Method to reset popup states
  const resetPopupStates = () => {
    console.log("usePopupManagement: Resetting all popup states");
    
    localStorage.removeItem('popupsShown');
    localStorage.removeItem('mainTutorialShown');
    localStorage.removeItem('prevScreenState');
    localStorage.setItem('forceTutorial', 'true');
    
    setPopupsShown({
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false
    });
    
    setShowMainTutorial(true);
  };

  return {
    showCoPayCredit,
    setShowCoPayCredit,
    showHenry,
    setShowHenry,
    showMainTutorial,
    setShowMainTutorial,
    popupsShown,
    markTutorialCompleted,
    resetPopupStates
  };
};

export default usePopupManagement;
