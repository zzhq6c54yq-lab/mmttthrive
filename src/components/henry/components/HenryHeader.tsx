
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Heart, Brain, MessageCircle } from "lucide-react";

interface HenryHeaderProps {
  emergencyMode?: boolean;
  onClose: () => void;
}

const HenryHeader: React.FC<HenryHeaderProps> = ({ 
  emergencyMode = false,
  onClose 
}) => {
  return (
    <>
      <div className="absolute right-2 top-2 z-10">
        <Button 
          className="p-1 h-6 w-6 rounded-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      <DialogHeader className="text-center relative mb-3">
        <div className="flex justify-center mb-2">
          <div className="relative h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#B87333] to-[#E5C5A1] shadow-lg">
            <div className="absolute inset-[3px] rounded-full bg-white/90"></div>
            <div className="relative z-10 text-xl font-bold text-[#B87333]">H</div>
            {emergencyMode && (
              <div className="absolute inset-0 rounded-full border-2 border-red-600 animate-pulse"></div>
            )}
          </div>
        </div>
        <DialogTitle className={`text-lg ${emergencyMode ? "text-red-400" : "text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]"}`}>
          {emergencyMode ? "Emergency Support Mode" : "Henry, Your Digital Counselor"}
        </DialogTitle>
        <DialogDescription className={emergencyMode ? "text-red-300" : "text-white/70 text-xs"}>
          {emergencyMode 
            ? "Connecting you with a human counselor..." 
            : "Supporting your mental wellness journey"
          }
        </DialogDescription>
        <div className="mt-1 text-xs text-white/60 px-2 flex items-center justify-center gap-2">
          <Heart className="h-3 w-3 text-[#B87333]" />
          <Brain className="h-3 w-3 text-[#B87333]" />
          <MessageCircle className="h-3 w-3 text-[#B87333]" />
        </div>
      </DialogHeader>
    </>
  );
};

export default HenryHeader;
