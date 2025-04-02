
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Brain, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious: () => void;
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  const [activeAffirmation, setActiveAffirmation] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    continue: isSpanish ? "Continuar" : "Continue",
    previous: isSpanish ? "Anterior" : "Previous",
    happyTitle: isSpanish ? "¡Tu Luz Brilla Hoy!" : "Your Light Shines Bright Today!",
    okTitle: isSpanish ? "Tu Día Tiene Potencial Ilimitado" : "Your Day Has Unlimited Potential",
    neutralTitle: isSpanish ? "Tu Centro Calmado Es Tu Fortaleza" : "Your Calm Center Is Your Strength",
    downTitle: isSpanish ? "Tu Resiliencia Es Extraordinaria" : "Your Resilience Is Remarkable",
    sadTitle: isSpanish ? "Tu Corazón Tiene Inmensa Capacidad" : "Your Heart Has Immense Capacity",
    overwhelmedTitle: isSpanish ? "Tu Poder Interior Es Mayor Que Cualquier Desafío" : "Your Inner Power Is Greater Than Any Challenge",
    scrollDown: isSpanish ? "Desplázate para más" : "Scroll for more"
  };
  
  // Enhanced Happy affirmations - longer and more heartfelt
  const happyAffirmations = isSpanish 
    ? [
        "Tu alegría es un faro que ilumina a todos los que te rodean. Esta energía positiva que llevas dentro es un regalo precioso – aprovéchala hoy para sembrar semillas de esperanza y optimismo en tu camino y en el de los demás.",
        "Cada sonrisa que compartes es un acto de valentía y generosidad. En un mundo que a veces puede sentirse abrumador, tu capacidad para encontrar y compartir la felicidad es revolucionaria. Nunca subestimes el poder sanador de tu actitud positiva.",
        "Esta luz que brilla dentro de ti no es accidental – la has cultivado a través de cada desafío que has superado, cada obstáculo que has enfrentado. Tu felicidad actual es un testimonio de tu fortaleza interior y tu resistencia.",
        "La perspectiva brillante que tienes hoy es como un lienzo en blanco lleno de infinitas posibilidades. Cada momento de alegría te abre puertas a experiencias asombrosas y conexiones profundas que te esperan justo a la vuelta de la esquina.",
        "En este momento de felicidad, date el regalo de estar plenamente presente. Siente la calidez de esta emoción, déjala que impregne cada célula de tu cuerpo. Has creado este sentimiento y puedes volver a él en cualquier momento – es tu anclaje, tu refugio seguro."
      ] 
    : [
        "Your joy is a beacon that brightens everyone around you. This positive energy you carry within is a precious gift – use it today to plant seeds of hope and optimism along your path and in the lives of others.",
        "Every smile you share is an act of courage and generosity. In a world that can sometimes feel overwhelming, your ability to find and share happiness is revolutionary. Never underestimate the healing power of your positive attitude.",
        "This light shining within you isn't accidental – you've cultivated it through every challenge you've overcome, every obstacle you've faced. Your current happiness is a testament to your inner strength and resilience.",
        "The bright outlook you have today is like a blank canvas full of infinite possibilities. Each moment of joy opens doors to amazing experiences and profound connections waiting just around the corner.",
        "In this moment of happiness, give yourself the gift of being fully present. Feel the warmth of this emotion, let it permeate every cell in your body. You've created this feeling, and you can return to it anytime – it's your anchor, your safe harbor."
      ];
  
  // Enhanced OK affirmations - longer and more heartfelt
  const okAffirmations = isSpanish 
    ? [
        "Estar 'más o menos' es un estado de auténtica sabiduría – un lugar de equilibrio donde puedes observar tus experiencias con mayor claridad. En este espacio, estás construyendo una base sólida para decisiones conscientes que honran quién eres verdaderamente.",
        "Incluso en estos momentos de 'simplemente estar bien', estás tejiendo hilos importantes en el tapiz de tu vida. Lo ordinario contiene semillas de lo extraordinario, y tu presencia consciente en este momento es profundamente significativa.",
        "Tu capacidad para navegar por este día con tranquila determinación es un superpoder que muchos anhelan. Esta resiliencia tranquila habla de tu profunda reserva interior de fortaleza – un recurso que siempre estará disponible cuando lo necesites.",
        "Este estado equilibrado te otorga una claridad única que otros podrían pasar por alto. Desde aquí, puedes ver oportunidades ocultas y caminos sutiles que conducen a un crecimiento genuino y a conexiones más profundas.",
        "Estás exactamente donde necesitas estar en este momento – ni más arriba ni más abajo, sino precisamente aquí. En esta simplicidad hay una profunda perfección, un reconocimiento de que cada parte de tu viaje, incluso los momentos 'normales', es esencial y valiosa."
      ] 
    : [
        "Being 'just okay' is a state of genuine wisdom – a place of balance where you can observe your experiences with greater clarity. In this space, you're building a solid foundation for mindful choices that honor who you truly are.",
        "Even in these moments of 'just being okay,' you're weaving important threads into the tapestry of your life. The ordinary contains seeds of the extraordinary, and your conscious presence in this moment is deeply meaningful.",
        "Your ability to navigate this day with quiet determination is a superpower many long for. This quiet resilience speaks to your deep inner reservoir of strength – a resource that will always be available when you need it.",
        "This balanced state gives you a unique clarity that others might overlook. From here, you can see hidden opportunities and subtle pathways that lead to genuine growth and deeper connections.",
        "You're exactly where you need to be right now – not higher, not lower, but precisely here. In this simplicity lies profound perfection, an acknowledgment that every part of your journey, even the 'ordinary' moments, is essential and valuable."
      ];
  
  // Enhanced Neutral affirmations - longer and more heartfelt
  const neutralAffirmations = isSpanish
    ? [
        "Este espacio neutral que habitas ahora es como tierra fértil esperando semillas – un lienzo en blanco rebosante de potencial creativo. En esta quietud, tus pensamientos más auténticos e intuiciones más profundas tienen espacio para emerger y ser escuchados.",
        "Tu equilibrio emocional de hoy es más poderoso de lo que puedas imaginar – es el fundamento desde el cual puedes elegir conscientemente la dirección de tu energía. Como el timón de un barco, este centro te permite navegar con intención a través de las aguas de la vida.",
        "Hay una profunda sabiduría en estos momentos tranquilos que estás experimentando. Es como si el universo te ofreciera un espacio para escuchar tu voz interior – esa guía interna que a menudo queda ahogada por el ruido de las emociones intensas y las distracciones externas.",
        "Desde este lugar centrado, cada paso que das puede ser deliberado y significativo. No subestimes el poder transformador de esta neutralidad – es desde la calma que nacen las decisiones más claras y los cambios más duraderos.",
        "Tu presencia constante crea ondas pacíficas que se extienden mucho más allá de lo que puedes ver. Como una piedra que cae suavemente en un lago tranquilo, tu serenidad influye sutilmente en todos los que te rodean, ofreciendo un santuario de calma en un mundo a menudo caótico."
      ]
    : [
        "This neutral space you're inhabiting now is like fertile soil awaiting seeds – a blank canvas brimming with creative potential. In this stillness, your most authentic thoughts and deepest intuitions have room to emerge and be heard.",
        "Your emotional balance today is more powerful than you might realize – it's the foundation from which you can consciously choose the direction of your energy. Like the rudder of a ship, this centeredness allows you to navigate with intention through life's waters.",
        "There's profound wisdom in these quiet moments you're experiencing. It's as if the universe is offering you space to listen to your inner voice – that internal guidance that often gets drowned out by the noise of intense emotions and external distractions.",
        "From this centered place, every step you take can be deliberate and meaningful. Don't underestimate the transformative power of this neutrality – it's from calmness that the clearest decisions and most lasting changes are born.",
        "Your steady presence creates peaceful ripples extending far beyond what you can see. Like a stone gently dropped into a still lake, your serenity subtly influences everyone around you, offering a sanctuary of calm in an often chaotic world."
      ];
  
  // Enhanced Down affirmations - longer and more heartfelt
  const downAffirmations = isSpanish
    ? [
        "Incluso en estos momentos difíciles, sigues presentándote – esa es una forma de valentía que pocos reconocen pero que merece ser celebrada. Tu disposición a sentir plenamente, a no apartarte de las emociones complicadas, revela una fortaleza interior extraordinaria.",
        "Este sentimiento que estás experimentando ahora es como una ola – puede sentirse abrumador, pero recuerda que las olas siempre pasan, siempre ceden. Mientras tanto, la fuerza que estás construyendo al atravesar esta experiencia permanecerá contigo para siempre.",
        "Tu sensibilidad, especialmente en momentos como este, es en realidad un superpoder profundo. Te conecta con la plenitud de la experiencia humana y te permite comprender a otros con una empatía que solo puede nacer de haber sentido tanto tú mismo.",
        "Cada emoción que fluye a través de ti, incluso las difíciles, añade una dimensión de profundidad a tu experiencia de vida. Como capas en una hermosa pintura, estos tonos más oscuros crean contraste, textura y una belleza inesperada en el lienzo de tu existencia.",
        "Has superado absolutamente todos los días difíciles de tu vida hasta ahora – eso es un récord perfecto del 100%. En cada uno de esos momentos probablemente dudaste, igual que ahora, pero mira hacia atrás y verás el camino que has recorrido, un testimonio de tu increíble capacidad para seguir adelante."
      ]
    : [
        "Even on these difficult days, you're still showing up – that's a form of courage few recognize but that deserves to be celebrated. Your willingness to feel fully, to not turn away from complicated emotions, reveals extraordinary inner strength.",
        "This feeling you're experiencing now is like a wave – it may feel overwhelming, but remember that waves always pass, always recede. Meanwhile, the strength you're building by moving through this experience will stay with you forever.",
        "Your sensitivity, especially in moments like this, is actually a profound superpower. It connects you to the fullness of human experience and allows you to understand others with an empathy that can only be born from having felt so deeply yourself.",
        "Every emotion flowing through you, even the difficult ones, adds a dimension of depth to your life experience. Like layers in a beautiful painting, these darker tones create contrast, texture, and unexpected beauty on the canvas of your existence.",
        "You have successfully made it through absolutely every difficult day in your life so far – that's a perfect 100% success rate. In each of those moments you likely doubted, just as you might now, but look back and see the path you've walked, a testament to your amazing ability to keep going."
      ];
  
  // Enhanced Sad affirmations - longer and more heartfelt
  const sadAffirmations = isSpanish
    ? [
        "Tu tristeza es un testimonio de la profundidad con la que puedes amar, conectar y sentir. Como un océano profundo, contiene mundos enteros de comprensión, empatía y sabiduría que solo pueden ser explorados por aquellos con corazones lo suficientemente valientes para sumergirse por completo.",
        "Al reconocer y abrazar este sentimiento, ya has comenzado el viaje de transformación. Estás convirtiendo esta emoción en una maestra, un portal hacia un mayor autoconocimiento. Hay un coraje inmenso en esta aceptación que pocos comprenden verdaderamente.",
        "El mundo necesita desesperadamente tu sensibilidad y profundidad emocional. En una cultura que a menudo celebra la superficialidad, tu disposición a sentir plenamente es revolucionaria – una medicina sanadora para un mundo que ha olvidado cómo procesar la tristeza con dignidad y gracia.",
        "Este momento te está enseñando algo invaluable sobre ti mismo, revelando facetas de tu corazón y alma que podrían permanecer ocultas en tiempos más fáciles. Estas revelaciones, aunque dolorosas ahora, son gemas preciosas que iluminarán tu camino hacia adelante.",
        "Mañana trae nueva luz – un amanecer fresco que no borrará lo que has sentido, sino que lo integrará en la tapicería más amplia de quién eres. Y recuerda: eres mucho más fuerte de lo que te das crédito, más resiliente de lo que crees, y más amado de lo que puedes imaginar en este momento."
      ]
    : [
        "Your sadness is a testament to the depth with which you can love, connect, and feel. Like a deep ocean, it contains entire worlds of understanding, empathy, and wisdom that can only be explored by those with hearts brave enough to dive fully in.",
        "In acknowledging and embracing this feeling, you've already begun the journey of transformation. You're turning this emotion into a teacher, a portal to greater self-knowledge. There's an immense courage in this acceptance that few truly understand.",
        "The world desperately needs your sensitivity and emotional depth. In a culture that often celebrates superficiality, your willingness to feel fully is revolutionary – a healing medicine for a world that has forgotten how to process sadness with dignity and grace.",
        "This moment is teaching you something invaluable about yourself, revealing facets of your heart and soul that might remain hidden in easier times. These revelations, though painful now, are precious gems that will illuminate your path forward.",
        "Tomorrow brings new light – a fresh dawn that won't erase what you've felt, but will integrate it into the larger tapestry of who you are. And remember: you are far stronger than you give yourself credit for, more resilient than you believe, and more loved than you can imagine right now."
      ];
  
  // Enhanced Overwhelmed affirmations - longer and more heartfelt
  const overwhelmedAffirmations = isSpanish
    ? [
        "La intensidad que estás sintiendo ahora contiene un potencial extraordinario – como el combustible concentrado que impulsa los avances más significativos de nuestras vidas. Cuando te sientas más abrumado, recuerda que esta energía puede ser redirigida y transformada en el catalizador de tu crecimiento más profundo.",
        "Tienes todo el permiso del mundo para establecer límites, para decir no, para hacer una pausa y respirar. El autocuidado no es egoísmo; es el acto más valiente de amor propio que puedes practicar. Priorizar tu bienestar no es opcional – es esencial para que puedas seguir compartiendo tus dones únicos con el mundo.",
        "Esta sensación abrumadora que estás experimentando es temporal – como nubes de tormenta que pasan frente al sol. Tu paz interior es la constante permanente, siempre esperando ser redescubierta detrás de los pensamientos turbulentos y las emociones intensas que eventualmente se desvanecerán.",
        "Tu conciencia de estos sentimientos revela una inteligencia emocional extraordinaria – una capacidad para reconocer y nombrar tus experiencias que muchos nunca desarrollan. Este mismo conocimiento que ahora parece tan pesado es en realidad la herramienta que te ayudará a navegarlos con cada vez más gracia.",
        "Simplemente por estar aquí ahora, respirando a través de esta intensidad, ya estás tomando pasos positivos hacia adelante. Cada momento que permaneces presente, cada respiración consciente, cada pequeño acto de autocuidado es una victoria significativa. Avanzas no a pesar de lo que sientes, sino a través de ello."
      ]
    : [
        "The intensity you're feeling right now contains extraordinary potential – like concentrated fuel that powers the most significant breakthroughs in our lives. When you feel most overwhelmed, remember that this energy can be redirected and transformed into the catalyst for your deepest growth.",
        "You have every permission in the world to set boundaries, to say no, to pause and breathe. Self-care isn't selfishness; it's the bravest act of self-love you can practice. Prioritizing your wellbeing isn't optional – it's essential for you to continue sharing your unique gifts with the world.",
        "This overwhelming sensation you're experiencing is temporary – like storm clouds passing in front of the sun. Your inner peace is the permanent constant, always waiting to be rediscovered behind the turbulent thoughts and intense emotions that will eventually fade.",
        "Your awareness of these feelings reveals extraordinary emotional intelligence – an ability to recognize and name your experiences that many never develop. This very knowledge that now feels so heavy is actually the tool that will help you navigate them with increasing grace.",
        "Simply by being here now, breathing through this intensity, you're already taking positive steps forward. Every moment you remain present, every conscious breath, every small act of self-care is a significant victory. You move forward not despite what you feel, but through it."
      ];
  
  // Helper function to get the correct affirmations based on mood
  const getAffirmations = () => {
    switch (selectedMood) {
      case 'happy': return happyAffirmations;
      case 'ok': return okAffirmations;
      case 'neutral': return neutralAffirmations;
      case 'down': return downAffirmations;
      case 'sad': return sadAffirmations;
      case 'overwhelmed': return overwhelmedAffirmations;
      default: return [];
    }
  };
  
  // Helper function to get the correct title based on mood
  const getTitle = () => {
    switch (selectedMood) {
      case 'happy': return translations.happyTitle;
      case 'ok': return translations.okTitle;
      case 'neutral': return translations.neutralTitle;
      case 'down': return translations.downTitle;
      case 'sad': return translations.sadTitle;
      case 'overwhelmed': return translations.overwhelmedTitle;
      default: return '';
    }
  };
  
  // Helper function to get the correct icon based on mood
  const getMoodIcon = () => {
    switch (selectedMood) {
      case 'happy': return <Smile className="w-full h-full text-emerald-400" />;
      case 'ok': return <Brain className="w-full h-full text-sky-400" />;
      case 'neutral': return <Meh className="w-full h-full text-slate-400" />;
      case 'down': return <HeartCrack className="w-full h-full text-violet-400" />;
      case 'sad': return <Frown className="w-full h-full text-indigo-400" />;
      case 'overwhelmed': return <Angry className="w-full h-full text-rose-400" />;
      default: return null;
    }
  };
  
  // Helper function to get background gradient based on mood
  const getBackgroundGradient = () => {
    switch (selectedMood) {
      case 'happy': return 'from-emerald-500/10 via-amber-500/5 to-[#1a1a1f]';
      case 'ok': return 'from-sky-500/10 via-sky-500/5 to-[#1a1a1f]';
      case 'neutral': return 'from-slate-500/10 via-slate-500/5 to-[#1a1a1f]';
      case 'down': return 'from-violet-500/10 via-violet-500/5 to-[#1a1a1f]';
      case 'sad': return 'from-indigo-500/10 via-indigo-500/5 to-[#1a1a1f]';
      case 'overwhelmed': return 'from-rose-500/10 via-rose-500/5 to-[#1a1a1f]';
      default: return 'from-[#1a1a1f] to-[#1a1a1f]';
    }
  };
  
  // Hide scroll indicator after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Cycle through affirmations every 8 seconds (longer to read the more extensive text)
  useEffect(() => {
    const affirmations = getAffirmations();
    if (affirmations.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveAffirmation(prev => (prev + 1) % affirmations.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [selectedMood, isSpanish]);

  if (!selectedMood) return null;
  
  const affirmations = getAffirmations();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b ${getBackgroundGradient()} animate-fade-in relative`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl transform rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#B87333]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="z-10 w-full max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-gradient-to-br from-[#B87333]/30 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-48 h-48 bg-gradient-to-br from-[#B87333]/30 to-transparent rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-36 h-36 p-4 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-lg"
              >
                {getMoodIcon()}
              </motion.div>
              
              <div className="text-center md:text-left">
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
                >
                  {getTitle()}
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative min-h-[15rem] md:min-h-[12rem] overflow-hidden bg-[#1a1a1f]/40 p-6 rounded-xl backdrop-blur-sm"
                >
                  {affirmations.map((affirmation, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: index === activeAffirmation ? 1 : 0,
                        y: index === activeAffirmation ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center px-6 text-xl md:text-2xl text-white/90 font-light leading-relaxed"
                    >
                      {affirmation}
                    </motion.p>
                  ))}
                </motion.div>
                
                {/* Scrolling indicator with up/down arrows */}
                <div className={`flex justify-center my-6 transition-opacity duration-700 ${showScrollIndicator ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex flex-col items-center gap-1 text-white/70">
                    <ChevronUp className="w-5 h-5 animate-bounce" style={{ animationDuration: '1.5s' }} />
                    <p className="text-sm">{translations.scrollDown}</p>
                    <ChevronDown className="w-5 h-5 animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col md:flex-row justify-center md:justify-between gap-6"
            >
              <Button 
                className="bg-white/20 hover:bg-white/30 text-white text-lg py-6 px-8"
                onClick={onPrevious}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                {translations.previous}
              </Button>
              
              <Button 
                className="bg-[#B87333] hover:bg-[#B87333]/90 text-white text-lg py-6 px-10"
                onClick={onContinue}
              >
                {translations.continue}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodResponse;
