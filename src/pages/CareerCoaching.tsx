
import React, { useState } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, FileText, Target, Award, Calendar, MessageCircle } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const CareerCoaching = () => {
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState("assessment");

  const coachingAreas = [
    {
      title: isSpanish ? "Desarrollo Profesional" : "Career Development",
      description: isSpanish ? "Planifica tu crecimiento profesional" : "Plan your professional growth",
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />
    },
    {
      title: isSpanish ? "Habilidades de Liderazgo" : "Leadership Skills",
      description: isSpanish ? "Desarrolla habilidades de liderazgo" : "Develop leadership capabilities",
      icon: <Users className="w-6 h-6 text-green-500" />
    },
    {
      title: isSpanish ? "Preparación de CV" : "Resume Building",
      description: isSpanish ? "Crea un CV impactante" : "Create an impactful resume",
      icon: <FileText className="w-6 h-6 text-purple-500" />
    },
    {
      title: isSpanish ? "Establecimiento de Objetivos" : "Goal Setting",
      description: isSpanish ? "Define y alcanza tus metas" : "Define and achieve your goals",
      icon: <Target className="w-6 h-6 text-orange-500" />
    }
  ];

  const resources = [
    {
      title: isSpanish ? "Evaluación de Carrera" : "Career Assessment",
      description: isSpanish ? "Descubre tus fortalezas y áreas de mejora" : "Discover your strengths and areas for improvement",
      type: "assessment"
    },
    {
      title: isSpanish ? "Plantillas de CV" : "Resume Templates",
      description: isSpanish ? "Plantillas profesionales para tu CV" : "Professional templates for your resume",
      type: "templates"
    },
    {
      title: isSpanish ? "Guías de Entrevista" : "Interview Guides",
      description: isSpanish ? "Prepárate para entrevistas exitosas" : "Prepare for successful interviews",
      type: "guides"
    },
    {
      title: isSpanish ? "Planificador de Objetivos" : "Goal Planner",
      description: isSpanish ? "Herramienta para planificar tus objetivos" : "Tool to plan your career goals",
      type: "planner"
    }
  ];

  const upcomingEvents = [
    {
      title: isSpanish ? "Taller de Networking" : "Networking Workshop",
      date: isSpanish ? "15 Ene, 2:00 PM" : "Jan 15, 2:00 PM",
      type: isSpanish ? "Taller" : "Workshop"
    },
    {
      title: isSpanish ? "Sesión de CV 1:1" : "1:1 Resume Session",
      date: isSpanish ? "18 Ene, 10:00 AM" : "Jan 18, 10:00 AM",
      type: isSpanish ? "Consulta" : "Consultation"
    },
    {
      title: isSpanish ? "Entrenamiento de Entrevistas" : "Interview Training",
      date: isSpanish ? "22 Ene, 3:00 PM" : "Jan 22, 3:00 PM",
      type: isSpanish ? "Entrenamiento" : "Training"
    }
  ];

  return (
    <Page title={isSpanish ? "Orientación Profesional" : "Career Coaching"}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <TrendingUp className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isSpanish ? "Orientación Profesional" : "Career Coaching"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? "Acelera tu crecimiento profesional con coaching personalizado, recursos de desarrollo y herramientas de planificación de carrera."
              : "Accelerate your professional growth with personalized coaching, development resources, and career planning tools."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {coachingAreas.map((area, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {area.icon}
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{area.description}</p>
                <Button size="sm" className="w-full">
                  {isSpanish ? "Comenzar" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-500" />
                  {isSpanish ? "Recursos de Carrera" : "Career Resources"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <h4 className="font-semibold text-gray-800 mb-2">{resource.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <Button size="sm" variant="outline">
                        {isSpanish ? "Acceder" : "Access"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-indigo-500" />
                  {isSpanish ? "Próximos Eventos" : "Upcoming Events"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-800">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.date}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {event.type}
                      </span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  {isSpanish ? "Ver Todos los Eventos" : "View All Events"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                  {isSpanish ? "Coaching 1:1" : "1:1 Coaching"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {isSpanish 
                    ? "Reserva una sesión personalizada con nuestros coaches profesionales."
                    : "Book a personalized session with our professional coaches."
                  }
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  {isSpanish ? "Reservar Sesión" : "Book Session"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              {isSpanish ? "Tu Plan de Desarrollo" : "Your Development Plan"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <p className="text-gray-600">
                  {isSpanish ? "Objetivos completados" : "Goals completed"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <p className="text-gray-600">
                  {isSpanish ? "Progreso del plan" : "Plan progress"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
                <p className="text-gray-600">
                  {isSpanish ? "Sesiones programadas" : "Sessions scheduled"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};

export default CareerCoaching;
