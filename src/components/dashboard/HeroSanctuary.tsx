import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sun, Sunset, Moon, Flame, Target, Coins } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';

interface HeroSanctuaryProps {
  userName: string;
  onQuickCheckin: () => void;
  onTodaysGoals: () => void;
}

const HeroSanctuary: React.FC<HeroSanctuaryProps> = ({ 
  userName, 
  onQuickCheckin, 
  onTodaysGoals 
}) => {
  const { isSpanish } = useTranslation();
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [moodSelection, setMoodSelection] = useState<number | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
    else if (hour >= 17 && hour < 21) setTimeOfDay('evening');
    else setTimeOfDay('night');
  }, []);

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

  const moods = ['😊', '😐', '😔', '😰', '😤'];
  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-wellness/20 via-mental-health/20 to-learning/20 p-8 md:p-12 shadow-lg mb-8"
      style={{ minHeight: '60vh' }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-wellness/10 via-transparent to-mental-health/10 animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-learning/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-wellness/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        {/* Left: Welcome Card */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-white/50 backdrop-blur-md">
              <Icon className="h-8 w-8 text-foreground" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-foreground">
                {getGreeting()}, {userName}
              </h1>
              <p className="text-xl text-foreground/70 mt-2">
                {isSpanish ? 'Tómate un momento para conectar contigo mismo' : 'Take a moment to check in with yourself'}
              </p>
            </div>
          </div>

          {/* Mood Selector */}
          <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 shadow-md">
            <p className="text-lg font-medium text-foreground mb-4">
              {isSpanish ? '¿Cómo te sientes hoy?' : 'How are you feeling today?'}
            </p>
            <div className="flex gap-4 justify-center">
              {moods.map((mood, index) => (
                <motion.button
                  key={index}
                  onClick={() => setMoodSelection(index)}
                  className={`text-5xl transition-all ${
                    moodSelection === index ? 'scale-125' : 'scale-100 opacity-70 hover:opacity-100 hover:scale-110'
                  }`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mood}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <motion.button
              onClick={onQuickCheckin}
              className="flex-1 min-w-[180px] bg-wellness/80 hover:bg-wellness text-white rounded-full px-6 py-4 font-medium shadow-md transition-all"
              whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              {isSpanish ? 'Chequeo Rápido' : 'Quick Check-in'}
            </motion.button>
            <motion.button
              onClick={onTodaysGoals}
              className="flex-1 min-w-[180px] bg-mental-health/80 hover:bg-mental-health text-white rounded-full px-6 py-4 font-medium shadow-md transition-all"
              whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              {isSpanish ? 'Objetivos de Hoy' : "Today's Goals"}
            </motion.button>
          </div>
        </div>

        {/* Right: Stats Dashboard */}
        <div className="md:col-span-2 space-y-4">
          <motion.div
            className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-md"
            whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-urgent/20">
                <Flame className="h-6 w-6 text-urgent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3 {isSpanish ? 'días' : 'days'}</p>
                <p className="text-sm text-foreground/60">{isSpanish ? 'Racha actual' : 'Current streak'}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-md"
            whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-learning/20">
                <Coins className="h-6 w-6 text-learning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">125</p>
                <p className="text-sm text-foreground/60">{isSpanish ? 'Créditos' : 'Credits'}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-md"
            whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-wellness/20">
                <Target className="h-6 w-6 text-wellness" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{isSpanish ? 'Nivel' : 'Level'} 7</p>
                <p className="text-sm text-foreground/60">{isSpanish ? 'Tu progreso' : 'Your progress'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSanctuary;
