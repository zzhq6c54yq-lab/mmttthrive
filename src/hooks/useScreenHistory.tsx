
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScreenHistory = (
  screenState: string,
  setScreenState: (state: any) => void
) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.screenState) {
      setScreenState(location.state.screenState);
      
      if (location.state.returnToMain) {
        window.history.replaceState(
          { ...window.history.state, screenState: location.state.screenState, returnToMain: true }, 
          document.title
        );
      } else {
        window.history.replaceState(
          { ...window.history.state, screenState: location.state.screenState }, 
          document.title
        );
      }
    } else if (location.state && location.state.returnToIntro) {
      setScreenState('intro');
      
      window.history.replaceState(
        { ...window.history.state, screenState: 'intro' }, 
        document.title
      );
    } else {
      window.history.replaceState(
        { ...window.history.state, screenState: 'intro' }, 
        document.title
      );
      
      const timer = setTimeout(() => {
        if (screenState === 'intro') {
          setScreenState('mood');
          window.history.replaceState(
            { ...window.history.state, screenState: 'mood' }, 
            document.title
          );
        }
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [location.state, screenState, setScreenState]);

  useEffect(() => {
    window.history.replaceState(
      { ...window.history.state, screenState }, 
      document.title
    );
  }, [screenState]);
};

export default useScreenHistory;
