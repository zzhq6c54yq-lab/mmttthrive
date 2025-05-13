
import React from "react";
import { Info, Calendar, Users, FileText, MessageSquare, BookOpen, PanelTop, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";

interface PatientsTabProps {
  onFeatureClick: (path: string) => void;
}

const PatientsTab: React.FC<PatientsTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  const patientResources = [
    {
      id: "newly-diagnosed",
      title: isSpanish ? "Recién Diagnosticado" : "Newly Diagnosed",
      icon: <Info className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Recursos para pacientes que recientemente han sido diagnosticados con cáncer"
        : "Resources for patients who have recently been diagnosed with cancer",
      path: "cancer-support/newly-diagnosed"
    },
    {
      id: "treatment",
      title: isSpanish ? "Durante el Tratamiento" : "During Treatment",
      icon: <Calendar className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Apoyo durante el proceso de tratamiento y citas médicas"
        : "Support through the treatment process and medical appointments",
      path: "cancer-support/treatment"
    },
    {
      id: "stages",
      title: isSpanish ? "Etapas del Cáncer" : "Cancer Stages",
      icon: <PanelTop className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Información sobre las diferentes etapas del cáncer y qué esperar"
        : "Information about different cancer stages and what to expect",
      path: "cancer-support/stages"
    },
    {
      id: "survivorship",
      title: isSpanish ? "Supervivencia" : "Survivorship",
      icon: <Users className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Recursos para la vida después del tratamiento del cáncer"
        : "Resources for life after cancer treatment",
      path: "cancer-support/survivorship"
    },
    {
      id: "peer-connect",
      title: isSpanish ? "Conectar con Otros Pacientes" : "Connect with Fellow Patients",
      icon: <MessageSquare className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Conéctate con otros pacientes para compartir experiencias"
        : "Connect with other patients to share experiences",
      path: "cancer-support/peer-connect"
    },
    {
      id: "events",
      title: isSpanish ? "Eventos y Talleres" : "Events & Workshops",
      icon: <Calendar className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Eventos virtuales y presenciales para pacientes"
        : "Virtual and in-person events for patients",
      path: "cancer-support/events"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-400">
          {isSpanish ? "Recursos para Pacientes" : "Patient Resources"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {isSpanish 
            ? "Apoyo especializado para personas que están navegando su diagnóstico y tratamiento de cáncer." 
            : "Specialized support for individuals navigating cancer diagnosis and treatment."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patientResources.map(resource => (
          <Card key={resource.id} className="border-rose-200 dark:border-rose-900/30 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="bg-rose-100 dark:bg-rose-900/20 p-2 rounded-full">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-rose-600 dark:text-rose-400 mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 p-0 h-auto hover:bg-transparent"
                    onClick={() => onFeatureClick(resource.path)}
                  >
                    {isSpanish ? "Explorar" : "Explore"}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/30 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-5 w-5 text-rose-500" />
          <h3 className="font-medium text-rose-600 dark:text-rose-400">
            {isSpanish ? "Tipos de Cáncer" : "Cancer Types"}
          </h3>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {isSpanish 
            ? "Información específica sobre diferentes tipos de cáncer, tratamientos y recursos." 
            : "Find specific information about different types of cancer, treatments, and resources."}
        </p>
        <Button 
          className="mt-3 bg-rose-500 hover:bg-rose-600 text-white"
          onClick={() => onFeatureClick("cancer-support/types/general")}
        >
          {isSpanish ? "Ver Todos los Tipos" : "View All Types"}
        </Button>
      </div>
      
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          className="border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/20"
          onClick={() => onFeatureClick("cancer-support/immediate-support")}
        >
          {isSpanish ? "Necesito Apoyo Inmediato" : "I Need Immediate Support"}
        </Button>
      </div>
    </div>
  );
};

export default PatientsTab;
