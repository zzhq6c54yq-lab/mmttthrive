
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Annoyed } from "lucide-react";
import { motion } from "framer-motion";

interface MoodScreenProps {
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onPrevious: () => void;
}

const MoodScreen: React.FC<MoodScreenProps> = ({ onMoodSelect, onPrevious }) => {
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // State for hover effects
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);
  
  // Translations
  const translations = {
    title: isSpanish ? "¿Cómo te sientes hoy?" : "How are you feeling today?",
    subtitle: isSpanish ? "Selecciona la emoción que mejor representa cómo te sientes" : "Select the emotion that best represents how you feel",
    happy: isSpanish ? "Feliz" : "Happy",
    justOk: isSpanish ? "Más o Menos" : "Just Ok",
    neutral: isSpanish ? "Neutral" : "Neutral",
    down: isSpanish ? "Decaído" : "Feeling Down",
    sad: isSpanish ? "Triste" : "Sad",
    overwhelmed: isSpanish ? "Abrumado" : "Overwhelmed",
    previous: isSpanish ? "Anterior" : "Previous",
    happyTooltip: isSpanish ? "Me siento alegre y optimista hoy" : "I feel joyful and optimistic about today!",
    justOkTooltip: isSpanish ? "Estoy bien, con altibajos hoy" : "I'm managing fine, with ups and downs today",
    neutralTooltip: isSpanish ? "Me siento equilibrado y estable hoy" : "I'm feeling balanced and steady today",
    downTooltip: isSpanish ? "Podría usar un poco de positividad hoy" : "I could use a little boost of positivity today",
    sadTooltip: isSpanish ? "Estoy experimentando emociones más fuertes hoy" : "I'm experiencing some heavier emotions today",
    overwhelmedTooltip: isSpanish ? "Las cosas se sienten intensas, pero busco equilibrio" : "Things feel intense, but I'm seeking balance"
  };

  // Mood data with updated styling information for a more modern and sleek look
  const moods = [
    {
      id: 'happy',
      label: translations.happy,
      icon: <Smile className="w-full h-full" />,
      tooltip: translations.happyTooltip,
      gradient: "bg-gradient-to-br from-yellow-300 to-amber-400",
      shadowColor: "shadow-amber-200/50",
      textColor: "text-amber-700",
      iconGradient: "bg-gradient-to-br from-yellow-200 to-amber-300",
      accentColor: "amber-400"
    },
    {
      id: 'ok',
      label: translations.justOk,
      icon: <Annoyed className="w-full h-full" />,
      tooltip: translations.justOkTooltip,
      gradient: "bg-gradient-to-br from-blue-300 to-sky-400",
      shadowColor: "shadow-sky-200/50",
      textColor: "text-sky-700",
      iconGradient: "bg-gradient-to-br from-blue-200 to-sky-300",
      accentColor: "sky-400"
    },
    {
      id: 'neutral',
      label: translations.neutral,
      icon: <Meh className="w-full h-full" />,
      tooltip: translations.neutralTooltip,
      gradient: "bg-gradient-to-br from-gray-300 to-gray-400",
      shadowColor: "shadow-gray-200/50",
      textColor: "text-gray-700",
      iconGradient: "bg-gradient-to-br from-gray-200 to-gray-300",
      accentColor: "gray-400"
    },
    {
      id: 'down',
      label: translations.down,
      icon: <HeartCrack className="w-full h-full" />,
      tooltip: translations.downTooltip,
      gradient: "bg-gradient-to-br from-indigo-300 to-indigo-400",
      shadowColor: "shadow-indigo-200/50",
      textColor: "text-indigo-700",
      iconGradient: "bg-gradient-to-br from-indigo-200 to-indigo-300",
      accentColor: "indigo-400"
    },
    {
      id: 'sad',
      label: translations.sad,
      icon: <Frown className="w-full h-full" />,
      tooltip: translations.sadTooltip,
      gradient: "bg-gradient-to-br from-purple-300 to-purple-400",
      shadowColor: "shadow-purple-200/50",
      textColor: "text-purple-700",
      iconGradient: "bg-gradient-to-br from-purple-200 to-purple-300",
      accentColor: "purple-400"
    },
    {
      id: 'overwhelmed',
      label: translations.overwhelmed,
      icon: <Angry className="w-full h-full" />,
      tooltip: translations.overwhelmedTooltip,
      gradient: "bg-gradient-to-br from-orange-300 to-orange-400",
      shadowColor: "shadow-orange-200/50",
      textColor: "text-orange-700",
      iconGradient: "bg-gradient-to-br from-orange-200 to-orange-300",
      accentColor: "orange-400"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] to-[#2a2a35] animate-fade-in relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#B87333]/3 rounded-full blur-3xl"></div>
      </div>
      
      {/* Thrive MT Logo in circle */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-6 right-6 z-20"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center shadow-lg p-1">
          <div className="w-full h-full rounded-full bg-[#1a1a1f]/80 flex items-center justify-center">
            <div className="text-[#B87333] font-bold text-xl leading-none tracking-tighter flex flex-col items-center">
              <span className="text-xl">MT</span>
              <span className="text-[8px] opacity-80 -mt-1">THRIVE</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="z-10 w-full max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {translations.title}
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            {translations.subtitle}
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16"
        >
          {moods.map((mood) => (
            <motion.div
              key={mood.id}
              variants={item}
              onHoverStart={() => setHoveredMood(mood.id)}
              onHoverEnd={() => setHoveredMood(null)}
              className="relative"
            >
              <button 
                onClick={() => onMoodSelect(mood.id as any)}
                className="w-full h-full flex flex-col items-center overflow-hidden transition-all duration-300 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl"
                style={{
                  transform: hoveredMood === mood.id ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
                aria-label={mood.label}
              >
                {/* Top section with icon */}
                <div className={`w-full p-6 text-center ${mood.gradient} bg-opacity-90`}>
                  <div className={`w-20 h-20 mx-auto rounded-full p-4 ${mood.iconGradient} shadow-lg ${mood.shadowColor} text-white`}>
                    {mood.icon}
                  </div>
                </div>
                
                {/* Content section */}
                <div className="w-full bg-white/10 backdrop-blur-md p-5 flex-1 flex flex-col justify-between">
                  <h3 className={`text-xl font-medium text-white mb-2`}>
                    {mood.label}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {mood.tooltip}
                  </p>
                  <div className="mt-4 w-full">
                    <div className={`h-1 w-1/3 bg-${mood.accentColor} rounded-full mx-auto opacity-70`}></div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <Button 
            className="bg-[#B87333] hover:bg-[#B87333]/80 text-white px-6 py-6 h-auto text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {translations.previous}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodScreen;
