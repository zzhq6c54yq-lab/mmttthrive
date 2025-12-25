import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, UserPlus, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/useTranslation';

interface DemoOverlayProps {
  onShowTour: () => void;
}

const DemoOverlay: React.FC<DemoOverlayProps> = ({ onShowTour }) => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const handleExitDemo = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    window.location.href = 'https://thrive-mental.app/auth';
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
      {/* Demo Mode Badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/95 backdrop-blur-sm border border-[#B87333]/40 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B87333] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5C5A1]"></span>
          </span>
          <span className="text-sm font-medium text-[#E5C5A1]">
            {isSpanish ? 'Modo Demo' : 'Demo Mode'}
          </span>
        </div>

        <div className="w-px h-5 bg-white/20" />

        {/* Tour button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onShowTour}
          className="text-white/70 hover:text-white hover:bg-white/10 h-7 px-2"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>

        {/* Exit Demo button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExitDemo}
          className="text-white/70 hover:text-white hover:bg-white/10 h-7 px-2"
        >
          <LogOut className="h-4 w-4 mr-1" />
          <span className="text-xs">{isSpanish ? 'Salir' : 'Exit'}</span>
        </Button>
      </div>

      {/* Sign Up CTA */}
      <Button
        onClick={handleSignUp}
        size="sm"
        className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white shadow-lg h-9"
      >
        <UserPlus className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium">{isSpanish ? 'Registrarse' : 'Sign Up'}</span>
      </Button>
    </div>
  );
};

export default DemoOverlay;
