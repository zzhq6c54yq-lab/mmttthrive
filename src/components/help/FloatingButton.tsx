
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setIsTransitioning(true);
      setPosition({
        x: Math.min(Math.max(e.clientX - 28, 0), window.innerWidth - 56),
        y: Math.min(Math.max(e.clientY - 28, 0), window.innerHeight - 56)
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isTransitioning) {
        requestAnimationFrame(() => updatePosition(e));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTransitioning]);

  return (
    <Button
      onClick={onClick}
      className="fixed h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      size="icon"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'all 0.3s ease-out'
      }}
      onTransitionEnd={() => setIsTransitioning(false)}
    >
      <span className="text-2xl font-bold">H</span>
    </Button>
  );
};

export default FloatingButton;
