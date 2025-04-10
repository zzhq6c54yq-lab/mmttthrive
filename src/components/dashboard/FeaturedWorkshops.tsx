import React, { useEffect } from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeaturedWorkshopsProps {
  navigate: any;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
}

interface Workshop {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

const FeaturedWorkshops: React.FC<FeaturedWorkshopsProps> = ({ navigate, onWorkshopClick }) => {
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';

  const translations = {
    viewAll: isSpanish ? "Ver todos los talleres" : "View All Workshops",
  };

  const workshopData: Workshop[] = [
    {
      id: "anxiety-management",
      title: isSpanish ? "Manejo de la Ansiedad" : "Anxiety Management",
      description: isSpanish ? "Aprenda estrategias efectivas para controlar la ansiedad y el estrés." : "Learn effective strategies to manage anxiety and stress.",
      imagePath: "",
    },
    {
      id: "mindfulness-basics",
      title: isSpanish ? "Fundamentos de la Atención Plena" : "Mindfulness Basics",
      description: isSpanish ? "Descubra cómo la atención plena puede mejorar su bienestar diario." : "Discover how mindfulness can enhance your daily well-being.",
      imagePath: "",
    },
    {
      id: "coping-with-stress",
      title: isSpanish ? "Afrontamiento del Estrés" : "Coping with Stress",
      description: isSpanish ? "Técnicas prácticas para reducir el estrés y mejorar la resiliencia." : "Practical techniques to reduce stress and improve resilience.",
      imagePath: "",
    },
    {
      id: "healthy-relationships",
      title: isSpanish ? "Relaciones Saludables" : "Healthy Relationships",
      description: isSpanish ? "Consejos para construir y mantener relaciones positivas y de apoyo." : "Tips for building and maintaining positive and supportive relationships.",
      imagePath: "",
    },
    {
      id: "grief-and-loss",
      title: isSpanish ? "Duelo y Pérdida" : "Grief and Loss",
      description: isSpanish ? "Apoyo y estrategias para afrontar el duelo de manera saludable." : "Support and strategies for coping with grief in a healthy way.",
      imagePath: "",
    },
    {
      id: "trauma-recovery",
      title: isSpanish ? "Recuperación del Trauma" : "Trauma Recovery",
      description: isSpanish ? "Recursos y apoyo para ayudar en el proceso de curación del trauma." : "Resources and support to aid in the trauma healing process.",
      imagePath: "",
    },
    {
      id: "self-care-basics",
      title: isSpanish ? "Fundamentos del Autocuidado" : "Self-Care Basics",
      description: isSpanish ? "Aprenda la importancia del autocuidado y cómo integrarlo en su rutina diaria." : "Learn the importance of self-care and how to integrate it into your daily routine.",
      imagePath: "",
    },
    {
      id: "depression-management",
      title: isSpanish ? "Manejo de la Depresión" : "Depression Management",
      description: isSpanish ? "Estrategias y recursos para ayudar a controlar los síntomas de la depresión." : "Strategies and resources to help manage symptoms of depression.",
      imagePath: "",
    },
  ];

  // Add a useEffect to ensure all workshops have images
  useEffect(() => {
    // Ensure each workshop has a unique image
    const workshopImageMap = {
      "anxiety-management": "https://images.unsplash.com/photo-1529686342540-1b43aec0df75?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "mindfulness-basics": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "coping-with-stress": "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "healthy-relationships": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "grief-and-loss": "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "trauma-recovery": "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "self-care-basics": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "depression-management": "https://images.unsplash.com/photo-1542868727-819245fb428a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    };

    // Update workshopData with image paths if they're missing
    workshopData.forEach(workshop => {
      if (!workshop.imagePath || workshop.imagePath === "") {
        workshop.imagePath = workshopImageMap[workshop.id as keyof typeof workshopImageMap] || 
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
      }
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {isSpanish ? "Talleres Destacados" : "Featured Workshops"}
        </h3>
        <p className="text-gray-600 text-sm">
          {isSpanish ? "Únase a nuestros próximos talleres para mejorar su bienestar." : "Join our upcoming workshops to enhance your wellbeing."}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {workshopData.map((workshop) => (
          <div
            key={workshop.id}
            className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => {
              onWorkshopClick(workshop.id, workshop.title);
              navigate(`/workshops/${workshop.id}`);
            }}
          >
            <img
              src={workshop.imagePath}
              alt={workshop.title}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h4 className="text-lg font-medium text-gray-700">{workshop.title}</h4>
            <p className="text-gray-500 text-sm">{workshop.description}</p>
          </div>
        ))}
      </div>
      <div className="px-6 py-4">
        <button
          onClick={() => navigate("/workshops")}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          {translations.viewAll}
        </button>
      </div>
    </div>
  );
};

export default FeaturedWorkshops;
