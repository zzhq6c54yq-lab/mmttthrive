
import React from "react";
import HelpNavButton from "@/components/help/HelpNavButton";

interface HelpButtonProps {
  userName?: string;
}

const HelpButton: React.FC<HelpButtonProps> = ({ userName }) => {
  // This component is now just a wrapper for HelpNavButton for backward compatibility
  return <HelpNavButton />;
};

export default HelpButton;
