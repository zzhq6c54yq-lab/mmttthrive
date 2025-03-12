
import React from "react";
import FloatingButton from "./FloatingButton";
import HelpDialog from "./HelpDialog";
import { useState } from "react";
import { useButtonVisibility } from "./RouteVisibility";

const HelpNavButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const isVisible = useButtonVisibility();
  
  // Don't render if the button shouldn't be visible on this route
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <FloatingButton onClick={() => setShowHelpDialog(true)} />
      
      <HelpDialog 
        isOpen={showHelpDialog} 
        onOpenChange={setShowHelpDialog}
      />
    </>
  );
};

export default HelpNavButton;
