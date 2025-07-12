
import React from "react";
import { motion } from "framer-motion";
import { FeatureItem } from "./featuresData";
import { isFeatureRecommended } from "./featureUtils";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

interface KeyFeaturesGridProps {
  features: FeatureItem[];
  selectedQualities: string[];
  selectedGoals: string[];
  isSpanish: boolean;
  handleNavigate: (path: string) => void;
}

const KeyFeaturesGrid: React.FC<KeyFeaturesGridProps> = ({
  features,
  selectedQualities,
  selectedGoals,
  isSpanish,
  handleNavigate
}) => {
  const { toast } = useToast();
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    // Fallback to a reliable placeholder
    target.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {features.map((feature) => {
        const recommended = isFeatureRecommended(feature.id, selectedQualities, selectedGoals);
        
        return (
          <motion.div
            key={feature.id}
            variants={item}
            className="group cursor-pointer"
            onClick={() => {
              if (!feature.comingSoon) {
                toast({
                  title: isSpanish ? "Navegando..." : "Navigating...",
                  description: isSpanish 
                    ? `Accediendo a ${feature.title}` 
                    : `Accessing ${feature.title}`,
                  duration: 1500,
                });
                handleNavigate(feature.path);
              }
            }}
          >
            <div className="relative bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border/50 hover:border-primary/20">
              {/* Gradient Overlay for better visual appeal */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Coming Soon Badge */}
              {feature.comingSoon && (
                <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                  {isSpanish ? "Próximamente" : "Coming Soon"}
                </div>
              )}
              
              {/* Popular Badge */}
              {feature.popular && !recommended && (
                <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                  ⭐ {isSpanish ? "Popular" : "Popular"}
                </div>
              )}

              {/* Recommended Badge */}
              {recommended && (
                <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-purple-500 to-violet-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                  💫 {isSpanish ? "Recomendado" : "Recommended"}
                </div>
              )}

              {/* Feature Image */}
              <div className="relative h-48 overflow-hidden bg-muted/20">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-300"></div>
                
                {/* Icon overlay on hover */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-50 text-${feature.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <button 
                  className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    feature.comingSoon 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : `bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 text-white hover:from-${feature.color}-600 hover:to-${feature.color}-700 shadow-md hover:shadow-lg group-hover:scale-105`
                  }`}
                  disabled={feature.comingSoon}
                >
                  {feature.comingSoon 
                    ? (isSpanish ? "Próximamente" : "Coming Soon")
                    : (
                      <>
                        {isSpanish ? "Explorar Ahora" : "Explore Now"}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </>
                    )
                  }
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default KeyFeaturesGrid;
