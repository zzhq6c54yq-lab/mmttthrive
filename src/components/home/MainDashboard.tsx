
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import NewFeatures from "@/components/dashboard/NewFeatures";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardTutorial from "@/components/dashboard/DashboardTutorial";
import { useWorkshopNavigation } from "@/components/dashboard/useWorkshopNavigation";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
  markTutorialCompleted?: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature,
  markTutorialCompleted
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSpanish } = useTranslation();
  const [showTutorial, setShowTutorial] = useState(false);
  const { handleWorkshopClick } = useWorkshopNavigation();
  const { toast } = useToast();
  
  // Check if we should show the dashboard tutorial
  useEffect(() => {
    const shouldShowTutorial = localStorage.getItem('shouldShowDashboardTutorial') === 'true';
    const dashboardTutorialShown = localStorage.getItem('dashboardTutorialShown') === 'true';
    
    // Get the previous screen state to determine if coming from onboarding
    const prevScreenState = localStorage.getItem('prevScreenState');
    const comingFromOnboarding = prevScreenState === 'visionBoard' || 
                              prevScreenState === 'subscription' || 
                              prevScreenState === 'moodResponse' || 
                              prevScreenState === 'mood' || 
                              prevScreenState === 'register';
    
    console.log("MainDashboard checking tutorial visibility:", {
      shouldShowTutorial, 
      dashboardTutorialShown, 
      prevScreenState, 
      comingFromOnboarding
    });
    
    // Show tutorial if:
    // 1. We have the explicit flag set, or
    // 2. We're coming from onboarding and haven't shown it before
    if ((shouldShowTutorial || comingFromOnboarding) && !dashboardTutorialShown) {
      console.log("Showing dashboard tutorial from onboarding transition");
      
      // Small delay to ensure it renders after the dashboard is loaded
      setTimeout(() => {
        setShowTutorial(true);
      }, 500);
    }
  }, []);
  
  const handleTutorialClose = () => {
    setShowTutorial(false);
    localStorage.setItem('dashboardTutorialShown', 'true');
    localStorage.removeItem('shouldShowDashboardTutorial');
    
    if (markTutorialCompleted) {
      markTutorialCompleted();
    }
    
    // Show a toast providing guidance on finding the tutorial again
    toast({
      title: isSpanish ? "Tutorial completado" : "Tutorial completed",
      description: isSpanish 
        ? "Puedes volver a ver el tutorial completo en cualquier momento haciendo clic en el botón THRIVE MT en la esquina superior derecha."
        : "You can view the full tutorial again anytime by clicking the THRIVE MT button in the top right corner."
    });
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
      
      {/* This is the transition tutorial that shows after onboarding */}
      <DashboardTutorial 
        showTutorial={showTutorial}
        userName={userName}
        onClose={handleTutorialClose}
      />
    </DashboardBackground>
  );
};

export default MainDashboard;
