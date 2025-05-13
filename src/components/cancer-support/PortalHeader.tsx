
import React from "react";
import useTranslation from "@/hooks/useTranslation";
import { Heart } from "lucide-react";

const PortalHeader: React.FC = () => {
  const { isSpanish } = useTranslation();
  
  return (
    <div className="bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-lg shadow-md border border-rose-300/30 dark:border-rose-500/20">
      <div className="flex items-center mb-4">
        <div className="bg-rose-500 rounded-full p-2 mr-3">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-rose-700 dark:text-rose-300">
          {isSpanish ? "Portal de Apoyo para el Cáncer" : "Cancer Support Portal"}
        </h1>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {isSpanish 
          ? "Un espacio compasivo y recursos de apoyo para pacientes, sobrevivientes, cuidadores y familias afectadas por el cáncer."
          : "A compassionate space and supportive resources for patients, survivors, caregivers, and families affected by cancer."}
      </p>
      
      <div className="flex flex-wrap gap-2">
        <span className="bg-rose-200 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 text-xs py-1 px-3 rounded-full">
          {isSpanish ? "Apoyo emocional" : "Emotional Support"}
        </span>
        <span className="bg-rose-200 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 text-xs py-1 px-3 rounded-full">
          {isSpanish ? "Recursos médicos" : "Medical Resources"}
        </span>
        <span className="bg-rose-200 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 text-xs py-1 px-3 rounded-full">
          {isSpanish ? "Comunidad" : "Community"}
        </span>
        <span className="bg-rose-200 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 text-xs py-1 px-3 rounded-full">
          {isSpanish ? "Educación" : "Education"}
        </span>
      </div>
    </div>
  );
};

export default PortalHeader;
