
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import NewFeatures from "@/components/dashboard/NewFeatures";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardTutorial from "@/components/dashboard/DashboardTutorial";
import { useWorkshopNavigation } from "@/components/dashboard/useWorkshopNavigation";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSpanish, setIsSpanish] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const { handleWorkshopClick } = useWorkshopNavigation();
  
  // Check language preference and listen for changes
  useEffect(() => {
    const checkLanguage = () => {
      const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
      setIsSpanish(preferredLanguage === 'Español');
    };
    
    // Check initial language
    checkLanguage();
    
    // Listen for language change events
    window.addEventListener('languageChange', checkLanguage);
    
    // Cleanup
    return () => {
      window.removeEventListener('languageChange', checkLanguage);
    };
  }, []);
  
  // Check if coming from onboarding screens and force tutorial if needed
  useEffect(() => {
    // Check if coming from onboarding screens
    const prevScreenState = localStorage.getItem('prevScreenState');
    const comingFromOnboarding = prevScreenState === 'visionBoard' || 
                                prevScreenState === 'subscription' || 
                                prevScreenState === 'moodResponse' || 
                                prevScreenState === 'mood' || 
                                prevScreenState === 'register';
    
    console.log("DASHBOARD TRIGGER: Previous screen state:", prevScreenState);
    console.log("Coming from onboarding:", comingFromOnboarding);
    
    if (comingFromOnboarding) {
      console.log("MainDashboard forcing tutorial to show");
      
      // Force reset the dashboard tutorial flag 
      localStorage.setItem('dashboardTutorialShown', 'false');
      
      // Reset the popupsShown tutorial flags in localStorage as well
      const popupsShown = localStorage.getItem('popupsShown');
      if (popupsShown) {
        const parsedState = JSON.parse(popupsShown);
        parsedState.mainTutorial = false;
        parsedState.transitionTutorial = false;
        localStorage.setItem('popupsShown', JSON.stringify(parsedState));
      }
      
      // Set local tutorial state
      setShowTutorial(true);
      
      console.log("Reset tutorial flags in MainDashboard, showTutorial =", true);
    }
  }, []);
  
  const handleTutorialClose = () => {
    setShowTutorial(false);
    localStorage.setItem('dashboardTutorialShown', 'true');
  };
  
  return (
    <DashboardBackground>
      <Header />
      
      <ThriveHeader 
        userName={userName}
        showHenry={showHenry}
        onHenryToggle={onHenryToggle}
      />

      <NewFeatures />
      
      <DashboardContent 
        navigate={navigate}
        onWorkshopClick={handleWorkshopClick}
      />
      
      <DashboardTutorial 
        showTutorial={showTutorial}
        userName={userName}
        onClose={handleTutorialClose}
      />
    </DashboardBackground>
  );
};

export default MainDashboard;
