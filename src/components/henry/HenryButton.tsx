
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import HenryDialog from "./HenryDialog";
import HenryIntroDialog from "./HenryIntroDialog";

interface HenryButtonProps {
  userName?: string;
  triggerInitialGreeting?: boolean;
}

const HenryButton: React.FC<HenryButtonProps> = ({ 
  userName = "",
  triggerInitialGreeting = false
}) => {
  const [showHenryDialog, setShowHenryDialog] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const [introShown, setIntroShown] = useState(false);
  const location = useLocation();
  
  // Check if Henry intro has been shown before using localStorage
  useEffect(() => {
    const henryIntroShown = localStorage.getItem('henryIntroShown') === 'true';
    setIntroShown(henryIntroShown);
  }, []);

  // Show intro dialog when arriving at main for the first time
  useEffect(() => {
    const fromOnboarding = triggerInitialGreeting && !introShown;
    
    if (fromOnboarding) {
      setShowIntroDialog(true);
      setIntroShown(true);
      // Store that Henry intro has been shown
      localStorage.setItem('henryIntroShown', 'true');
    }
  }, [triggerInitialGreeting, introShown]);

  const handleOpenHenry = () => {
    setShowHenryDialog(true);
  };
  
  const handleIntroDialogContinue = () => {
    setShowIntroDialog(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenHenry}
        className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white shadow-lg flex items-center justify-center"
      >
        <span className="text-2xl font-bold">H</span>
      </Button>

      <HenryDialog 
        isOpen={showHenryDialog} 
        onOpenChange={setShowHenryDialog}
        userName={userName}
      />
      
      <HenryIntroDialog 
        open={showIntroDialog} 
        onOpenChange={setShowIntroDialog}
        onContinue={handleIntroDialogContinue}
      />
    </>
  );
};

export default HenryButton;
