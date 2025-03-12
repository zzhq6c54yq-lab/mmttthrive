
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
        {/* Up arrow */}
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
        >
          <ArrowUp className="h-5 w-5" />
          <MousePointer className="h-3 w-3 text-white/60 absolute animate-bounce -right-6" />
        </Button>
        
        {/* Left arrow */}
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
        >
          <ArrowLeft className="h-5 w-5" />
          <MousePointer className="h-3 w-3 text-white/60 absolute animate-bounce -left-6" />
        </Button>
        
        {/* Henry button (centered) */}
        <Button
          onClick={handleHenryClick}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
        >
          <span className="text-xl font-bold">H</span>
        </Button>
        
        {/* Home button */}
        <Button
          onClick={handleHomeClick}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
        >
          <Home className="h-5 w-5" />
        </Button>
        
        {/* Right arrow */}
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
        >
          <ArrowRight className="h-5 w-5" />
          <MousePointer className="h-3 w-3 text-white/60 absolute animate-bounce -right-6" />
        </Button>
        
        {/* Down arrow */}
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
        >
          <ArrowDown className="h-5 w-5" />
          <MousePointer className="h-3 w-3 text-white/60 absolute animate-bounce -right-6" style={{ animationDelay: '0.5s' }} />
        </Button>
        
        {/* Help button */}
        <Button
          onClick={onClick}
          className="h-10 w-10 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
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
