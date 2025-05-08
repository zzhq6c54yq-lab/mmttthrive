
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { handleImageError, getImageUrl, getProgramFallbackImage } from "@/utils/imageUtils";

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
  const [currentSrc, setCurrentSrc] = useState("");
  
  // Initialize and reset image source when component mounts or props change
  useEffect(() => {
    // Process the image URL with our utility to ensure cache busting
    const processedUrl = getImageUrl(imagePath, `base-card-${id}`, getProgramFallbackImage(id));
    setImageLoaded(false);
    setImageError(false);
    setCurrentSrc(processedUrl);
    console.log(`[BaseCard-${id}] Setting image: ${processedUrl}`);
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
    setImageError(true);
    
    // Use the enhanced error handling function to get a program-specific fallback
    const newSrc = handleImageError(e, `base-card-${id}`);
    
    if (newSrc !== currentSrc) {
      console.log(`[BaseCard-${id}] Trying new image source: ${newSrc}`);
      setCurrentSrc(newSrc);
    } else {
      console.warn(`[BaseCard-${id}] Fallback matches current source, using program fallback.`);
      setCurrentSrc(getProgramFallbackImage(id));
    }
  };

  // Animation variants
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
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
            {/* Loading placeholder shown until image loads */}
            <div className={`absolute inset-0 bg-gray-800 animate-pulse transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
            
            {currentSrc && (
              <img 
                src={currentSrc}
                alt={title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onError={handleImageErrorEvent}
                onLoad={handleImageLoad}
                loading="eager"
                data-card-id={id}
                crossOrigin="anonymous"
              />
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
