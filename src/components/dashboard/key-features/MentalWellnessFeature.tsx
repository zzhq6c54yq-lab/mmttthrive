
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MentalWellnessMenu from "@/components/mental-wellness/MentalWellnessMenu";
import useTranslation from "@/hooks/useTranslation";

interface MentalWellnessFeatureProps {
  id: string;
  title: string;
  description: string;
  path: string;
  color: string;
  image: string;
  isRecommended: boolean;
  isSpanish: boolean;
  handleNavigate: (path: string) => void;
}

const MentalWellnessFeature: React.FC<MentalWellnessFeatureProps> = ({
  id,
  title,
  description,
  path,
  color,
  image,
  isRecommended,
  isSpanish,
  handleNavigate
}) => {
  const { isSpanish: translationIsSpanish } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    console.log(`Image error for ${id}:`, image);
    setImageError(true);
  };

  // Animation variants
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <>
      <motion.div
        variants={item}
        className="relative"
        whileHover={{ y: -5, scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={() => setDialogOpen(true)}
          className="w-full h-full text-left"
          aria-label={title}
        >
          <div className="relative overflow-hidden rounded-xl h-44 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 h-full w-full">
              <div className="absolute inset-0 h-[70%] overflow-hidden">
                <img 
                  src={imageError ? "https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" : image} 
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              
              <div className={`absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-br ${color} flex items-center justify-center`}>
                <h3 className="font-bold text-sm text-white truncate text-center w-full px-2">
                  {title}
                </h3>
              </div>
            </div>
            
            <div className="absolute inset-0 p-3 flex flex-col justify-between">
              <div>
                <div className="p-1.5 rounded-full bg-white/20 w-fit backdrop-blur-sm inline-flex">
                  <Brain />
                </div>
                
                {isRecommended && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium float-right">
                    {isSpanish ? "Recomendado" : "Recommended"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      </motion.div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-violet-500" />
              {translationIsSpanish ? "Recursos de Bienestar Mental" : "Mental Wellness Resources"}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="mt-4">
            <MentalWellnessMenu 
              onNavigate={(path) => {
                setDialogOpen(false);
                handleNavigate(path);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MentalWellnessFeature;
