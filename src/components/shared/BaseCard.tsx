
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { handleImageError } from "@/utils/imageUtils";

export interface BaseCardProps {
  id: string;
  title: string;
  imagePath: string;
  path: string;
  gradient?: string;
  icon?: React.ReactNode;
  onClick?: (path: string) => void;
  badge?: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({
  id,
  title,
  imagePath,
  path,
  gradient = "bg-gradient-to-r from-blue-600 to-indigo-600",
  icon,
  onClick,
  badge
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(imagePath);
  
  // Add effect to reset state when imagePath changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setCurrentSrc(imagePath);
    console.log(`[BaseCard-${id}] Setting image: ${imagePath}`);
  }, [imagePath, id]);

  const handleClick = () => {
    if (onClick) {
      onClick(path);
    }
  };

  const handleImageLoad = () => {
    console.log(`[BaseCard-${id}] Image loaded successfully: ${currentSrc}`);
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageErrorEvent = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`[BaseCard-${id}] Image failed to load: ${currentSrc}`);
    // Choose a fallback based on the card type to match theme
    let fallbackImage = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
    
    // Select theme-appropriate fallbacks based on card ID
    if (id.includes("military") || id.includes("dod")) {
      fallbackImage = "https://images.unsplash.com/photo-1551702600-493e4d0ea256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
    } else if (id.includes("golden") || id.includes("senior")) {
      fallbackImage = "https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
    } else if (id.includes("adolescent") || id.includes("teen")) {
      fallbackImage = "https://images.unsplash.com/photo-1518101645466-7795885ff8b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
    } else if (id.includes("responder") || id.includes("emergency")) {
      fallbackImage = "https://images.unsplash.com/photo-1633270216455-4fe3ee093bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
    } else if (id.includes("law") || id.includes("enforcement")) {
      fallbackImage = "https://images.unsplash.com/photo-1551732998-9573f695fdbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
    }
    
    setImageError(true);
    const newSrc = handleImageError(e, `base-card-${id}`, fallbackImage);
    setCurrentSrc(newSrc);
  };

  // Animation variants
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      key={id}
      variants={item}
      className="relative"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={handleClick}
        className="w-full h-full text-left"
        aria-label={title}
      >
        <div className="relative rounded-xl overflow-hidden h-44 shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Image Section (3/4 of height) */}
          <div className="absolute inset-0 h-[75%] overflow-hidden">
            <img 
              src={currentSrc}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={handleImageErrorEvent}
              onLoad={handleImageLoad}
              loading="eager"
              data-card-id={id}
              key={`${id}-img-${currentSrc}`} // Force re-render when src changes
              crossOrigin="anonymous" // Add this to prevent CORS issues
            />
            
            {/* Show a loading state while image loads */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
            )}
            
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Icon overlay */}
            {icon && (
              <div className="absolute top-2 left-2">
                <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                  {icon}
                </div>
              </div>
            )}
            
            {/* Badge if provided */}
            {badge && (
              <div className="absolute top-2 right-2">
                {badge}
              </div>
            )}
          </div>
          
          {/* Color Section with Title (1/4 of height) */}
          <div className={`absolute bottom-0 left-0 right-0 h-[25%] ${gradient} flex items-center justify-center`}>
            <h3 className="font-bold text-sm text-white truncate text-center w-full px-2">
              {title}
            </h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default BaseCard;
