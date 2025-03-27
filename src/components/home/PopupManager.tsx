
import React from "react";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";

interface PopupManagerProps {
  showCoPayCredit: boolean;
  setShowCoPayCredit: (show: boolean) => void;
  popupsShown: {
    coPayCredit: boolean;
    henryIntro: boolean;
  };
  children: React.ReactNode;
}

const PopupManager: React.FC<PopupManagerProps> = ({ 
  showCoPayCredit, 
  setShowCoPayCredit, 
  popupsShown,
  children 
}) => {
  return (
    <div className="relative">
      {/* Only show CoPayCredit popup during initial transition */}
      {showCoPayCredit && !popupsShown.coPayCredit && 
        <CoPayCreditPopup 
          open={showCoPayCredit} 
          onOpenChange={setShowCoPayCredit} 
        />
      }
      
      {children}
    </div>
  );
};

export default PopupManager;
