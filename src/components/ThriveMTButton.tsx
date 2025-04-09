
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

const ThriveMTButton: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  
  const handleMainDashboard = () => {
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? "Regresando al panel principal" : "Returning to main dashboard",
      duration: 1500,
    });
    
    // Navigate to main screen with the 'main' screenState to avoid intro screens
    // Also prevent tutorials from showing
    navigate("/", { 
      state: { 
        screenState: 'main',
        preventTutorial: true 
      } 
    });
  };
  
  return (
    <Button
      onClick={handleMainDashboard}
      variant="outline"
      className="h-10 w-10 p-0 rounded-full bg-white text-[#B87333] border-2 border-[#B87333] hover:bg-white/90 hover:text-[#B87333]/90 shadow-md transition-all duration-300 flex items-center justify-center"
      aria-label={isSpanish ? "Volver al Panel Principal" : "Return to Main Dashboard"}
      title={isSpanish ? "Volver al Panel Principal" : "Return to Main Dashboard"}
    >
      <div className="font-bold text-sm leading-none tracking-tighter">
        MT
      </div>
    </Button>
  );
};

export default ThriveMTButton;
