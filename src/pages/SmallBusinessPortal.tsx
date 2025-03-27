
import React from "react";
import PortalOptionsScreen from "@/components/small-business/PortalOptionsScreen";
import TeaserScreen from "@/components/small-business/TeaserScreen";
import WelcomeScreen from "@/components/small-business/WelcomeScreen";
import useSmallBusinessPortal from "@/hooks/useSmallBusinessPortal";

const SmallBusinessPortal: React.FC = () => {
  const {
    screenState,
    handleContinueFromTeaser,
    handleSelectOption,
    navigateToBusinessExperience
  } = useSmallBusinessPortal();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23F97316%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#F97316]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#FB923C]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        {screenState === 'options' && <PortalOptionsScreen onSelectOption={handleSelectOption} />}
        {screenState === 'teaser' && <TeaserScreen onContinue={handleContinueFromTeaser} />}
        {screenState === 'welcome' && <WelcomeScreen onContinue={navigateToBusinessExperience} />}
      </div>
    </div>
  );
};

export default SmallBusinessPortal;
