
import React from "react";
import FloatingButton from "./FloatingButton";
import HelpDialog from "./HelpDialog";
import { useState } from "react";

const HelpNavButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);

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
