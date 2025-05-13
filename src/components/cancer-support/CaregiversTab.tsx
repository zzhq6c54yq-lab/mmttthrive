
import React from "react";
import { HeartHandshake, BookOpen, MessageSquare, Calendar, FileText, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";

interface CaregiversTabProps {
  onFeatureClick: (path: string) => void;
}

const CaregiversTab: React.FC<CaregiversTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  const caregiverResources = [
    {
      id: "caregiver-basics",
      title: isSpanish ? "Conceptos Básicos para Cuidadores" : "Caregiver Basics",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Información esencial para nuevos cuidadores de pacientes con cáncer"
        : "Essential information for new cancer caregivers",
      path: "cancer-support/caregiver-basics"
    },
    {
      id: "caregiver-selfcare",
      title: isSpanish ? "Autocuidado para Cuidadores" : "Caregiver Self-Care",
      icon: <Heart className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Cómo cuidar de tu propio bienestar mientras cuidas a otros"
        : "How to care for your own wellbeing while caring for others",
      path: "cancer-support/caregiver-selfcare"
    },
    {
      id: "caregiver-communication",
      title: isSpanish ? "Comunicación Efectiva" : "Effective Communication",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Consejos para comunicarse con pacientes y profesionales médicos"
        : "Tips for communicating with patients and healthcare professionals",
      path: "cancer-support/caregiver-communication"
    },
    {
      id: "financial-navigation",
      title: isSpanish ? "Navegación Financiera" : "Financial Navigation",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Ayuda para manejar los aspectos financieros del cuidado"
        : "Help managing the financial aspects of caregiving",
      path: "cancer-support/financial-navigation"
    },
    {
      id: "caregiver-workshops",
      title: isSpanish ? "Talleres para Cuidadores" : "Caregiver Workshops",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Talleres educativos diseñados específicamente para cuidadores"
        : "Educational workshops designed specifically for caregivers",
      path: "cancer-support/caregiver-workshops"
    },
    {
      id: "caregiver-stories",
      title: isSpanish ? "Historias de Cuidadores" : "Caregiver Stories",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Experiencias compartidas por otros cuidadores de pacientes con cáncer"
        : "Experiences shared by other cancer caregivers",
      path: "cancer-support/caregiver-stories"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
          {isSpanish ? "Recursos para Cuidadores" : "Caregiver Resources"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {isSpanish 
            ? "Apoyo dedicado para quienes cuidan a seres queridos con cáncer." 
            : "Dedicated support for those caring for loved ones with cancer."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caregiverResources.map(resource => (
          <Card key={resource.id} className="border-purple-200 dark:border-purple-900/30 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-purple-600 dark:text-purple-400 mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 p-0 h-auto hover:bg-transparent"
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
      
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 pb-4">
        <Button 
          className="bg-purple-500 hover:bg-purple-600 text-white"
          onClick={() => onFeatureClick("cancer-support/caregiver-forum")}
        >
          {isSpanish ? "Foro de Discusión de Cuidadores" : "Caregiver Discussion Forum"}
        </Button>
        <Button 
          variant="outline" 
          className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
          onClick={() => onFeatureClick("cancer-support/caregiver-groups")}
        >
          {isSpanish ? "Grupos de Apoyo" : "Support Groups"}
        </Button>
      </div>
    </div>
  );
};

export default CaregiversTab;
