
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";

interface SpecializedProgramsGridProps {
  onProgramClick: (path: string) => void;
}

const SpecializedProgramsGrid: React.FC<SpecializedProgramsGridProps> = ({ onProgramClick }) => {
  const { isSpanish } = useTranslation();

  const programs = [
    {
      id: "dod-military",
      title: isSpanish ? "Apoyo Militar y Veteranos" : "Military & Veterans Support",
      description: isSpanish 
        ? "Recursos especializados para miembros del servicio militar activo y veteranos."
        : "Specialized resources for active military service members and veterans.",
      path: "/dod-welcome",
      image: "/lovable-uploads/military-flag-badges.jpg", // Replace with your uploaded military image
      gradient: "from-green-600 to-emerald-800"
    },
    {
      id: "law-enforcement",
      title: isSpanish ? "Aplicación de la Ley" : "Law Enforcement",
      description: isSpanish 
        ? "Apoyo integral para oficiales de policía y personal de aplicación de la ley."
        : "Comprehensive support for police officers and law enforcement personnel.",
      path: "/law-enforcement-welcome",
      image: "/lovable-uploads/police-badge.jpg", // Replace with your uploaded police badge image
      gradient: "from-blue-700 to-indigo-900"
    },
    {
      id: "golden-years",
      title: isSpanish ? "Años Dorados (65+)" : "Golden Years (65+)",
      description: isSpanish 
        ? "Bienestar y apoyo especializado para adultos mayores y sus familias."
        : "Specialized wellness and support for older adults and their families.",
      path: "/golden-years-welcome",
      image: "/lovable-uploads/elderly-musicians.jpg", // Replace with your uploaded elderly musicians image
      gradient: "from-amber-500 to-orange-700"
    },
    {
      id: "chronic-illness",
      title: isSpanish ? "Apoyo para Enfermedades Crónicas" : "Chronic Illness Support",
      description: isSpanish 
        ? "Recursos para personas que viven con enfermedades crónicas y sus cuidadores."
        : "Resources for individuals living with chronic illnesses and their caregivers.",
      path: "/chronic-illness-welcome",
      image: "/lovable-uploads/medicine-bottles.jpg", // Replace with your uploaded medicine bottles image
      gradient: "from-teal-600 to-cyan-800"
    },
    {
      id: "cancer-support",
      title: isSpanish ? "Comunidad de Apoyo contra el Cáncer" : "Cancer Support Community",
      description: isSpanish 
        ? "Apoyo integral para pacientes con cáncer, sobrevivientes y sus familias."
        : "Comprehensive support for cancer patients, survivors, and their families.",
      path: "/cancer-support-welcome",
      image: "/lovable-uploads/awareness-ribbons.jpg", // Replace with your uploaded awareness ribbons image
      gradient: "from-pink-600 to-rose-800"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {programs.map((program, index) => (
        <motion.div
          key={program.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={program.image} 
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80";
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient} opacity-70`}></div>
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="text-white text-lg font-bold">{program.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {program.description}
              </p>
              <Button 
                onClick={() => onProgramClick(program.path)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
              >
                {isSpanish ? "Explorar Programa" : "Explore Program"}
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SpecializedProgramsGrid;
