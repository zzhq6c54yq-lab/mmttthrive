import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sunrise, Sun, Sunset, Moon, Flame, Target, Coins, ChevronDown, Sparkles } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-10 md:p-16 mb-8 border border-primary/10"
      style={{ 
        minHeight: '65vh',
        boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.15), inset 0 1px 0 hsl(var(--primary) / 0.1)'
      }}
    >
      {/* Luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" 
           style={{ 
             animation: 'pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite',
             mixBlendMode: 'overlay'
           }} />
      
      {/* Sophisticated glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" 
           style={{ animation: 'float 20s ease-in-out infinite' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" 
           style={{ animation: 'float 25s ease-in-out infinite reverse' }} />
      
      {/* Sparkle accent */}
      <motion.div 
        className="absolute top-8 right-8"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="h-6 w-6 text-primary/30" />
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
        {/* Left: Luxurious Welcome */}
        <div className="md:col-span-3 space-y-8">
          <div className="flex items-start gap-6">
            <motion.div 
              className="p-5 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-xl border border-primary/20"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="h-10 w-10 text-primary" />
            </motion.div>
            <div className="flex-1">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent leading-tight">
                {getGreeting()}, {userName}
              </h1>
              <p className="text-2xl text-muted-foreground mt-3 font-light tracking-wide">
                {isSpanish ? 'Tómate un momento para conectar contigo mismo' : 'Take a moment to check in with yourself'}
              </p>
            </div>
          </div>

          {/* Elegant Mood Selector with Dropdown */}
          <div className="bg-card/60 backdrop-blur-2xl rounded-[32px] p-8 border border-primary/10"
               style={{ boxShadow: '0 20px 40px -10px hsl(var(--primary) / 0.1)' }}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xl font-semibold text-foreground tracking-tight">
                {isSpanish ? '¿Cómo te sientes hoy?' : 'How are you feeling today?'}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-full bg-primary/5 hover:bg-primary/10">
                  {isSpanish ? 'Historia' : 'History'}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-primary/20">
                  <DropdownMenuItem className="cursor-pointer">
                    {isSpanish ? 'Ver historial de ánimo' : 'View mood history'}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    {isSpanish ? 'Análisis semanal' : 'Weekly analysis'}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    {isSpanish ? 'Exportar datos' : 'Export data'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-6 justify-center">
              {moods.map((mood, index) => (
                <motion.button
                  key={index}
                  onClick={() => setMoodSelection(index)}
                  className={`relative text-6xl transition-all ${
                    moodSelection === index ? 'scale-110' : 'scale-100 opacity-60 hover:opacity-100'
                  }`}
                  whileHover={{ y: -8, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {mood}
                  <AnimatePresence>
                    {moodSelection === index && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Luxurious Action Buttons */}
          <div className="flex gap-5 flex-wrap">
            <motion.button
              onClick={onQuickCheckin}
              className="group flex-1 min-w-[200px] relative overflow-hidden bg-gradient-to-r from-wellness to-wellness/80 text-white rounded-[24px] px-8 py-5 font-semibold shadow-lg transition-all border border-white/20"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ boxShadow: '0 20px 40px -10px hsl(var(--wellness) / 0.4)' }}
            >
              <span className="relative z-10 text-lg tracking-wide">
                {isSpanish ? 'Chequeo Rápido' : 'Quick Check-in'}
              </span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            <motion.button
              onClick={onTodaysGoals}
              className="group flex-1 min-w-[200px] relative overflow-hidden bg-gradient-to-r from-mental-health to-mental-health/80 text-white rounded-[24px] px-8 py-5 font-semibold shadow-lg transition-all border border-white/20"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ boxShadow: '0 20px 40px -10px hsl(var(--mental-health) / 0.4)' }}
            >
              <span className="relative z-10 text-lg tracking-wide">
                {isSpanish ? 'Objetivos de Hoy' : "Today's Goals"}
              </span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Right: Premium Stats Dashboard */}
        <div className="md:col-span-2 space-y-5">
          <motion.div
            className="group bg-card/70 backdrop-blur-2xl rounded-[28px] p-8 border border-urgent/20 hover:border-urgent/40 transition-all"
            whileHover={{ y: -6, scale: 1.02 }}
            style={{ boxShadow: '0 20px 40px -10px hsl(var(--urgent) / 0.15)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-4 rounded-2xl bg-gradient-to-br from-urgent/20 to-urgent/5"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Flame className="h-7 w-7 text-urgent" />
                </motion.div>
                <div>
                  <p className="text-3xl font-bold text-foreground tracking-tight">3 {isSpanish ? 'días' : 'days'}</p>
                  <p className="text-sm text-muted-foreground font-medium">{isSpanish ? 'Racha actual' : 'Current streak'}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronDown className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-primary/20">
                  <DropdownMenuItem>{isSpanish ? 'Ver historial' : 'View history'}</DropdownMenuItem>
                  <DropdownMenuItem>{isSpanish ? 'Compartir racha' : 'Share streak'}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          <motion.div
            className="group bg-card/70 backdrop-blur-2xl rounded-[28px] p-8 border border-learning/20 hover:border-learning/40 transition-all"
            whileHover={{ y: -6, scale: 1.02 }}
            style={{ boxShadow: '0 20px 40px -10px hsl(var(--learning) / 0.15)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-4 rounded-2xl bg-gradient-to-br from-learning/20 to-learning/5"
                  whileHover={{ scale: 1.1 }}
                >
                  <Coins className="h-7 w-7 text-learning" />
                </motion.div>
                <div>
                  <p className="text-3xl font-bold text-foreground tracking-tight">125</p>
                  <p className="text-sm text-muted-foreground font-medium">{isSpanish ? 'Créditos' : 'Credits'}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronDown className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-primary/20">
                  <DropdownMenuItem>{isSpanish ? 'Comprar más' : 'Buy more'}</DropdownMenuItem>
                  <DropdownMenuItem>{isSpanish ? 'Historial' : 'History'}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          <motion.div
            className="group bg-card/70 backdrop-blur-2xl rounded-[28px] p-8 border border-wellness/20 hover:border-wellness/40 transition-all"
            whileHover={{ y: -6, scale: 1.02 }}
            style={{ boxShadow: '0 20px 40px -10px hsl(var(--wellness) / 0.15)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-4 rounded-2xl bg-gradient-to-br from-wellness/20 to-wellness/5"
                  whileHover={{ rotate: -10 }}
                >
                  <Target className="h-7 w-7 text-wellness" />
                </motion.div>
                <div>
                  <p className="text-3xl font-bold text-foreground tracking-tight">{isSpanish ? 'Nivel' : 'Level'} 7</p>
                  <p className="text-sm text-muted-foreground font-medium">{isSpanish ? 'Tu progreso' : 'Your progress'}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronDown className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-primary/20">
                  <DropdownMenuItem>{isSpanish ? 'Ver objetivos' : 'View goals'}</DropdownMenuItem>
                  <DropdownMenuItem>{isSpanish ? 'Progreso detallado' : 'Detailed progress'}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSanctuary;
