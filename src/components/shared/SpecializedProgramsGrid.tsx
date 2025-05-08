
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { addOns } from "@/components/home/subscription-addons/data";
import useTranslation from "@/hooks/useTranslation";
import BaseCard from "./BaseCard";
import { clearImageCache, getImageUrl, getProgramFallbackImage } from "@/utils/imageUtils";

interface SpecializedProgramsGridProps {
  onProgramClick: (path: string) => void;
}

const SpecializedProgramsGrid: React.FC<SpecializedProgramsGridProps> = ({ onProgramClick }) => {
  const { isSpanish } = useTranslation();
  const [refreshKey, setRefreshKey] = useState(Date.now());
  
  useEffect(() => {
    console.log("SpecializedProgramsGrid mounted/updated, refreshKey:", refreshKey);
    
    // Clear image cache on component mount to force fresh loading
    clearImageCache();
    
    // Force refresh after mount and then again after a delay
    const initialRefreshTimer = setTimeout(() => {
      setRefreshKey(Date.now());
      console.log("Forcing first refresh of SpecializedProgramsGrid");
    }, 200);
    
    const secondRefreshTimer = setTimeout(() => {
      setRefreshKey(prev => prev + 1);
      console.log("Forcing second refresh of SpecializedProgramsGrid");
    }, 2000);
    
    return () => {
      clearTimeout(initialRefreshTimer);
      clearTimeout(secondRefreshTimer);
    };
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="py-6" key={`specialized-programs-${refreshKey}`}>
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {addOns.map((addon) => {
          const Icon = addon.icon;
          
          // Create badge for recommended programs
          const badge = addon.recommended ? (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium">
              {isSpanish ? "Recomendado" : "Recommended"}
            </span>
          ) : null;
          
          // Process image URL with strong cache busting
          const timestamp = Date.now();
          const randomId = Math.floor(Math.random() * 10000);
          const processedImageUrl = getImageUrl(
            addon.imagePath, 
            `specialized-grid-${addon.id}-${refreshKey}-${randomId}`, 
            getProgramFallbackImage(addon.id)
          );
          
          console.log(`[SpecializedProgramsGrid] Rendering ${addon.id} with image: ${processedImageUrl}`);
          
          return (
            <BaseCard
              key={`${addon.id}-${refreshKey}-${randomId}`}
              id={addon.id}
              title={addon.title}
              imagePath={processedImageUrl}
              path={addon.path}
              gradient={addon.gradient}
              icon={<Icon className="h-4 w-4 text-white" />}
              onClick={onProgramClick}
              badge={badge}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default SpecializedProgramsGrid;
