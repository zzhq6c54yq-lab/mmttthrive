
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, BookOpen, Brain, BarChart3, Video, Calendar, Headphones,
  BookText, Sparkles, MessageCircle, Leaf, Rocket, Globe, Heart, Users, HandHeart
} from "lucide-react";

interface KeyFeaturesProps {
  navigateToFeature: (path: string) => void;
  selectedQualities?: string[];
  selectedGoals?: string[];
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ 
  navigateToFeature,
  selectedQualities = [],
  selectedGoals = []
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  const getImageUrl = (imagePath: string) => {
    const fallbackImage = "https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
    
    if (imagePath && imagePath.startsWith('https://') && !imagePath.includes('undefined')) {
      return imagePath;
    }
    return fallbackImage;
  };
  
  const isRecommended = (feature: string) => {
    const featureMap: { [key: string]: string[] } = {
      "progress-reports": ["consistency", "data-driven", "reflective", "goal-oriented"],
      "family-resources": ["supportive", "family-oriented", "compassionate", "community"],
      "mental-wellness": ["mindful", "balanced", "wellness-focused", "creative"],
      "games": ["curious", "analytical", "intellectual", "playful"],
      "physical-wellness": ["active", "energetic", "disciplined", "health-conscious"],
      "community-support": ["social", "collaborative", "communicative", "empathetic"],
      "video-diary": ["reflective", "expressive", "authentic", "introspective"],
      "wellness-challenges": ["motivated", "disciplined", "competitive", "growth-focused"],
      "resource-library": ["curious", "informed", "analytical", "studious"],
      "sponsor-alternative": ["supportive", "recovery-focused", "accountable", "healing"],
      "binaural-beats": ["mindful", "experimental", "relaxation-focused", "open-minded"],
      "workshops": ["engaged", "learning-oriented", "growth-focused", "curious"],
      "journaling": ["reflective", "expressive", "creative", "introspective"],
      "real-time-therapy": ["communicative", "open", "healing-focused", "expressive"],
      "holistic-wellness": ["balanced", "holistic", "natural", "wellness-focused"],
      "alternative-therapies": ["experimental", "open-minded", "holistic", "healing-focused"]
    };
    
    const qualityMatch = selectedQualities.some(quality => 
      featureMap[feature] && featureMap[feature].includes(quality.toLowerCase())
    );
    
    const goalMatch = selectedGoals.some(goal => 
      goal.toLowerCase().includes(feature.replace('-', ' '))
    );
    
    return qualityMatch || goalMatch;
  };
  
