
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
    // Only show popups during initial flow from vision board to main
    if (screenState === 'main' && !popupsShown.coPayCredit) {
      setShowCoPayCredit(true);
      setPopupsShown(prev => ({ ...prev, coPayCredit: true }));
      
      // Set a timer to show Henry after the co-pay credit popup is closed
      setTimeout(() => {
        if (!popupsShown.henryIntro) {
          setShowHenry(true);
          setPopupsShown(prev => ({ ...prev, henryIntro: true }));
        }
      }, 1500);
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
