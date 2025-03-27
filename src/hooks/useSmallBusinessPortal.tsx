
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type ScreenState = 'options' | 'teaser' | 'welcome';

export const useSmallBusinessPortal = () => {
  const [screenState, setScreenState] = useState<ScreenState>('options');
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (location.state && location.state.fromMainMenu) {
      setScreenState('options');
    } else if (location.state && location.state.screenState) {
      setScreenState(location.state.screenState as ScreenState);
    }
  }, [location]);

  const handleContinueFromTeaser = () => {
    setScreenState('welcome');
    window.scrollTo(0, 0);
  };

  const handleSelectOption = (option: 'business' | 'employee') => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    toast({
      title: option === 'business' ? "Business Hub Selected" : "Employee Readiness Selected",
      description: "Accessing your specialized resources...",
      duration: 3000
    });
    
    if (option === 'business') {
      setScreenState('teaser');
      window.scrollTo(0, 0);
      setIsNavigating(false);
    } else {
      setTimeout(() => {
        navigate("/employee-welcome");
        setIsNavigating(false);
      }, 500);
    }
  };

  const navigateToBusinessExperience = () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/small-business-experience");
      setIsNavigating(false);
    }, 500);
  };

  return {
    screenState,
    handleContinueFromTeaser,
    handleSelectOption,
    navigateToBusinessExperience
  };
};

export default useSmallBusinessPortal;
