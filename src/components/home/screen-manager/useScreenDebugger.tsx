
import { useEffect } from "react";

export const useScreenDebugger = (screenState: string) => {
  // Debug logging
  useEffect(() => {
    console.log("[IndexScreenManager] Rendering screen:", screenState);
  }, [screenState]);

  useEffect(() => {
    if (screenState === 'intro') {
      console.log("[IndexScreenManager] Starting new session from intro screen");
    }
  }, [screenState]);
};

export default useScreenDebugger;
