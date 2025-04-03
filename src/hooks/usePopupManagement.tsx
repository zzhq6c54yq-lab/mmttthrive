
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
      mainTutorial: localStorage.getItem('mainTutorialShown') === 'true'
    };
  });

  // Reset popup state when URL has reset parameter or when forced tutorial is enabled
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const forceTutorial = localStorage.getItem('forceTutorial') === 'true';
    
    if (queryParams.has('reset') || queryParams.has('tutorial') || forceTutorial) {
      console.log("usePopupManagement: Resetting popup states due to URL parameter or forceTutorial flag");
      resetPopupStates();
      
      // Force tutorial to show (delay slightly to ensure state updates properly)
      setTimeout(() => {
        setShowMainTutorial(true);
      }, 100);
    }
  }, []);

  // Main effect for handling popups based on screen state
  useEffect(() => {
    console.log("usePopupManagement: Current screen:", screenState, 
                "showMainTutorial:", showMainTutorial,
                "forceTutorial:", localStorage.getItem('forceTutorial'),
                "mainTutorialShown:", localStorage.getItem('mainTutorialShown'));
    
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
      const forceTutorial = localStorage.getItem('forceTutorial') === 'true';
      
      if (!tutorialShown || forceTutorial) {
        console.log("usePopupManagement: Main screen - should show tutorial", 
                    "tutorialShown:", tutorialShown, 
                    "forceTutorial:", forceTutorial);
        
        // Small delay to ensure state is ready
        setTimeout(() => {
          setShowMainTutorial(true);
        }, 100);
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
    localStorage.removeItem('forceTutorial');
  };

  // Method to reset popup states
  const resetPopupStates = () => {
    console.log("usePopupManagement: Resetting all popup states");
    
    // Clean local storage entries
    localStorage.removeItem('mainTutorialShown');
    localStorage.removeItem('prevScreenState');
    localStorage.removeItem('popupsShown');
    
    // Set force tutorial flag
    localStorage.setItem('forceTutorial', 'true');
    
    // Reset state
    setPopupsShown({
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false
    });
    
    // Ensure tutorial will be shown
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
