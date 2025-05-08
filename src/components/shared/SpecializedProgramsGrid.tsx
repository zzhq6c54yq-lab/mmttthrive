
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { addOns } from "@/components/home/subscription-addons/data";
import useTranslation from "@/hooks/useTranslation";
import BaseCard from "./BaseCard";
import { clearImageCache } from "@/utils/imageUtils";

interface SpecializedProgramsGridProps {
  onProgramClick: (path: string) => void;
}

const SpecializedProgramsGrid: React.FC<SpecializedProgramsGridProps> = ({ onProgramClick }) => {
  const { isSpanish } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  
  // Clear image cache and set up a delayed rendering to ensure proper image loading
  useEffect(() => {
    console.log("SpecializedProgramsGrid mounted");
    
    // Clear image cache on component mount to force fresh loading
    clearImageCache();
    
    // Small delay to ensure DOM is ready before showing content
    const timer = setTimeout(() => {
      setLoaded(true);
      console.log("SpecializedProgramsGrid ready to render content");
    }, 100);
    
    return () => {
      clearTimeout(timer);
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
    <div className="py-6">
      {loaded ? (
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
            
            return (
              <BaseCard
                key={`${addon.id}-card`}
                id={addon.id}
                title={addon.title}
                imagePath={addon.imagePath}
                path={addon.path}
                gradient={addon.gradient}
                icon={<Icon className="h-4 w-4 text-white" />}
                onClick={onProgramClick}
                badge={badge}
              />
            );
          })}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {addOns.map((addon) => (
            <div 
              key={`${addon.id}-placeholder`}
              className="h-44 rounded-xl bg-gray-800/50 animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecializedProgramsGrid;
