
import React from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#1a1a20] flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <div className="intro-logo-icon mb-4">
          <img 
            src="/lovable-uploads/7d06dcc4-22d6-4a52-8d1a-ad5febe60afb.png" 
            alt="Thrive MT Logo" 
            className="h-64 w-auto mx-auto" 
            style={{ filter: "brightness(0) saturate(100%) invert(100%) sepia(43%) saturate(1352%) hue-rotate(337deg) brightness(89%) contrast(91%)" }}
          />
        </div>
        <h1 className="intro-logo-text text-5xl md:text-7xl font-bold mb-2">
          <span className="copper-text">Thrive MT</span>
        </h1>
        <h2 className="intro-logo-text text-2xl md:text-3xl font-semibold mb-4">
          <span className="text-white">New Beginnings</span>
        </h2>
        <p className="intro-tagline text-xl md:text-2xl text-[#B87333] mb-4">
          because life should be more then just surviving
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;
