
import React from "react";
import useTranslation from "@/hooks/useTranslation";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
  markTutorialCompleted?: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature,
  markTutorialCompleted
}) => {
  const { getTranslatedText, isSpanish } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isSpanish ? `¡Bienvenido, ${userName}!` : `Welcome, ${userName}!`}
          </h1>
          <p className="text-xl text-gray-300">
            {isSpanish ? "Tu viaje de bienestar comienza aquí" : "Your wellness journey starts here"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mental Wellness */}
          <div 
            onClick={() => navigateToFeature('/mental-wellness-tools')}
            className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {isSpanish ? "Bienestar Mental" : "Mental Wellness"}
            </h3>
            <p className="text-purple-100">
              {isSpanish ? "Herramientas y recursos para tu salud mental" : "Tools and resources for your mental health"}
            </p>
          </div>

          {/* Career Coaching */}
          <div 
            onClick={() => navigateToFeature('/career-coaching')}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {isSpanish ? "Orientación Profesional" : "Career Coaching"}
            </h3>
            <p className="text-blue-100">
              {isSpanish ? "Guía para tu desarrollo profesional" : "Guidance for your professional development"}
            </p>
          </div>

          {/* Meditation Studio */}
          <div 
            onClick={() => navigateToFeature('/meditation-studio')}
            className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {isSpanish ? "Estudio de Meditación" : "Meditation Studio"}
            </h3>
            <p className="text-green-100">
              {isSpanish ? "Prácticas de meditación guiada" : "Guided meditation practices"}
            </p>
          </div>

          {/* AA/NA Sponsor */}
          <div 
            onClick={() => navigateToFeature('/aa-sponsor')}
            className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {isSpanish ? "Padrino AA/NA" : "AA/NA Sponsor"}
            </h3>
            <p className="text-orange-100">
              {isSpanish ? "Apoyo para la recuperación" : "Recovery support"}
            </p>
          </div>

          {/* Cancer Support */}
          <div 
            onClick={() => navigateToFeature('/cancer-support')}
            className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {isSpanish ? "Apoyo para el Cáncer" : "Cancer Support"}
            </h3>
            <p className="text-pink-100">
              {isSpanish ? "Recursos y apoyo para pacientes y familias" : "Resources and support for patients and families"}
            </p>
          </div>

          {/* Games & Quizzes */}
          <div 
            onClick={() => navigateToFeature('/games-and-quizzes')}
            className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {isSpanish ? "Juegos y Cuestionarios" : "Games & Quizzes"}
            </h3>
            <p className="text-yellow-100">
              {isSpanish ? "Actividades interactivas para el bienestar" : "Interactive activities for wellness"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
