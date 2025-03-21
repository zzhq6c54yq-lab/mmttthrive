
import { useState, useEffect } from "react";

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
}

export const usePopupManagement = (screenState: string) => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
  const [popupsShown, setPopupsShown] = useState<PopupState>({
    coPayCredit: false,
    henryIntro: false
  });

  useEffect(() => {
    // Show popups during initial flow when transferring to main menu
    if (screenState === 'main') {
      // Show co-pay credit popup if not shown yet
      if (!popupsShown.coPayCredit) {
        setShowCoPayCredit(true);
        setPopupsShown(prev => ({ ...prev, coPayCredit: true }));
      }
      
      // Always show Henry when navigating to main from other screens
      setShowHenry(true);
      
      // Set a timer to mark Henry intro as shown if it wasn't shown yet
      if (!popupsShown.henryIntro) {
        setTimeout(() => {
          setPopupsShown(prev => ({ ...prev, henryIntro: true }));
        }, 500);
      }
    }
  }, [screenState, popupsShown]);

  return {
    showCoPayCredit,
    setShowCoPayCredit,
    showHenry,
    setShowHenry,
    popupsShown,
  };
};

export default usePopupManagement;
