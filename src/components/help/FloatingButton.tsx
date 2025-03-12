
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Home, MousePointer, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import HenryDialog from "@/components/HenryDialog";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'left' | 'right' | null>(null);
  const [scrollInterval, setScrollIntervalId] = useState<number | null>(null);
  const [showHenry, setShowHenry] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const startScrolling = (direction: 'up' | 'down' | 'left' | 'right') => {
    setIsScrolling(true);
    setScrollDirection(direction);
    
    if (scrollInterval) {
      window.clearInterval(scrollInterval);
    }
    
    const intervalId = window.setInterval(() => {
      if (direction === 'up') {
        window.scrollBy(0, -40);
      } else if (direction === 'down') {
        window.scrollBy(0, 40);
      } else if (direction === 'left') {
        window.scrollBy(-40, 0);
      } else if (direction === 'right') {
        window.scrollBy(40, 0);
      }
    }, 50);
    
    setScrollIntervalId(intervalId);

    // Show visual feedback when scrolling
    toast({
      title: `Scrolling ${direction}`,
      description: `Click again or release to stop scrolling`,
      duration: 1500,
    });
  };
  
  const stopScrolling = () => {
    if (scrollInterval) {
      window.clearInterval(scrollInterval);
      setScrollIntervalId(null);
    }
    setIsScrolling(false);
    setScrollDirection(null);
  };
  
  const handleHomeClick = () => {
    navigate("/", { state: { screenState: 'main' } });
  };

  const handleHenryClick = () => {
    setShowHenry(true);
    toast({
      title: "Henry Assistant",
      description: "How can I help you today?",
      duration: 3000,
    });
  };
  
  useEffect(() => {
    return () => {
      if (scrollInterval) {
        window.clearInterval(scrollInterval);
      }
    };
  }, [scrollInterval]);

  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2 z-50">
        {/* Up arrow with enhanced cursor indicator */}
        <Button
          onClick={() => startScrolling('up')}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className={`h-10 w-10 rounded-full ${
            scrollDirection === 'up' 
              ? 'bg-[#A56625]' 
              : 'bg-gradient-to-br from-[#B87333] to-[#E5C5A1]'
          } text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative`}
          size="icon"
          aria-label="Scroll up"
        >
          <ArrowUp className="h-5 w-5" />
          <div className="absolute -top-10 flex items-center animate-bounce">
            <MousePointer className="h-4 w-4 text-white/90" />
            <span className="text-xs text-white/90 ml-1 bg-black/50 px-2 py-1 rounded">Scroll Up</span>
          </div>
        </Button>
        
        {/* Left arrow with enhanced cursor indicator */}
        <Button
          onClick={() => startScrolling('left')}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className={`h-10 w-10 rounded-full ${
            scrollDirection === 'left' 
              ? 'bg-[#A56625]' 
              : 'bg-gradient-to-br from-[#B87333] to-[#E5C5A1]'
          } text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center absolute -left-14 top-1/2 -translate-y-1/2 group relative`}
          size="icon"
          aria-label="Scroll left"
        >
          <ArrowLeft className="h-5 w-5" />
          <div className="absolute -left-16 flex items-center animate-bounce">
            <MousePointer className="h-4 w-4 text-white/90" />
            <span className="text-xs text-white/90 ml-1 bg-black/50 px-2 py-1 rounded">Scroll Left</span>
          </div>
        </Button>
        
        {/* Henry button (centered) */}
        <Button
          onClick={handleHenryClick}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label="Open Henry assistant"
        >
          <span className="text-xl font-bold">H</span>
        </Button>
        
        {/* Home button */}
        <Button
          onClick={handleHomeClick}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label="Go to home page"
        >
          <Home className="h-5 w-5" />
        </Button>
        
        {/* Right arrow with enhanced cursor indicator */}
        <Button
          onClick={() => startScrolling('right')}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className={`h-10 w-10 rounded-full ${
            scrollDirection === 'right' 
              ? 'bg-[#A56625]' 
              : 'bg-gradient-to-br from-[#B87333] to-[#E5C5A1]'
          } text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center absolute -right-14 top-1/2 -translate-y-1/2 group relative`}
          size="icon"
          aria-label="Scroll right"
        >
          <ArrowRight className="h-5 w-5" />
          <div className="absolute -right-16 flex items-center animate-bounce">
            <span className="text-xs text-white/90 mr-1 bg-black/50 px-2 py-1 rounded">Scroll Right</span>
            <MousePointer className="h-4 w-4 text-white/90" />
          </div>
        </Button>
        
        {/* Down arrow with enhanced cursor indicator */}
        <Button
          onClick={() => startScrolling('down')}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className={`h-10 w-10 rounded-full ${
            scrollDirection === 'down' 
              ? 'bg-[#A56625]' 
              : 'bg-gradient-to-br from-[#B87333] to-[#E5C5A1]'
          } text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative`}
          size="icon"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5" />
          <div className="absolute -bottom-10 flex items-center animate-bounce">
            <MousePointer className="h-4 w-4 text-white/90" />
            <span className="text-xs text-white/90 ml-1 bg-black/50 px-2 py-1 rounded">Scroll Down</span>
          </div>
        </Button>
        
        {/* Help button */}
        <Button
          onClick={onClick}
          className="h-10 w-10 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label="Get help"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
      
      <HenryDialog 
        isOpen={showHenry} 
        onOpenChange={setShowHenry}
      />
    </>
  );
};

export default FloatingButton;
