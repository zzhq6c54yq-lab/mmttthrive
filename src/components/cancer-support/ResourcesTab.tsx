
import React from "react";
import { BookOpen, FileText, Apple, Beaker, GraduationCap, DollarSign, UserCog, Scale, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";

interface ResourcesTabProps {
  onFeatureClick: (path: string) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  const resourceItems = [
    {
      id: "cancer-types",
      title: isSpanish ? "Tipos de Cáncer" : "Cancer Types",
      icon: <BookOpen className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Información sobre varios tipos de cáncer y sus tratamientos"
        : "Information about various cancer types and their treatments",
      path: "cancer-support/cancer-types"
    },
    {
      id: "treatment-options",
      title: isSpanish ? "Opciones de Tratamiento" : "Treatment Options",
      icon: <FileText className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Guías detalladas sobre tratamientos y terapias"
        : "Detailed guides on treatments and therapies",
      path: "cancer-support/treatment-options"
    },
    {
      id: "side-effects",
      title: isSpanish ? "Efectos Secundarios" : "Side Effects",
      icon: <FileText className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Manejo de efectos secundarios comunes de los tratamientos"
        : "Managing common treatment side effects",
      path: "cancer-support/side-effects"
    },
    {
      id: "nutrition",
      title: isSpanish ? "Nutrición" : "Nutrition",
      icon: <Apple className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Consejos de alimentación durante y después del tratamiento"
        : "Dietary guidance during and after treatment",
      path: "cancer-support/nutrition"
    },
    {
      id: "clinical-trials",
      title: isSpanish ? "Ensayos Clínicos" : "Clinical Trials",
      icon: <Beaker className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Información sobre investigaciones y ensayos clínicos actuales"
        : "Information on current research and clinical trials",
      path: "cancer-support/clinical-trials"
    },
    {
      id: "research-updates",
      title: isSpanish ? "Actualizaciones de Investigación" : "Research Updates",
      icon: <GraduationCap className="h-5 w-5 text-cyan-500" />,
      description: isSpanish 
        ? "Noticias y avances recientes en la investigación del cáncer"
        : "Recent news and advances in cancer research",
      path: "cancer-support/research-updates"
    }
  ];
  
  const practicalResources = [
    {
      id: "financial-resources",
      title: isSpanish ? "Recursos Financieros" : "Financial Resources",
      icon: <DollarSign className="h-5 w-5 text-cyan-500" />,
      path: "cancer-support/financial-resources"
    },
    {
      id: "healthcare-navigation",
      title: isSpanish ? "Navegación del Sistema de Salud" : "Healthcare Navigation",
      icon: <UserCog className="h-5 w-5 text-cyan-500" />,
      path: "cancer-support/healthcare-navigation"
    },
    {
      id: "legal-resources",
      title: isSpanish ? "Recursos Legales" : "Legal Resources",
      icon: <Scale className="h-5 w-5 text-cyan-500" />,
      path: "cancer-support/legal-resources"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400">
          {isSpanish ? "Biblioteca de Recursos" : "Resource Library"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {isSpanish 
            ? "Acceso a información confiable y educativa sobre el cáncer." 
            : "Access to reliable, educational information about cancer."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resourceItems.map(resource => (
          <Card key={resource.id} className="border-cyan-200 dark:border-cyan-900/30 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-100 dark:bg-cyan-900/20 p-2 rounded-full">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-cyan-600 dark:text-cyan-400 mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 p-0 h-auto hover:bg-transparent"
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
      
      <div className="bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-200 dark:border-cyan-800/30 rounded-lg p-5">
        <h3 className="font-medium text-cyan-600 dark:text-cyan-400 mb-4">
          {isSpanish ? "Recursos Prácticos" : "Practical Resources"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {practicalResources.map(resource => (
            <Button 
              key={resource.id}
              variant="outline" 
              className="border-cyan-300 text-cyan-600 dark:border-cyan-800 dark:text-cyan-400 justify-start"
              onClick={() => onFeatureClick(resource.path)}
            >
              {resource.icon}
              <span className="ml-2">{resource.title}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="border-cyan-200 dark:border-cyan-900/30">
          <CardContent className="p-5">
            <h3 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
              {isSpanish ? "Historias de Sobrevivientes" : "Survivor Stories"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {isSpanish 
                ? "Lea historias inspiradoras de sobrevivientes de cáncer."
                : "Read inspiring stories from cancer survivors."}
            </p>
            <Button 
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
              onClick={() => onFeatureClick("cancer-support/survivor-stories")}
            >
              {isSpanish ? "Leer Historias" : "Read Stories"}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-cyan-200 dark:border-cyan-900/30">
          <CardContent className="p-5">
            <h3 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
              {isSpanish ? "Inspiración Diaria" : "Daily Inspiration"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {isSpanish 
                ? "Citas, mensajes y meditaciones para inspirarle diariamente."
                : "Quotes, messages and meditations to inspire you daily."}
            </p>
            <Button 
              variant="outline" 
              className="border-cyan-300 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-800 dark:text-cyan-400 dark:hover:bg-cyan-900/20"
              onClick={() => onFeatureClick("cancer-support/daily-inspiration")}
            >
              {isSpanish ? "Inspiración de Hoy" : "Today's Inspiration"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesTab;
