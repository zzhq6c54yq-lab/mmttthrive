
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import HelpDialog from "@/components/help/HelpDialog";
import HenryIntroDialog from "@/components/henry/HenryIntroDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { useButtonVisibility } from "../help/RouteVisibility";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const HelpNavButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const [isSpanish, setIsSpanish] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isButtonVisible = useButtonVisibility();
  
  // Check language preference and listen for changes
  useEffect(() => {
    const checkLanguage = () => {
      const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
      setIsSpanish(preferredLanguage === 'Español');
    };
    
    // Check initial language
    checkLanguage();
    
    // Listen for language change events
    window.addEventListener('languageChange', checkLanguage);
    
    // Cleanup
    return () => {
      window.removeEventListener('languageChange', checkLanguage);
    };
  }, []);
  
  // Handle opening the help dialog
  const openHelp = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Show Henry's intro first
    setShowIntroDialog(true);
  };

  const handleIntroContinue = () => {
    setShowIntroDialog(false);
    setShowHelpDialog(true);
  };

  const handleMainDashboard = () => {
    // Always navigate to main screen with the 'main' screenState to avoid intro screens
    navigate("/", { state: { screenState: 'main' } });
  };

  // Don't render if button shouldn't be visible
  if (!isButtonVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-3">
        <Button
          onClick={openHelp}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label={isSpanish ? "Obtener Ayuda" : "Get Help"}
          title={isSpanish ? "Obtener Ayuda" : "Get Help"}
        >
          <Avatar className="h-10 w-10 border-2 border-white/30">
            <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
            <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold">H</AvatarFallback>
          </Avatar>
        </Button>
        
        <Button
          onClick={handleMainDashboard}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label={isSpanish ? "Volver al Panel Principal" : "Return to Main Dashboard"}
          title={isSpanish ? "Volver al Panel Principal" : "Return to Main Dashboard"}
        >
          <div className="bg-[#1a1a1f]/80 rounded-full h-9 w-9 flex items-center justify-center">
            <div className="text-[#B87333] font-bold text-base leading-none tracking-tighter flex flex-col items-center">
              <span className="text-[6px] opacity-80 mb-0.5">THRIVE</span>
              <span>MT</span>
            </div>
          </div>
        </Button>
      </div>
      
      <HenryIntroDialog 
        open={showIntroDialog} 
        onOpenChange={setShowIntroDialog}
        onContinue={handleIntroContinue}
      />
      
      <HelpDialog 
        isOpen={showHelpDialog} 
        onOpenChange={setShowHelpDialog}
      />
    </>
  );
};

export default HelpNavButton;
