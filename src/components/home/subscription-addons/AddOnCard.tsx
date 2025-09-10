
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AddOn } from "./data";
import { getImageUrl, handleImageError, getProgramFallbackImage } from "@/utils/imageUtils";

interface AddOnCardProps {
  addOn: AddOn;
  isSelected: boolean;
  expandedAddon: string | null;
  priceDisplay: React.ReactNode;
  onToggleExpand: (id: string) => void;
  onToggle: (id: string) => void;
}

const AddOnCard: React.FC<AddOnCardProps> = ({
  addOn,
  isSelected,
  expandedAddon,
  priceDisplay,
  onToggleExpand,
  onToggle,
}) => {
  const Icon = addOn.icon;
  const [imageSrc, setImageSrc] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageAttempts, setImageAttempts] = useState(0);

  // Initialize image source with proper cache busting
  useEffect(() => {
    const processedUrl = getImageUrl(
      addOn.imagePath, 
      `addon-card-${addOn.id}`,
      getProgramFallbackImage(addOn.id)
    );
    setImageSrc(processedUrl);
    setImageLoaded(false);
  }, [addOn.id, addOn.imagePath]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageErrorEvent = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Limit retry attempts to prevent infinite loops
    if (imageAttempts < 2) {
      const fallbackSrc = handleImageError(e, `addon-card-${addOn.id}`);
      
      console.error(`Failed to load image for ${addOn.id}, using fallback`);
      setImageSrc(fallbackSrc);
      setImageAttempts(prev => prev + 1);
    } else {
      // After multiple failures, use a guaranteed working fallback
      const emergencyFallback = getProgramFallbackImage(addOn.id);
      console.warn(`Multiple attempts failed for ${addOn.id}, using emergency fallback`);
      setImageSrc(emergencyFallback);
    }
  };

  return (
    <motion.div 
      className={`relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 ${
        isSelected ? 'ring-2 ring-[#B87333]' : 'hover:scale-102'
      }`}
      onClick={() => onToggle(addOn.id)}
    >
      <div className="absolute inset-0 h-[60%] z-0">
        {/* Show skeleton loader until image loads */}
        <div className={`absolute inset-0 bg-gray-800 animate-pulse transition-opacity ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
        
        <img 
          src={imageSrc || getProgramFallbackImage(addOn.id)} 
          alt={addOn.title}
          className={`w-full h-full object-cover transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={handleImageErrorEvent}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Icon className="h-6 w-6 text-white" />
            </div>
            
            {isSelected && (
              <div className="bg-[#B87333] text-white p-1 rounded-full">
                <Check className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
      
        <div className={`p-4 bg-gradient-to-br ${addOn.gradient} mt-auto`}>
          <h3 className="font-semibold text-lg mb-1">
            {addOn.title}
          </h3>
          <p className="text-sm text-white/90 mb-2 line-clamp-2">
            {addOn.description}
          </p>

          <div className="text-xs text-white/80 mb-3">
            <strong className="block mb-1">For: </strong> 
            {addOn.targetAudience}
          </div>

          <div className="relative">
            <button
              className="text-xs text-white/90 underline flex items-center mb-2"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(addOn.id);
              }}
            >
              {expandedAddon === addOn.id ? "Hide details" : "See what's included"}
            </button>
            
            {expandedAddon === addOn.id && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    onToggleExpand(addOn.id);
                  }
                }}
              >
                <div 
                  className="bg-gray-900/95 backdrop-blur-sm border border-white/30 rounded-lg p-4 max-w-sm w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Key Features</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleExpand(addOn.id);
                      }}
                      className="text-white/70 hover:text-white text-xl leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <ul className="text-sm text-white/90 space-y-2">
                    {addOn.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 bg-[#B87333] rounded-full mt-2 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{priceDisplay}</span>
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/10 text-white hover:bg-white/30"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(addOn.id);
              }}
            >
              {isSelected ? "Selected" : "Select"}
            </Button>
          </div>
        </div>
        
        {isSelected && (
          <div 
            className="absolute inset-0 border-2 opacity-100 transition-opacity"
            style={{ borderColor: addOn.borderColor }}  
          ></div>
        )}
      </div>
    </motion.div>
  );
};

export default AddOnCard;
