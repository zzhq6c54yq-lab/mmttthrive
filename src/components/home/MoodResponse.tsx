
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Annoyed, PhoneCall, MessageSquare, Headphones, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious: () => void;
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  const [showEmergencyServices, setShowEmergencyServices] = useState(false);
  
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    emergencyTitle: isSpanish ? "Servicios de Apoyo de Emergencia Disponibles" : "Emergency Support Services Available",
    emergencyDesc: isSpanish ? "Si estás experimentando una crisis, la ayuda está disponible ahora mismo." : "If you're experiencing a crisis, help is available right now.",
    crisisHelpline: isSpanish ? "Línea de Ayuda para Crisis" : "Crisis Helpline",
    crisisNumber: isSpanish ? "Llama al 988 - Disponible 24/7" : "Call 988 - Available 24/7",
    textSupport: isSpanish ? "Apoyo por Mensaje de Texto" : "Text Support",
    textDetails: isSpanish ? "Envía HOME al 741741" : "Text HOME to 741741",
    suicidePrevention: isSpanish ? "Línea de Prevención del Suicidio" : "Suicide Prevention Lifeline",
    emergencyServices: isSpanish ? "Servicios de Emergencia" : "Emergency Services",
    emergency911: isSpanish ? "Llama al 911 para ayuda inmediata" : "Call 911 for immediate help",
    continueTo: isSpanish ? "Continuar a Recursos de Apoyo" : "Continue to Support Resources",
    continueToRegister: isSpanish ? "Continuar con el Registro" : "Continue to Register",
    continue: isSpanish ? "Continuar" : "Continue",
    previous: isSpanish ? "Anterior" : "Previous",
    // Mood-specific title translations
    happyTitle: isSpanish ? "¡Tu Luz Brilla Hoy!" : "Your Light Shines Bright Today!",
    okTitle: isSpanish ? "Tu Día Tiene Potencial Ilimitado" : "Your Day Has Unlimited Potential",
    neutralTitle: isSpanish ? "Tu Centro Calmado Es Tu Fortaleza" : "Your Calm Center Is Your Strength",
    downTitle: isSpanish ? "Tu Resiliencia Es Extraordinaria" : "Your Resilience Is Remarkable",
    sadTitle: isSpanish ? "Tu Corazón Tiene Inmensa Capacidad" : "Your Heart Has Immense Capacity",
    overwhelmedTitle: isSpanish ? "Tu Poder Interior Es Mayor Que Cualquier Desafío" : "Your Inner Power Is Greater Than Any Challenge"
  };
  
  // Happy affirmations
  const happyAffirmations = isSpanish 
    ? [
        "Tu alegría es contagiosa - ¡compártela con todos los que conozcas hoy!",
        "Esta energía positiva es tu superpoder. ¿Cómo la usarás?",
        "Tu felicidad crea ondas que llegan más lejos de lo que sabes.",
        "La perspectiva brillante de hoy abre puertas a posibilidades asombrosas.",
        "Recuerda este sentimiento - lo has creado y puedes volver a él en cualquier momento."
      ] 
    : [
        "Your joy is contagious - spread it to everyone you meet today!",
        "This positive energy is your superpower. How will you use it?",
        "Your happiness creates ripples that reach farther than you know.",
        "Today's bright outlook opens doors to amazing possibilities.",
        "Remember this feeling - you've created it and can return to it anytime."
      ];
  
  // OK affirmations
  const okAffirmations = isSpanish 
    ? [
        "Estás navegando hoy con fuerza y resiliencia - ¡eso es impresionante!",
        "Incluso en los momentos de 'simplemente estar bien', estás construyendo algo significativo.",
        "Tu presencia constante es un regalo para ti y para quienes te rodean.",
        "Este estado equilibrado te da claridad para ver oportunidades que otros podrían perder.",
        "Estás exactamente donde necesitas estar ahora mismo - y eso es perfecto."
      ] 
    : [
        "You're navigating today with strength and resilience - that's impressive!",
        "Even in the 'just okay' moments, you're building something meaningful.",
        "Your steady presence is a gift to yourself and those around you.",
        "This balanced state gives you clarity to see opportunities others might miss.",
        "You're exactly where you need to be right now - and that's perfect."
      ];
  
  // Neutral affirmations
  const neutralAffirmations = isSpanish
    ? [
        "Este espacio neutral es terreno fértil para la creatividad y la intuición.",
        "Tu equilibrio emocional hoy es una base poderosa para lo que elijas.",
        "Hay sabiduría en los momentos tranquilos - estás escuchando tu voz interior.",
        "Desde este lugar centrado, puedes dar forma deliberadamente a la dirección de tu día.",
        "Tu presencia constante crea un efecto de ondas pacíficas para todos a tu alrededor."
      ]
    : [
        "This neutral space is fertile ground for creativity and insight.",
        "Your emotional balance today is a powerful foundation for whatever you choose.",
        "There's wisdom in the quiet moments - you're listening to your inner voice.",
        "From this centered place, you can deliberately shape your day's direction.",
        "Your steady presence creates a peaceful ripple effect for everyone around you."
      ];
  
  // Down affirmations
  const downAffirmations = isSpanish
    ? [
        "Incluso en días difíciles, sigues presentándote - eso es verdadero coraje.",
        "Este sentimiento es temporal, pero la fuerza que estás construyendo dura para siempre.",
        "Tu sensibilidad es en realidad un superpoder - te conecta profundamente con la vida.",
        "Cada emoción que sientes añade profundidad a tu experiencia y sabiduría.",
        "Has superado todos los días 'difíciles' hasta ahora - ¡100% de tasa de éxito!"
      ]
    : [
        "Even on difficult days, you're still showing up - that's true courage.",
        "This feeling is temporary, but the strength you're building lasts forever.",
        "Your sensitivity is actually a superpower - it connects you deeply to life.",
        "Every emotion you feel adds depth to your experience and wisdom.",
        "You've made it through every 'down' day so far - 100% success rate!"
      ];
  
  // Sad affirmations
  const sadAffirmations = isSpanish
    ? [
        "Tu tristeza es prueba de lo profundamente que puedes amar y conectar.",
        "Al reconocer este sentimiento, ya estás comenzando a transformarlo.",
        "El mundo necesita tu sensibilidad y profundidad emocional.",
        "Este momento te está enseñando algo valioso sobre ti mismo.",
        "Mañana trae nueva luz - y eres más fuerte de lo que crees."
      ]
    : [
        "Your sadness is proof of how deeply you can love and connect.",
        "In acknowledging this feeling, you're already beginning to transform it.",
        "The world needs your sensitivity and emotional depth.",
        "This moment is teaching you something valuable about yourself.",
        "Tomorrow holds new light - and you're stronger than you realize."
      ];
  
  // Overwhelmed affirmations
  const overwhelmedAffirmations = isSpanish
    ? [
        "La intensidad que sientes también es el combustible para momentos de avance.",
        "Tienes permiso para establecer límites y cuidarte primero.",
        "Esta abrumación es temporal - tu paz es permanente.",
        "Tu conciencia de estos sentimientos muestra tu inteligencia emocional.",
        "Solo por estar aquí ahora, ya estás dando pasos positivos hacia adelante."
      ]
    : [
        "The intensity you feel is also the fuel for breakthrough moments.",
        "You have permission to set boundaries and take care of yourself first.",
        "This overwhelm is temporary - your peace is permanent.",
        "Your awareness of these feelings shows your emotional intelligence.",
        "Just by being here now, you're already taking positive steps forward."
      ];
  
  const handleContinue = () => {
    if (selectedMood === 'sad' || selectedMood === 'overwhelmed') {
      setShowEmergencyServices(true);
    } else {
      onContinue();
    }
  };

  const renderEmergencyServices = () => {
    return (
      <Dialog open={showEmergencyServices} onOpenChange={setShowEmergencyServices}>
        <DialogContent className="max-w-md bg-red-50 border-2 border-red-500">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center text-red-700">
              {translations.emergencyTitle}
            </DialogTitle>
            <DialogDescription className="text-center pt-2 text-red-600">
              {translations.emergencyDesc}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="flex items-start p-3 bg-red-100 rounded-lg border border-red-300">
              <PhoneCall className="text-red-600 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-red-700">{translations.crisisHelpline}</h3>
                <p className="text-sm text-red-600">{translations.crisisNumber}</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-red-100 rounded-lg border border-red-300">
              <MessageSquare className="text-red-600 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-red-700">{translations.textSupport}</h3>
                <p className="text-sm text-red-600">{translations.textDetails}</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-red-100 rounded-lg border border-red-300">
              <Headphones className="text-red-600 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-red-700">{translations.suicidePrevention}</h3>
                <p className="text-sm text-red-600">1-800-273-8255</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-red-100 rounded-lg border border-red-300">
              <AlertTriangle className="text-red-600 mr-3 mt-1 h-5 w-5 flex-shrink-0 animate-pulse" />
              <div>
                <h3 className="font-medium text-red-700">{translations.emergencyServices}</h3>
                <p className="text-sm text-red-600">{translations.emergency911}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-center">
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                setShowEmergencyServices(false);
                onContinue();
              }}
            >
              {translations.continueTo}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const renderMoodContent = () => {
    switch (selectedMood) {
      case 'happy':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F2FCE2] to-[#F2FCE2]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Smile className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">{translations.happyTitle}</h2>
              <div className="space-y-4 mb-10">
                {happyAffirmations.map((affirmation, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {affirmation}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={handleContinue}
                >
                  {translations.continueToRegister}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {translations.previous}
                </Button>
              </div>
            </div>
          </div>
        );
      case 'ok':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F9F9F2] to-[#F9F9F2]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Annoyed className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">{translations.okTitle}</h2>
              <div className="space-y-4 mb-10">
                {okAffirmations.map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={handleContinue}
                >
                  {translations.continueToRegister}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {translations.previous}
                </Button>
              </div>
            </div>
          </div>
        );
      case 'neutral':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F7F7F7] to-[#F7F7F7]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Meh className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">{translations.neutralTitle}</h2>
              <div className="space-y-4 mb-10">
                {neutralAffirmations.map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={handleContinue}
                >
                  {translations.continueToRegister}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {translations.previous}
                </Button>
              </div>
            </div>
          </div>
        );
      case 'down':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F2F2F7] to-[#F2F2F7]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <HeartCrack className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">{translations.downTitle}</h2>
              <div className="space-y-4 mb-10">
                {downAffirmations.map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={handleContinue}
                >
                  {translations.continueToRegister}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {translations.previous}
                </Button>
              </div>
            </div>
          </div>
        );
      case 'sad':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F0F4F8] to-[#F0F4F8]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Frown className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">{translations.sadTitle}</h2>
              <div className="space-y-4 mb-10">
                {sadAffirmations.map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={handleContinue}
                >
                  {translations.continue}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {translations.previous}
                </Button>
              </div>
            </div>
            {renderEmergencyServices()}
          </div>
        );
      case 'overwhelmed':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F0EDF6] to-[#F0EDF6]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Angry className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">{translations.overwhelmedTitle}</h2>
              <div className="space-y-4 mb-10">
                {overwhelmedAffirmations.map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={handleContinue}
                >
                  {translations.continue}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {translations.previous}
                </Button>
              </div>
            </div>
            {renderEmergencyServices()}
          </div>
        );
      default:
        return null;
    }
  };

  return renderMoodContent();
};

export default MoodResponse;
