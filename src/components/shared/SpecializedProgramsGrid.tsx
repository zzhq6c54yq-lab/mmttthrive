
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
  const [addOnsData, setAddOnsData] = useState(addOns);
  
  // Clear image cache and set up a delayed rendering to ensure proper image loading
  useEffect(() => {
    console.log("SpecializedProgramsGrid mounted");
    
    // Clear image cache on component mount to force fresh loading
    clearImageCache();
    
    // Pre-process data to ensure all necessary fields are present
    const processedAddOns = addOns.map(addon => ({
      ...addon,
      imagePath: addon.imagePath || getProgramFallbackImage(addon.id)
    }));
    
    setAddOnsData(processedAddOns);
    
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
  
  // Function to get fallback image based on addon ID
  const getProgramFallbackImage = (id: string): string => {
    const timestamp = Date.now();
    
    if (id.includes("military") || id.includes("dod")) {
      return `https://images.unsplash.com/photo-1551702600-493e4d0ea256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
    } else if (id.includes("golden") || id.includes("senior")) {
      return `https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
    } else if (id.includes("adolescent") || id.includes("teen")) {
      return `https://images.unsplash.com/photo-1518101645466-7795885ff8b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
    } else if (id.includes("responder") || id.includes("emergency")) {
      return `https://images.unsplash.com/photo-1633270216455-4fe3ee093bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
    } else if (id.includes("law") || id.includes("enforcement")) {
      return `https://images.unsplash.com/photo-1551732998-9573f695fdbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
    } else if (id.includes("small-business")) {
      return `https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
    } else if (id.includes("college")) {
      return `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
    } else if (id.includes("chronic") || id.includes("illness")) {
      return `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
    }
    
    // General fallback
    return `https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80&t=${timestamp}`;
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
          {addOnsData.map((addon) => {
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
