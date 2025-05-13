
import React, { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface EscapeHatchManagerProps {
  screenState: string;
  setScreenState: (state: any) => void;
}

/**
 * Component to detect and recover from stuck states in the onboarding flow
 */
const EscapeHatchManager: React.FC<EscapeHatchManagerProps> = ({ screenState, setScreenState }) => {
  // Monitor the intro screen for potential stuck state
  useEffect(() => {
    let escapeHatchTimer: NodeJS.Timeout | null = null;
    
    // Only set up escape hatch for intro screen
    if (screenState === 'intro') {
      // Wait a reasonable time to see if user progresses naturally
      escapeHatchTimer = setTimeout(() => {
        console.log("[EscapeHatchManager] Still on intro screen after delay, setting up escape hatch");
        
        // Check if we've been stuck on intro for too long
        const introLoaded = localStorage.getItem('introLoaded');
        const stuckDetection = localStorage.getItem('stuckDetected');
        
        if (introLoaded && !stuckDetection) {
          // Set up escape hatch after another interval if we're still stuck
          const finalEscapeTimer = setTimeout(() => {
            console.log("[EscapeHatchManager] Potential stuck state detected, offering manual escape");
            localStorage.setItem('stuckDetected', 'true');
            
            toast({
              title: "Having trouble?",
              description: "Tap here to continue to the next screen",
              action: (
                <ToastAction 
                  altText="Continue to next screen"
                  onClick={() => {
                    console.log("[EscapeHatchManager] Manual escape activated");
                    localStorage.removeItem('introLoaded');
                    localStorage.removeItem('stuckDetected');
                    localStorage.removeItem('prevScreenState');
                    setScreenState('mood');
                  }}
                >
                  Continue
                </ToastAction>
              ),
              duration: 10000,
            });
          }, 10000);
          
          // Clean up the final escape timer
          return () => {
            if (finalEscapeTimer) clearTimeout(finalEscapeTimer);
          };
        }
      }, 5000);
    }
    
    // Clean up the main escape hatch timer
    return () => {
      if (escapeHatchTimer) clearTimeout(escapeHatchTimer);
    };
  }, [screenState, setScreenState]);
  
  // This component doesn't render anything
  return null;
};

export default EscapeHatchManager;