  const handleNavigate = (path: string) => {
    // Add directToAssessment flag for assessment-related features
    const isAssessmentRelated = 
      path === "/mental-wellness" || 
      path === "/games-and-quizzes" ||
      path.includes("assessment");
    
    if (isAssessmentRelated) {
      navigate(path, {
        state: {
          preventTutorial: true,
          directToAssessment: true,
          activeTab: "assessments"
        }
      });
    } else {
      navigateToFeature(path);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const features = [
    {
      id: "progress-reports",
      title: isSpanish ? "Informes de Progreso" : "Progress Reports",
      icon: <BarChart3 />,
      path: "/progress-reports",
      color: "from-purple-600 to-blue-600",
      description: isSpanish ? "Seguimiento de tu bienestar mental" : "Track your mental wellness journey",
      image: getImageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "family-resources",
      title: isSpanish ? "Recursos Familiares" : "Family Resources",
      icon: <HandHeart />,
      path: "/family-resources",
      color: "from-pink-600 to-purple-600",
      description: isSpanish ? "Apoyo para ti y tus seres queridos" : "Support for you and your loved ones",
      image: getImageUrl("https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "mental-wellness",
      title: isSpanish ? "Bienestar Mental" : "Mental Wellness",
      icon: <BookOpen />,
      path: "/mental-wellness",
      color: "from-blue-600 to-indigo-600",
      description: isSpanish ? "Herramientas y evaluaciones para tu bienestar" : "Tools and assessments for your wellbeing",
      image: getImageUrl("https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "games",
      title: isSpanish ? "Juegos Mentales" : "Brain Games",
      icon: <Brain />,
      path: "/games-and-quizzes",
      color: "from-orange-600 to-red-600",
      description: isSpanish ? "Actividades divertidas para ejercitar tu mente" : "Fun activities to engage your mind",
      image: getImageUrl("https://images.unsplash.com/photo-1606167668584-78701c57f13d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "video-diary",
      title: isSpanish ? "Diario en Video" : "Video Diary",
      icon: <Video />,
      path: "/video-diary",
      color: "from-amber-500 to-orange-600",
      description: isSpanish ? "Graba y reflexiona sobre tu proceso" : "Record and reflect on your journey",
      image: getImageUrl("https://images.unsplash.com/photo-1576087503901-b2a3b817f0d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "wellness-challenges",
      title: isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges",
      icon: <Activity />,
      path: "/wellness-challenges",
      color: "from-emerald-600 to-green-600",
      description: isSpanish ? "Retos diarios para mejorar tu bienestar" : "Daily challenges to boost wellbeing",
      image: getImageUrl("https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "resource-library",
      title: isSpanish ? "Biblioteca de Recursos" : "Resource Library",
      icon: <BookText />,
      path: "/resource-library",
      color: "from-cyan-600 to-blue-600",
      description: isSpanish ? "Extensa colección de materiales útiles" : "Extensive collection of helpful materials",
      image: getImageUrl("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "sponsor-alternative",
      title: isSpanish ? "Mi Patrocinador" : "My Sponsor",
      icon: <Users />,
      path: "/my-sponsor",
      color: "from-rose-600 to-pink-600",
      description: isSpanish ? "Apoyo para tu proceso de recuperación" : "Support for your recovery journey",
      image: getImageUrl("https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "binaural-beats",
      title: isSpanish ? "Tonos Binaurales" : "Binaural Beats",
      icon: <Headphones />,
      path: "/binaural-beats",
      color: "from-violet-600 to-purple-600",
      description: isSpanish ? "Terapia de audio para relajación" : "Audio therapy for relaxation",
      image: getImageUrl("https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "workshops",
      title: isSpanish ? "Talleres" : "Workshops",
      icon: <Calendar />,
      path: "/workshops",
      color: "from-emerald-600 to-teal-600",
      description: isSpanish ? "Sesiones interactivas con profesionales" : "Interactive sessions with professionals",
      image: getImageUrl("https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "journaling",
      title: isSpanish ? "Diario Personal" : "Journaling",
      icon: <BookText />,
      path: "/journaling",
      color: "from-blue-600 to-cyan-600",
      description: isSpanish ? "Expresa pensamientos y registra emociones" : "Express thoughts and track emotions",
      image: getImageUrl("https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "mindfulness",
      title: isSpanish ? "Mindfulness y Sueño" : "Mindfulness & Sleep",
      icon: <Sparkles />,
      path: "/mindfulness-sleep",
      color: "from-violet-600 to-indigo-600",
      description: isSpanish ? "Prácticas para mejor descanso y conciencia" : "Practices for better rest and awareness",
      image: getImageUrl("https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "real-time-therapy",
      title: isSpanish ? "Terapia en Tiempo Real" : "Real-Time Therapy",
      icon: <MessageCircle />,
      path: "/real-time-therapy",
      color: "from-red-600 to-rose-600",
      description: isSpanish ? "Conecta con terapeutas al instante" : "Connect with therapists instantly",
      image: getImageUrl("https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "holistic-wellness",
      title: isSpanish ? "Bienestar Holístico" : "Holistic Wellness",
      icon: <Leaf />,
      path: "/holistic-wellness",
      color: "from-green-600 to-lime-600",
      description: isSpanish ? "Enfoque integral para tu bienestar" : "Whole-person approach to wellbeing",
      image: getImageUrl("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "alternative-therapies",
      title: isSpanish ? "Terapias Alternativas" : "Alternative Therapies",
      icon: <Rocket />,
      path: "/alternative-therapies",
      color: "from-teal-600 to-cyan-600",
      description: isSpanish ? "Explora métodos innovadores de sanación" : "Explore innovative healing methods",
      image: getImageUrl("https://images.unsplash.com/photo-1615529162924-f8605388461d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "community-support",
      title: isSpanish ? "Apoyo Comunitario" : "Community Support",
      icon: <Globe />,
      path: "/community-support",
      color: "from-blue-600 to-indigo-600",
      description: isSpanish ? "Conecta con otros en caminos similares" : "Connect with others on similar journeys",
      image: getImageUrl("https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80")
    },
  ];

  return (
    <div className="mt-8">
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature) => (
          <motion.div 
            key={feature.id}
            variants={item}
            className="relative"
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => handleNavigate(feature.path)}
              className="w-full h-full text-left"
              aria-label={feature.title}
            >
              <div className="relative overflow-hidden rounded-xl h-44 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 h-full w-full">
                  <div className="absolute inset-0 h-[70%] overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <h3 className="font-bold text-sm text-white truncate text-center w-full px-2">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                
                <div className="absolute inset-0 p-3 flex flex-col justify-between">
                  <div>
                    <div className="p-1.5 rounded-full bg-white/20 w-fit backdrop-blur-sm inline-flex">
                      {React.cloneElement(feature.icon, { className: "h-4 w-4 text-white drop-shadow-sm" })}
                    </div>
                    
                    {isRecommended(feature.id) && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium float-right">
                        {isSpanish ? "Recomendado" : "Recommended"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
