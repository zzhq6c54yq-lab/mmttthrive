import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import useTranslation from '@/hooks/useTranslation';

const CompactGratitude: React.FC = () => {
  const [gratitude, setGratitude] = useState('');
  const [showFlower, setShowFlower] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleSubmit = () => {
    if (!gratitude.trim()) return;
    
    setShowFlower(true);
    setTimeout(() => setShowFlower(false), 2000);
    
    toast({
      title: isSpanish ? '🌸 Gratitud guardada' : '🌸 Gratitude saved',
      description: isSpanish ? 'Tu jardín está creciendo' : 'Your garden is growing',
    });
    
    setGratitude('');
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      className="bg-gradient-to-br from-community/20 to-wellness/20 rounded-3xl p-6 shadow-md relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-community/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-wellness/20 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-community/30">
            <Heart className="h-5 w-5 text-community" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            {isSpanish ? '💝 Gratitud de Hoy' : '💝 Today\'s Gratitude'}
          </h3>
        </div>

        <input
          type="text"
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder={isSpanish ? 'Estoy agradecido por...' : 'I\'m grateful for...'}
          className="w-full bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-community/50 mb-4"
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/gratitude')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isSpanish ? 'Ver jardín →' : 'View garden →'}
          </button>
          
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Flower className="h-4 w-4" />
            <span>{isSpanish ? '12 esta semana' : '12 this week'}</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFlower && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: -50 }}
            exit={{ scale: 0, opacity: 0, y: -100 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Flower className="h-16 w-16 text-community" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export default CompactGratitude;
