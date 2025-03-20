
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HelpDialog from "../help/HelpDialog";
import HenryIntroDialog from "./HenryIntroDialog";
import { useButtonVisibility } from "../help/RouteVisibility";

interface HenryButtonProps {
  userName?: string;
  triggerInitialGreeting?: boolean;
}

const HenryButton: React.FC<HenryButtonProps> = ({ userName, triggerInitialGreeting }) => {
  const [isIntroDialogOpen, setIsIntroDialogOpen] = useState(false);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const isVisible = useButtonVisibility();
  
  useEffect(() => {
    // Open the intro dialog automatically if triggerInitialGreeting is true
    if (triggerInitialGreeting) {
      setIsIntroDialogOpen(true);
    }
  }, [triggerInitialGreeting]);
  
  const handleIntroContinue = () => {
    // Close the intro dialog and open the chat dialog
    setIsIntroDialogOpen(false);
    setIsChatDialogOpen(true);
  };
  
  // Don't render the button if it shouldn't be visible
  if (!isVisible) {
    return null;
  }
  
  return (
    <>
      <div 
        onClick={() => setIsIntroDialogOpen(true)}
        className="cursor-pointer fixed right-6 bottom-6 z-50"
        aria-label="Open Henry support chat"
      >
        <div className="relative h-12 w-12 flex items-center justify-center transition-transform duration-300 hover:scale-110">
          {/* Copper/bronze gradient circle background to match app theme */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] shadow-lg"></div>
          
          {/* Inner circle for depth */}
          <div className="absolute inset-[2px] rounded-full bg-white/90"></div>
          
          {/* Letter H */}
          <div className="relative z-10 text-xl font-bold text-[#B87333]">H</div>
          
          {/* Pulsing glow effect */}
          <div className="absolute inset-[-3px] rounded-full bg-gradient-to-r from-[#B87333]/50 to-[#E5C5A1]/50 animate-pulse" style={{ animationDuration: '3s' }}></div>
        </div>
      </div>
      
      {/* Henry Introduction Dialog */}
      <HenryIntroDialog 
        open={isIntroDialogOpen} 
        onOpenChange={setIsIntroDialogOpen}
        onContinue={handleIntroContinue}
      />
      
      {/* Henry Chat Dialog */}
      <HelpDialog 
        isOpen={isChatDialogOpen} 
        onOpenChange={setIsChatDialogOpen} 
      />
    </>
  );
};

export default HenryButton;
