
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HelpDialog from "../help/HelpDialog";
import { Heart, RotateCcw } from "lucide-react";

interface HenryButtonProps {
  userName?: string;
  triggerInitialGreeting?: boolean;
}

const HenryButton: React.FC<HenryButtonProps> = ({ userName, triggerInitialGreeting }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    // Open the dialog automatically if triggerInitialGreeting is true
    if (triggerInitialGreeting) {
      setIsDialogOpen(true);
    }
  }, [triggerInitialGreeting]);
  
  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        className="cursor-pointer fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
        aria-label="Open Henry support chat"
      >
        <div className="relative h-16 w-16 flex items-center justify-center transition-transform duration-300 hover:scale-110">
          {/* Head silhouette with gradient effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black via-gray-700 to-transparent opacity-80 shadow-lg"></div>
          
          {/* Brain pattern backdrop */}
          <div className="absolute inset-1 rounded-full bg-black/10 backdrop-blur-sm"></div>
          
          {/* Animated circular arrow */}
          <div className="absolute inset-2 rounded-full border-2 border-white/50 animate-spin" style={{ animationDuration: '12s' }}></div>
          
          {/* Main head silhouette with heart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png" 
              alt="Henry - Mental Health Assistant" 
              className="h-full w-full object-contain animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B87333]/10 via-transparent to-[#B87333]/10 animate-pulse" style={{ animationDuration: '5s' }}></div>
          </div>
          
          {/* Pulsing effect */}
          <div className="absolute inset-[-5px] rounded-full border border-[#B87333]/30 animate-ping" style={{ animationDuration: '2.5s' }}></div>
        </div>
        
        {/* Text label below the button */}
        <div className="mt-2 text-center">
          <span className="text-sm font-medium text-white bg-black/70 px-2 py-1 rounded-full shadow-lg border border-[#B87333]/30">
            Henry
          </span>
        </div>
      </div>
      
      <HelpDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default HenryButton;
