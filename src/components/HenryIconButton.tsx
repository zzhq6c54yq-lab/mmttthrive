
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface HenryIconButtonProps {
  className?: string;
  onClick?: () => void;
}

const HenryIconButton: React.FC<HenryIconButtonProps> = ({ 
  className = "",
  onClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { screenState?: string } | null;

  // Don't show the button on initial screens
  if (!state?.screenState || state.screenState !== 'main') {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/", { state: { screenState: 'main', showHenry: true } });
    }
  };

  return (
    <Button
      variant="bronze"
      size="h-icon"
      className={`rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 p-0 ${className}`}
      onClick={handleClick}
      aria-label="Ask Henry for Help"
      title="Ask Henry for Help"
    >
      <div className="h-full w-full flex items-center justify-center">
        <div className="relative h-6 w-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold shadow-inner">
          <span className="text-sm">H</span>
        </div>
      </div>
    </Button>
  );
};

export default HenryIconButton;
