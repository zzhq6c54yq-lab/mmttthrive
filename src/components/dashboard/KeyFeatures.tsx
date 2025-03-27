
import React from "react";
import useFeatureNavigation from "@/hooks/useFeatureNavigation";
import keyFeatures from "@/data/featuresData";
import BackgroundEffect from "./feature-components/BackgroundEffect";
import FeatureHeader from "./feature-components/FeatureHeader";
import FeatureGrid from "./feature-components/FeatureGrid";

const KeyFeatures: React.FC = () => {
  const { handleFeatureClick } = useFeatureNavigation();

  return (
    <div className="mb-12 relative">
      <BackgroundEffect />
      
      <div className="relative z-10 px-4 pt-12 pb-10">
        <FeatureHeader 
          title="Key Features" 
          subtitle="Tools and resources designed for your mental wellness journey" 
        />
        
        <FeatureGrid 
          features={keyFeatures} 
          onFeatureClick={handleFeatureClick} 
        />
      </div>
    </div>
  );
};

export default KeyFeatures;
