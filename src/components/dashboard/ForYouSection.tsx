import React from 'react';
import { motion } from 'framer-motion';
import useTranslation from '@/hooks/useTranslation';
import { getFeatures } from './key-features/featuresData';

interface ForYouSectionProps {
  navigateToFeature: (path: string) => void;
  selectedQualities?: string[];
  selectedGoals?: string[];
}

const ForYouSection: React.FC<ForYouSectionProps> = ({ 
  navigateToFeature,
  selectedQualities = [],
  selectedGoals = []
}) => {
  const { isSpanish } = useTranslation();
  const features = getFeatures(isSpanish);

  // Get recommended features (first 8)
  const recommendedFeatures = features.slice(0, 8);

  const getGradientFromColor = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'from-learning to-learning/70',
      purple: 'from-mental-health to-mental-health/70',
      green: 'from-wellness to-wellness/70',
      orange: 'from-community to-community/70',
      amber: 'from-urgent to-urgent/70',
    };
    return gradients[color] || 'from-primary to-primary/70';
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        {isSpanish ? '🌟 Recomendado Para Ti' : '🌟 Recommended For You'}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {recommendedFeatures.map((feature, index) => {
          return (
            <motion.button
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigateToFeature(feature.path)}
              className="flex-shrink-0 w-48 bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all group"
              whileHover={{ 
                y: -8,
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                rotateY: 5,
              }}
              whileTap={{ scale: 0.98 }}
              style={{ perspective: 1000 }}
            >
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${getGradientFromColor(feature.color)} mb-4 group-hover:scale-110 transition-transform flex items-center justify-center`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-left">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-left line-clamp-2">{feature.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ForYouSection;
