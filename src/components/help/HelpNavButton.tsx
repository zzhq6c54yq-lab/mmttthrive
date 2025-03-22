
import React from "react";
import { useLocation } from "react-router-dom";
import HenryButton from "../henry/HenryButton";
import HelpDialog from "./HelpDialog";
import { useButtonVisibility } from "./RouteVisibility";

const HelpNavButton: React.FC = () => {
  const location = useLocation();
  const isButtonVisible = useButtonVisibility();
  
  // Don't render if button shouldn't be visible
  if (!isButtonVisible) {
    return null;
  }
  
  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <HenryButton userName={undefined} />
      </div>
    </>
  );
};

export default HelpNavButton;
