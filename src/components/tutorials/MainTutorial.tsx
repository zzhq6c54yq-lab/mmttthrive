
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainTutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Reset to first step when tutorial opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      console.log("MainTutorial: Dialog opened, reset to step 0");
    }
  }, [isOpen]);

  // Tutorial content - Enhanced with detailed feature descriptions
  const steps = [
    {
      title: isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT",
      content: isSpanish 
        ? "Thrive MT es tu asistente personal de bienestar mental. Esta guía te mostrará todas las características que tenemos para apoyar tu bienestar mental. Naveguemos juntos por el tablero principal y exploremos cada función."
        : "Thrive MT is your personal mental wellness assistant. This guide will walk you through all the features we have to support your mental wellbeing. Let's navigate the main dashboard together and explore each function."
    },
    {
      title: isSpanish ? "Tu Tablero Principal" : "Your Main Dashboard",
      content: isSpanish 
        ? "Tu tablero principal está diseñado para darte acceso rápido a todas las herramientas de bienestar mental. Aquí encontrarás un resumen de tus próximas citas, desafíos diarios y programas recomendados basados en tus preferencias personales."
        : "Your main dashboard is designed to give you quick access to all mental wellness tools. Here you'll find a summary of your upcoming appointments, daily challenges, and recommended programs based on your personal preferences."
    },
    {
      title: isSpanish ? "Desafíos Diarios de Bienestar" : "Daily Wellness Challenges",
      content: isSpanish 
        ? "La sección de Desafíos Diarios de Bienestar te ofrece actividades simples y efectivas para mejorar tu salud mental cada día. Completa estos desafíos para ganar puntos y desbloquear nuevas funciones. Puedes hacer clic en cualquier desafío para ver más detalles y comenzar."
        : "The Daily Wellness Challenges section offers you simple yet effective activities to improve your mental health each day. Complete these challenges to earn points and unlock new features. You can click on any challenge to see more details and get started."
    },
    {
      title: isSpanish ? "Programas Especializados" : "Specialized Programs",
      content: isSpanish 
        ? "Los Programas Especializados están diseñados para diferentes grupos, como militares, estudiantes universitarios y profesionales corporativos. Estos programas contienen recursos y herramientas adaptados a las necesidades específicas de cada grupo. Explora el programa que mejor se adapte a tu situación."
        : "Specialized Programs are designed for different groups, including military personnel, college students, and corporate professionals. These programs contain resources and tools tailored to the specific needs of each group. Explore the program that best fits your situation."
    },
    {
      title: isSpanish ? "Visualizador de Gratitud" : "Gratitude Visualizer",
      content: isSpanish 
        ? "El Visualizador de Gratitud te ayuda a mantener una mentalidad positiva registrando las cosas por las que estás agradecido. Añade nuevas entradas regularmente para construir un jardín virtual que representa tu crecimiento personal. Esta práctica ha demostrado aumentar significativamente el bienestar mental."
        : "The Gratitude Visualizer helps you maintain a positive mindset by logging things you're grateful for. Add new entries regularly to build a virtual garden representing your personal growth. This practice has been shown to significantly increase mental wellbeing."
    },
    {
      title: isSpanish ? "Citas Próximas" : "Upcoming Appointments",
      content: isSpanish 
        ? "La sección de Citas Próximas te muestra todas tus sesiones programadas con terapeutas, talleres y otros eventos de bienestar. Puedes gestionar tus citas haciendo clic en esta sección. Recibirás recordatorios automáticos antes de cada cita para asegurarte de no perderte ninguna sesión importante."
        : "The Upcoming Appointments section shows you all your scheduled sessions with therapists, workshops, and other wellness events. You can manage your appointments by clicking on this section. You'll receive automatic reminders before each appointment to ensure you don't miss any important sessions."
    },
    {
      title: isSpanish ? "Perspectivas Personalizadas" : "Personalized Insights",
      content: isSpanish 
        ? "Las Perspectivas Personalizadas analizan tu progreso y actividad para ofrecerte recomendaciones específicas. Esta sección se actualiza regularmente con nuevos consejos y observaciones basadas en tus patrones de bienestar. Visita esta sección regularmente para descubrir nuevas formas de mejorar tu salud mental."
        : "Personalized Insights analyzes your progress and activity to offer you specific recommendations. This section is regularly updated with new tips and observations based on your wellness patterns. Visit this section regularly to discover new ways to improve your mental health."
    },
    {
      title: isSpanish ? "Cuestionarios y Evaluaciones" : "Quizzes & Assessments",
      content: isSpanish 
        ? "Los Cuestionarios y Evaluaciones te ayudan a comprender mejor tu estado mental actual. Completa estas breves evaluaciones para recibir información personalizada y recomendaciones. Los resultados se mantienen privados y se utilizan para personalizar tu experiencia en la plataforma."
        : "Quizzes & Assessments help you better understand your current mental state. Complete these brief assessments to receive personalized insights and recommendations. Results are kept private and used to customize your experience on the platform."
    },
    {
      title: isSpanish ? "Talleres Destacados" : "Featured Workshops",
      content: isSpanish 
        ? "Los Talleres Destacados ofrecen sesiones guiadas sobre diversos temas de salud mental. Puedes participar en estos talleres interactivos en cualquier momento. Cada taller incluye actividades prácticas, videos educativos y ejercicios que puedes aplicar en tu vida diaria para mejorar tu bienestar."
        : "Featured Workshops offer guided sessions on various mental health topics. You can participate in these interactive workshops at any time. Each workshop includes practical activities, educational videos, and exercises you can apply in your daily life to improve your wellbeing."
    },
    {
      title: isSpanish ? "Funciones Clave y Herramientas" : "Key Features & Tools",
      content: isSpanish 
        ? "La sección de Funciones Clave te da acceso a todas las herramientas disponibles en Thrive MT. Explora opciones como el Diario de Video, Desafíos de Bienestar, Contenido Personalizado y muchas más. Cada herramienta está diseñada para abordar diferentes aspectos de tu salud mental y bienestar general."
        : "The Key Features section gives you access to all tools available in Thrive MT. Explore options like Video Diary, Wellness Challenges, Personalized Content, and many more. Each tool is designed to address different aspects of your mental health and overall wellbeing."
    },
    {
      title: isSpanish ? "Asistente Henry" : "Henry Assistant",
      content: isSpanish 
        ? "Henry es tu asistente de bienestar mental personal. Puedes activarlo haciendo clic en su icono en cualquier momento para obtener ayuda, buscar recursos o recibir apoyo. Henry puede responder preguntas, guiarte a las herramientas adecuadas y ofrecer sugerencias personalizadas basadas en tus necesidades."
        : "Henry is your personal mental wellness assistant. You can activate him by clicking his icon at any time to get help, search for resources, or receive support. Henry can answer questions, guide you to the right tools, and offer personalized suggestions based on your needs."
    },
    {
      title: isSpanish ? "Nuevas Características" : "New Features",
      content: isSpanish 
        ? "La sección de Nuevas Características muestra las últimas adiciones a Thrive MT. Aquí encontrarás el Sistema de Trueque para intercambiar servicios, opciones para Mejorar tu Plan, y información sobre Créditos de Copago. Visita regularmente esta sección para descubrir nuevas herramientas y funcionalidades."
        : "The New Features section showcases the latest additions to Thrive MT. Here you'll find the Barter System for exchanging services, options to Upgrade your Plan, and information about Co-Pay Credits. Visit this section regularly to discover new tools and functionality."
    },
    {
      title: isSpanish ? "¡Comienza Tu Viaje de Bienestar!" : "Start Your Wellness Journey!",
      content: isSpanish 
        ? "¡Ahora estás listo para comenzar tu viaje de bienestar mental con Thrive MT! Recuerda que puedes volver a este tutorial en cualquier momento haciendo clic en el botón Thrive en la esquina superior derecha. Estamos aquí para apoyarte en cada paso del camino hacia una mejor salud mental."
        : "You're now ready to begin your mental wellness journey with Thrive MT! Remember that you can return to this tutorial at any time by clicking the Thrive button in the top right corner. We're here to support you every step of the way toward better mental health."
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        console.log("MainTutorial: Dialog open changing to:", open);
        if (!open) onClose();
      }}
    >
      <DialogContent 
        className="max-w-md max-h-[90vh] bg-[#2a2a3c] border-[#3a3a4c] text-white overflow-visible"
        style={{ zIndex: 9999 }}
      >
        {/* Close button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <DialogHeader>
          <div className="flex items-center gap-3">
            {/* Dimensional logo */}
            <div className="relative h-10 w-10 group">
              <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-[#B87333]/40 to-[#E5C5A1]/40 blur-lg animate-pulse"></div>
              <div className="absolute inset-[-12px] rounded-full border border-[#B87333]/30 animate-spin" style={{animationDuration: '15s'}}></div>
              <div className="absolute inset-[-8px] rounded-full border border-[#E5C5A1]/20 animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-base leading-none tracking-tighter flex flex-col items-center">
                  <span className="text-[6px] opacity-80 mb-0.5">THRIVE</span>
                  <span>MT</span>
                </div>
              </div>
            </div>
            
            <div>
              <DialogTitle className="text-xl text-white">
                {isSpanish ? "Tutorial de Thrive" : "Thrive Tutorial"}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                {isSpanish ? "Paso" : "Step"} {currentStep + 1} {isSpanish ? "de" : "of"} {steps.length}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[50vh] pr-4 mt-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">{steps[currentStep].title}</h3>
            <p className="text-gray-300">{steps[currentStep].content}</p>
          </div>
        </ScrollArea>
        
        <DialogFooter className="mt-6 flex justify-between">
          <div className="flex-1">
            {currentStep > 0 && (
              <Button 
                variant="outline"
                onClick={handlePrevious}
                className="border-[#3a3a4c] text-gray-300 hover:bg-[#3a3a4c] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {isSpanish ? "Anterior" : "Previous"}
              </Button>
            )}
          </div>
          
          <Button 
            onClick={handleNext}
            className="bg-[#B87333] hover:bg-[#9e6229] text-white"
          >
            {currentStep < steps.length - 1 ? (
              <>
                {isSpanish ? "Siguiente" : "Next"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              isSpanish ? "Completar" : "Complete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MainTutorial;
