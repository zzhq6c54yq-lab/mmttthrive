
import React from "react";
import { Users, MessageSquare, VideoIcon, UserRound, Clock, Heart, ArrowRight, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useTranslation from "@/hooks/useTranslation";

interface CommunitiesTabProps {
  onFeatureClick: (path: string) => void;
}

const CommunitiesTab: React.FC<CommunitiesTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  const communityOptions = [
    {
      id: "general-community",
      title: isSpanish ? "Comunidad General" : "General Community",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      description: isSpanish 
        ? "Conecta con la comunidad general de apoyo para el cáncer"
        : "Connect with the general cancer support community",
      path: "cancer-support/general-community",
      activeUsers: 86,
      newPosts: 12
    },
    {
      id: "cancer-type-communities",
      title: isSpanish ? "Comunidades por Tipo de Cáncer" : "Cancer Type Communities",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      description: isSpanish 
        ? "Encuentra grupos específicos para tu tipo de cáncer"
        : "Find specific groups for your type of cancer",
      path: "cancer-support/cancer-type-communities",
      activeUsers: 124,
      newPosts: 18
    },
    {
      id: "virtual-meetings",
      title: isSpanish ? "Reuniones Virtuales" : "Virtual Meetings",
      icon: <VideoIcon className="h-5 w-5 text-blue-500" />,
      description: isSpanish 
        ? "Calendario de próximas reuniones virtuales y eventos"
        : "Calendar of upcoming virtual meetings and events",
      path: "cancer-support/virtual-meetings",
      upcomingEvents: 5
    },
    {
      id: "one-on-one",
      title: isSpanish ? "Conexiones Individuales" : "One-on-One Connections",
      icon: <UserRound className="h-5 w-5 text-blue-500" />,
      description: isSpanish 
        ? "Conecta individualmente con compañeros de apoyo"
        : "Connect individually with support companions",
      path: "cancer-support/one-on-one",
      availableNow: 8
    }
  ];
  
  const specialCommunities = [
    {
      id: "young-adults",
      title: isSpanish ? "Adultos Jóvenes" : "Young Adults",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      path: "cancer-support/young-adults"
    },
    {
      id: "metastatic",
      title: isSpanish ? "Cáncer Metastásico" : "Metastatic Cancer",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      path: "cancer-support/metastatic"
    },
    {
      id: "caregivers-circle",
      title: isSpanish ? "Círculo de Cuidadores" : "Caregivers Circle",
      icon: <Heart className="h-5 w-5 text-blue-500" />,
      path: "cancer-support/caregivers-circle"
    },
    {
      id: "survivorship-community",
      title: isSpanish ? "Comunidad de Sobrevivientes" : "Survivorship Community",
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      path: "cancer-support/survivorship-community"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          {isSpanish ? "Comunidades de Apoyo" : "Support Communities"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {isSpanish 
            ? "Conéctate con otros afectados por el cáncer para compartir experiencias y apoyo." 
            : "Connect with others affected by cancer to share experiences and support."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {communityOptions.map(community => (
          <Card key={community.id} className="border-blue-200 dark:border-blue-900/30 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                  {community.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-blue-600 dark:text-blue-400">{community.title}</h3>
                    
                    {community.activeUsers && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                        {community.activeUsers}+ {isSpanish ? "activos" : "active"}
                      </Badge>
                    )}
                    
                    {community.upcomingEvents && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                        {community.upcomingEvents} {isSpanish ? "próximos" : "upcoming"}
                      </Badge>
                    )}
                    
                    {community.availableNow && (
                      <Badge variant="secondary" className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300">
                        {community.availableNow} {isSpanish ? "disponibles" : "available"}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 my-2">{community.description}</p>
                  
                  {community.newPosts && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 mb-2">
                      {community.newPosts} {isSpanish ? "publicaciones nuevas hoy" : "new posts today"}
                    </div>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0 h-auto hover:bg-transparent"
                    onClick={() => onFeatureClick(community.path)}
                  >
                    {isSpanish ? "Unirse y Participar" : "Join & Participate"}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-5">
        <h3 className="font-medium text-blue-600 dark:text-blue-400 mb-4">
          {isSpanish ? "Comunidades Especializadas" : "Specialized Communities"}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {specialCommunities.map(community => (
            <Button 
              key={community.id}
              variant="outline" 
              className="border-blue-300 text-blue-600 dark:border-blue-800 dark:text-blue-400 justify-start"
              onClick={() => onFeatureClick(community.path)}
            >
              {community.icon}
              <span className="ml-2">{community.title}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => onFeatureClick("cancer-support/create-group")}
        >
          <Users className="mr-2 h-4 w-4" />
          {isSpanish ? "Crear un Nuevo Grupo" : "Create a New Group"}
        </Button>
      </div>
    </div>
  );
};

export default CommunitiesTab;
