
import React, { useState, useEffect } from "react";
import { Menu, MessageCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HenryDialog from "@/components/henry/HenryDialog";
import { useUser } from "@/contexts/UserContext";

interface ThriveHeaderProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  onMenuClick: () => void;
}

const ThriveHeader: React.FC<ThriveHeaderProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  onMenuClick
}) => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const [showHenryDialog, setShowHenryDialog] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled 
            ? 'bg-card/95 backdrop-blur-xl shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={onMenuClick}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
              <button onClick={() => navigate('/')} className="text-2xl font-semibold text-foreground hover:text-primary transition-colors">
                ThriveMT
              </button>
            </div>

            {/* Right: Henry + Profile */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHenryDialog(true)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors relative"
                aria-label="Chat with Henry"
              >
                <MessageCircle className="h-6 w-6 text-primary" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              </button>
              
              <button
                onClick={() => navigate('/profile')}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Profile"
              >
                <User className="h-6 w-6 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16" />
      
      <HenryDialog 
        isOpen={showHenryDialog} 
        onOpenChange={setShowHenryDialog}
        userName={userName}
      />
    </>
  );
};

export default ThriveHeader;
