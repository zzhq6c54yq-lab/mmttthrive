
import React, { useState, useEffect } from "react";
import FloatingButton from "@/components/help/FloatingButton";
import HelpDialog from "@/components/help/HelpDialog";
import { useButtonVisibility } from "@/components/help/RouteVisibility";

interface HelpButtonProps {
  userName?: string;
}

const HelpButton: React.FC<HelpButtonProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shouldShow = useButtonVisibility();
  
  // Add debug logging to see the value of shouldShow
  useEffect(() => {
    console.log("Help button visibility:", shouldShow);
  }, [shouldShow]);
  
  // If button shouldn't be shown, return null (don't render anything)
  if (!shouldShow) {
    return null;
  }
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      <FloatingButton onClick={() => handleOpenChange(true)} />
      <HelpDialog 
        isOpen={isOpen} 
        onOpenChange={handleOpenChange} 
        userName={userName} 
      />
    </>
  );
};

export default HelpButton;
