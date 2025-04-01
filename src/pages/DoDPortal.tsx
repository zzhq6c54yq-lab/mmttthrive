
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Users, BrainCircuit } from "lucide-react";
import HomeButton from "@/components/HomeButton";
import DoDMainMenu from "@/components/dod/DoDMainMenu";

// Welcome screens before the main portal
const WelcomeScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <div className="absolute top-4 right-4 z-20">
        <HomeButton />
      </div>
      
      <div className="mb-6">
        <Shield className="h-16 w-16 text-[#0EA5E9] mx-auto mb-3 animate-pulse" style={{ animationDuration: '3s' }} />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">
        Military Mental Health Portal
      </h1>
      
      <div className="max-w-2xl relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0EA5E9]/20 to-[#2563EB]/20 rounded-lg blur"></div>
        <div className="relative bg-black/40 backdrop-blur-md rounded-xl p-6 border border-[#0EA5E9]/30">
          <p className="text-xl mb-6 text-white/90 font-medium">
            Thank you for your service and sacrifice. Your mental health matters deeply 
            to us, and we're honored to support your journey toward wellness.
          </p>
          <p className="text-lg mb-6 text-white/90 font-medium">
            Here, you'll find resources tailored specifically for active duty members, veterans, 
            and military families facing the unique challenges of military life.
          </p>
          <p className="text-lg mb-8 text-white/90 font-medium">
            You are not alone in this journey. We're here to support you every step of the way.
          </p>
        </div>
      </div>
      
      <Button 
        onClick={onContinue}
        className="mt-8 bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] hover:from-[#0D94D1] hover:to-[#2254CC] text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
      >
        Continue <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

const PortalIntroScreen: React.FC<{ onEnterPortal: () => void }> = ({ onEnterPortal }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <div className="absolute top-4 right-4 z-20">
        <HomeButton />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">
        Welcome to Your Military Support Portal
      </h1>
      
      <div className="max-w-3xl mb-8 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0EA5E9]/20 to-[#2563EB]/20 rounded-lg blur"></div>
        <div className="relative bg-black/40 backdrop-blur-md rounded-xl p-6 border border-[#0EA5E9]/30">
          <p className="text-xl mb-6 text-white/90 font-medium">
            This secure space is designed specifically for service members, veterans, 
            and their families to access mental health resources.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-left">
              <Shield className="h-6 w-6 text-[#0EA5E9] mb-2" />
              <h3 className="text-white font-medium mb-1">Specialized Support</h3>
              <p className="text-white/80 text-sm">Resources designed for the unique challenges of military life</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-left">
              <Users className="h-6 w-6 text-[#0EA5E9] mb-2" />
              <h3 className="text-white font-medium mb-1">Community Connection</h3>
              <p className="text-white/80 text-sm">Connect with peers who understand your experiences</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-left">
              <BrainCircuit className="h-6 w-6 text-[#0EA5E9] mb-2" />
              <h3 className="text-white font-medium mb-1">Holistic Wellness</h3>
              <p className="text-white/80 text-sm">Tools for mental, emotional, and physical health</p>
            </div>
          </div>
          
          <p className="text-lg mb-4 text-white/90 font-medium">
            Browse our comprehensive collection of resources, connect with 
            specialized support, and access tools designed for military life.
          </p>
        </div>
      </div>
      
      <Button 
        onClick={onEnterPortal}
        className="mt-4 bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] hover:from-[#0D94D1] hover:to-[#2254CC] text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
      >
        Enter Military Support Portal <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

// Main Portal Screen using our new DoDMainMenu component
const PortalScreen: React.FC = () => {
  return (
    <div className="py-6 px-4 animate-fade-in">
      <DoDMainMenu />
    </div>
  );
};

const DoDPortal: React.FC = () => {
  const [screenState, setScreenState] = useState<'welcome' | 'intro' | 'portal'>('welcome');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleContinueToIntro = () => {
    setScreenState('intro');
    window.scrollTo(0, 0);
  };

  const handleEnterPortal = () => {
    setScreenState('portal');
    window.scrollTo(0, 0);
    
    toast({
      title: "Welcome to the Military Support Portal",
      description: "Accessing specialized mental health resources for military personnel and families",
      duration: 3000
    });
  };

  const renderCurrentScreen = () => {
    switch (screenState) {
      case 'welcome':
        return <WelcomeScreen onContinue={handleContinueToIntro} />;
      case 'intro':
        return <PortalIntroScreen onEnterPortal={handleEnterPortal} />;
      case 'portal':
        return <PortalScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%230EA5E9%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-xl relative overflow-hidden border border-[#0EA5E9]/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#0EA5E9]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#2563EB]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

export default DoDPortal;
