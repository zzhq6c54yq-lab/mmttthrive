
import React, { useEffect } from "react";

interface EscapeHatchManagerProps {
  screenState: string;
  setScreenState: (state: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main') => void;
}

const EscapeHatchManager: React.FC<EscapeHatchManagerProps> = ({ screenState, setScreenState }) => {
  // Detect if we might be stuck and allow a way to progress
  useEffect(() => {
    const stuckTimer = setTimeout(() => {
      if (screenState === 'intro') {
        console.log("[EscapeHatchManager] Still on intro screen after delay, setting up escape hatch");
        const escapeHatch = document.createElement('div');
        escapeHatch.id = 'escape-hatch';
        escapeHatch.style.position = 'fixed';
        escapeHatch.style.bottom = '10px';
        escapeHatch.style.left = '10px';
        escapeHatch.style.padding = '5px';
        escapeHatch.style.background = 'rgba(0,0,0,0.5)';
        escapeHatch.style.color = 'white';
        escapeHatch.style.cursor = 'pointer';
        escapeHatch.style.zIndex = '9999';
        escapeHatch.innerText = 'Force Next Screen';
        escapeHatch.onclick = () => {
          console.log("[EscapeHatchManager] Escape hatch clicked, forcing next screen");
          setScreenState('mood');
        };
        
        // Only add if it doesn't exist yet
        if (!document.getElementById('escape-hatch')) {
          document.body.appendChild(escapeHatch);
        }
      } else {
        // Remove the escape hatch if we're no longer on intro
        const existingHatch = document.getElementById('escape-hatch');
        if (existingHatch) {
          existingHatch.remove();
        }
      }
    }, 5000);
    
    return () => {
      clearTimeout(stuckTimer);
      const existingHatch = document.getElementById('escape-hatch');
      if (existingHatch) {
        existingHatch.remove();
      }
    };
  }, [screenState, setScreenState]);

  return null;
};

export default EscapeHatchManager;
