
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Annoyed } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PhoneCall, MessageSquare, LifeBuoy, Heart } from "lucide-react";

interface MoodScreenProps {
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onPrevious: () => void;
}

const MoodScreen: React.FC<MoodScreenProps> = ({ onMoodSelect, onPrevious }) => {
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // State for mood selection and dialog
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  
  // Translations
  const translations = {
    title: isSpanish ? "¿Cómo te sientes hoy?" : "How are you feeling today?",
    subtitle: isSpanish ? "Tu bienestar emocional es importante" : "Your emotional wellbeing matters",
    happy: isSpanish ? "Feliz" : "Happy",
    justOk: isSpanish ? "Más o Menos" : "Just Ok",
    neutral: isSpanish ? "Neutral" : "Neutral",
    down: isSpanish ? "Decaído" : "Feeling Down",
    sad: isSpanish ? "Triste" : "Sad",
    overwhelmed: isSpanish ? "Abrumado" : "Overwhelmed",
    previous: isSpanish ? "Anterior" : "Previous",
    continueText: isSpanish ? "Continuar" : "Continue",
    inspirationalMessage: isSpanish ? "Un mensaje para ti" : "A message for you",
    emergencyResources: isSpanish ? "Recursos de apoyo" : "Support resources",
    callNow: isSpanish ? "Llamar ahora" : "Call now",
    textLine: isSpanish ? "Línea de texto" : "Text line",
    crisisSupport: isSpanish ? "Apoyo en crisis" : "Crisis support",
    emergencyHelp: isSpanish ? "Ayuda de emergencia" : "Emergency help",
  };
  
  // Mood data with inspirational messages
  const moods = [
    {
      id: 'happy',
      label: translations.happy,
      icon: <Smile className="w-full h-full" />,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      lightColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      message: isSpanish 
        ? "Tu alegría es un regalo para el mundo. Cada sonrisa que compartes tiene el poder de iluminar el día de alguien más. Hoy, permítete disfrutar de esta felicidad y dejar que te guíe hacia momentos aún más hermosos. Tu energía positiva es contagiosa y necesaria."
        : "Your joy is a gift to the world. Each smile you share has the power to brighten someone else's day. Today, allow yourself to enjoy this happiness and let it guide you to even more beautiful moments. Your positive energy is contagious and needed."
    },
    {
      id: 'ok',
      label: translations.justOk,
      icon: <Annoyed className="w-full h-full" />,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      lightColor: "bg-blue-100",
      borderColor: "border-blue-300",
      message: isSpanish 
        ? "Estar 'más o menos' es un lugar de auténtica sabiduría. No todo tiene que ser extraordinario para ser valioso. En esta calma moderada, hay espacio para reflexionar y apreciar las pequeñas cosas. Recuerda que incluso en días promedio, estás creciendo y evolucionando."
        : "Being 'just okay' is a place of genuine wisdom. Not everything needs to be extraordinary to be valuable. In this moderate calm, there's room to reflect and appreciate the little things. Remember that even on average days, you're still growing and evolving."
    },
    {
      id: 'neutral',
      label: translations.neutral,
      icon: <Meh className="w-full h-full" />,
      color: "bg-gray-500",
      textColor: "text-gray-500",
      lightColor: "bg-gray-100",
      borderColor: "border-gray-300",
      message: isSpanish 
        ? "La neutralidad es un lienzo en blanco lleno de posibilidades. Desde este espacio equilibrado, puedes elegir conscientemente hacia dónde dirigir tu energía. Esta sensación de calma centrada es una fuerza poderosa que te permite observar con claridad y actuar con intención. Confía en tu camino."
        : "Neutrality is a blank canvas full of possibilities. From this balanced space, you can consciously choose where to direct your energy. This feeling of centered calm is a powerful force that allows you to observe with clarity and act with intention. Trust your path."
    },
    {
      id: 'down',
      label: translations.down,
      icon: <HeartCrack className="w-full h-full" />,
      color: "bg-indigo-500",
      textColor: "text-indigo-500",
      lightColor: "bg-indigo-100",
      borderColor: "border-indigo-300",
      message: isSpanish 
        ? "Sentirse decaído no es un signo de debilidad, sino de humanidad. Tus emociones, incluso las difíciles, te enseñan sobre ti mismo y lo que necesitas. Sé amable contigo hoy. Recuerda que los momentos difíciles son como nubes pasajeras - no durarán para siempre, y el sol siempre regresa."
        : "Feeling down isn't a sign of weakness, but of humanity. Your emotions, even the difficult ones, teach you about yourself and what you need. Be gentle with yourself today. Remember that difficult moments are like passing clouds - they won't last forever, and the sun always returns."
    },
    {
      id: 'sad',
      icon: <Frown className="w-full h-full" />,
      label: translations.sad,
      color: "bg-purple-500",
      textColor: "text-purple-500",
      lightColor: "bg-purple-100",
      borderColor: "border-purple-300",
      message: isSpanish 
        ? "Tu tristeza habla de tu profunda capacidad para sentir. En estos momentos vulnerables, recuerda que no estás solo, aunque el camino se sienta solitario. Permítete sentir plenamente, sabiendo que cada lágrima limpia y renueva. La esperanza siempre espera pacientemente para volver a tu corazón."
        : "Your sadness speaks to your deep capacity to feel. In these vulnerable moments, remember you are not alone, even when the path feels solitary. Allow yourself to feel fully, knowing each tear cleanses and renews. Hope is always waiting patiently to return to your heart."
    },
    {
      id: 'overwhelmed',
      icon: <Angry className="w-full h-full" />,
      label: translations.overwhelmed,
      color: "bg-orange-500",
      textColor: "text-orange-500",
      lightColor: "bg-orange-100",
      borderColor: "border-orange-300",
      message: isSpanish 
        ? "Cuando todo se siente demasiado, recuerda respirar. No necesitas cargar el peso del mundo en tus hombros. Da un pequeño paso, solo uno, y luego el siguiente. Está bien establecer límites, pedir ayuda, y tomarte un momento para ti. Tu valor no está en lo que haces, sino en quién eres."
        : "When everything feels too much, remember to breathe. You don't need to carry the weight of the world on your shoulders. Take one small step, just one, and then the next. It's okay to set boundaries, ask for help, and take a moment for yourself. Your worth isn't in what you do, but in who you are."
    }
  ];

  // Emergency resources content
  const emergencyResources = [
    {
      icon: <PhoneCall className="h-5 w-5" />,
      title: isSpanish ? "Línea Nacional de Prevención del Suicidio" : "National Suicide Prevention Lifeline",
      description: isSpanish ? "Apoyo gratuito 24/7 para personas en crisis" : "Free 24/7 support for people in crisis",
      contact: "988",
      action: translations.callNow
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: isSpanish ? "Línea de Texto de Crisis" : "Crisis Text Line",
      description: isSpanish ? "Apoyo por mensaje de texto las 24 horas" : "24/7 text message support",
      contact: "Text HOME to 741741",
      action: translations.textLine
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: isSpanish ? "Línea de Ayuda SAMHSA" : "SAMHSA's Helpline",
      description: isSpanish ? "Tratamiento para trastornos de salud mental" : "Treatment for mental health disorders",
      contact: "1-800-662-4357",
      action: translations.crisisSupport
    },
    {
      icon: <LifeBuoy className="h-5 w-5" />,
      title: isSpanish ? "Servicios de Emergencia" : "Emergency Services",
      description: isSpanish ? "Para situaciones que amenazan la vida" : "For life-threatening situations",
      contact: "911",
      action: translations.emergencyHelp
    }
  ];

  // Handle mood selection
  const handleMoodClick = (mood: any) => {
    setSelectedMood(mood.id);
    setShowMoodDialog(true);
  };

  // Handle continuing after showing message
  const handleContinue = () => {
    setShowMoodDialog(false);
    if (selectedMood) {
      onMoodSelect(selectedMood as any);
    }
  };

  // Get selected mood object
  const getSelectedMood = () => {
    return moods.find(m => m.id === selectedMood);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1a1a1f] to-[#2a2a35] text-white relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#B87333]/3 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-10 flex-1 flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#B87333]/90">
            {translations.title}
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            {translations.subtitle}
          </p>
        </motion.div>
        
        {/* Mood Grid */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-4xl mx-auto">
            {moods.map((mood, index) => (
              <motion.div
                key={mood.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <button
                  onClick={() => handleMoodClick(mood)}
                  className={`h-full w-full flex flex-col items-center rounded-2xl p-5 md:p-6 transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-lg`}
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full ${mood.lightColor} ${mood.borderColor} border-2 mb-4 text-white`}>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${mood.color}`}>
                      {mood.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-white">
                    {mood.label}
                  </h3>
                  <div className={`mt-3 h-1 w-10 ${mood.color} rounded-full opacity-80`}></div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Button
            onClick={onPrevious}
            className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:opacity-90 text-white font-medium px-6 py-6 h-auto text-lg rounded-xl"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {translations.previous}
          </Button>
        </motion.div>
      </div>
      
      {/* Inspirational Message Dialog */}
      <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
        <DialogContent className="bg-[#1a1a1f] border border-[#B87333]/30 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className={`text-xl font-bold flex items-center gap-2 ${getSelectedMood()?.textColor}`}>
              <div className={`p-2 rounded-full ${getSelectedMood()?.lightColor}`}>
                {getSelectedMood()?.icon}
              </div>
              {getSelectedMood()?.label}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-2">
            {/* Inspirational message */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 mb-4">
              <p className="text-white/90 leading-relaxed text-lg italic">
                "{getSelectedMood()?.message}"
              </p>
            </div>
            
            {/* Emergency resources for sad and overwhelmed moods */}
            {(selectedMood === 'sad' || selectedMood === 'overwhelmed') && (
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-400" />
                  {translations.emergencyResources}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {emergencyResources.map((resource, index) => (
                    <div 
                      key={index} 
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#B87333]/20 rounded-full text-[#B87333]">
                          {resource.icon}
                        </div>
                        <div>
                          <h5 className="font-medium mb-1">{resource.title}</h5>
                          <p className="text-white/70 text-sm mb-2">{resource.description}</p>
                          <p className="text-[#B87333] font-bold">{resource.contact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-4">
            <Button 
              className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:opacity-90 text-white py-2"
              onClick={handleContinue}
            >
              {translations.continueText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodScreen;
