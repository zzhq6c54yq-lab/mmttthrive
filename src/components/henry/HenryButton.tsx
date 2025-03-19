
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HelpDialog from "../help/HelpDialog";
import { useButtonVisibility } from "../help/RouteVisibility";

interface HenryButtonProps {
  userName?: string;
  triggerInitialGreeting?: boolean;
}

const HenryButton: React.FC<HenryButtonProps> = ({ userName, triggerInitialGreeting }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isVisible = useButtonVisibility();
  
  useEffect(() => {
    // Open the dialog automatically if triggerInitialGreeting is true
    if (triggerInitialGreeting) {
      setIsDialogOpen(true);
    }
  }, [triggerInitialGreeting]);
  
  // Don't render the button if it shouldn't be visible
  if (!isVisible) {
    return null;
  }
  
  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        className="cursor-pointer fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
        aria-label="Open Henry support chat"
      >
        <div className="relative h-16 w-16 flex items-center justify-center transition-transform duration-300 hover:scale-110">
          {/* Copper/bronze gradient circle background to match app theme */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] shadow-lg"></div>
          
          {/* Inner circle for depth */}
          <div className="absolute inset-[3px] rounded-full bg-white/90"></div>
          
          {/* Letter H */}
          <div className="relative z-10 text-3xl font-bold text-[#B87333]">H</div>
          
          {/* Pulsing glow effect */}
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#B87333]/50 to-[#E5C5A1]/50 animate-pulse" style={{ animationDuration: '3s' }}></div>
        </div>
        
        {/* Text label below the button */}
        <div className="mt-2 text-center">
          <span className="text-sm font-medium text-white bg-gradient-to-r from-[#B87333] to-[#E5C5A1] px-2 py-1 rounded-full shadow-lg">
            Henry
          </span>
        </div>
      </div>
      
      <HelpDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default HenryButton;
