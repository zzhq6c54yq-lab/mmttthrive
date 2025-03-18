
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HelpDialog from "../help/HelpDialog";

interface HenryButtonProps {
  userName?: string;
}

const HenryButton: React.FC<HenryButtonProps> = ({ userName }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        className="cursor-pointer flex items-center justify-center"
      >
        <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <span className="text-xl font-bold">H</span>
        </div>
      </div>
      <HelpDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default HenryButton;
