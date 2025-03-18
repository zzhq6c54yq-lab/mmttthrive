
import React from "react";
import { useLocation } from "react-router-dom";
import NavigationHelpButton from "../navigation/NavigationHelpButton";

const HelpNavButton: React.FC = () => {
  const location = useLocation();
  
  // On the index page, visibility is controlled by the NavigationHelpButton component itself
  // based on the screenState
  return <NavigationHelpButton />;
};

export default HelpNavButton;
