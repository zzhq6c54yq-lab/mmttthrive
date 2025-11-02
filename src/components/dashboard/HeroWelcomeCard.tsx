import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useTranslation from '@/hooks/useTranslation';

interface HeroWelcomeCardProps {
  userName: string;
  onQuickCheckin?: () => void;
  onTodaysGoals?: () => void;
}

const HeroWelcomeCard: React.FC<HeroWelcomeCardProps> = ({ userName, onQuickCheckin, onTodaysGoals }) => {
  const { isSpanish } = useTranslation();
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
    else if (hour >= 17 && hour < 21) setTimeOfDay('evening');
    else setTimeOfDay('night');

    // Daily inspirational quotes
    const quotes = isSpanish ? [
      "Tómate un momento para conectarte contigo mismo.",
      "Tu bienestar mental es una prioridad.",
      "Cada día es una nueva oportunidad para crecer.",
      "Respira profundamente. Estás haciendo lo mejor que puedes.",
    ] : [
      "Take a moment to check in with yourself.",
      "Your mental wellness is a priority.",
      "Every day is a new opportunity to grow.",
      "Breathe deeply. You're doing the best you can.",
    ];
    setQuote(quotes[new Date().getDate() % quotes.length]);
  }, [isSpanish]);

  const getGreeting = () => {
    const greetings = {
      morning: isSpanish ? 'Buenos días' : 'Good morning',
      afternoon: isSpanish ? 'Buenas tardes' : 'Good afternoon',
      evening: isSpanish ? 'Buenas tardes' : 'Good evening',
      night: isSpanish ? 'Buenas noches' : 'Good night',
    };
    return greetings[timeOfDay];
  };

  const getIcon = () => {
    const icons = {
      morning: Sunrise,
      afternoon: Sun,
      evening: Sunset,
      night: Moon,
    };
    return icons[timeOfDay];
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-8 shadow-md"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="h-8 w-8 text-amber-600" />
          <h2 className="text-3xl font-semibold text-gray-800">
            {getGreeting()}, {userName}
          </h2>
        </div>
        
        <p className="text-lg text-gray-600 mb-6 italic">"{quote}"</p>
        
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={onQuickCheckin}
            className="rounded-full bg-primary hover:bg-primary-glow text-primary-foreground shadow-sm"
          >
            {isSpanish ? 'Registro Rápido' : 'Quick Check-in'}
          </Button>
          <Button
            onClick={onTodaysGoals}
            variant="outline"
            className="rounded-full border-2 border-primary/30 hover:bg-primary/10"
          >
            {isSpanish ? 'Objetivos de Hoy' : 'Today\'s Goals'}
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-rose-200/30 to-transparent rounded-full blur-3xl" />
    </motion.div>
  );
};

export default HeroWelcomeCard;
