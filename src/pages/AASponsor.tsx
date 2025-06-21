
import React, { useState } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, MessageCircle, Calendar, Phone, Heart, Shield } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const AASponsor = () => {
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState("connect");

  const sponsorshipSteps = [
    {
      title: isSpanish ? "Encontrar un Padrino" : "Finding a Sponsor",
      description: isSpanish ? "Consejos para encontrar el padrino adecuado" : "Tips for finding the right sponsor",
      icon: <Users className="w-6 h-6 text-blue-500" />
    },
    {
      title: isSpanish ? "Primera Reunión" : "First Meeting",
      description: isSpanish ? "Qué esperar en tu primera reunión" : "What to expect in your first meeting",
      icon: <MessageCircle className="w-6 h-6 text-green-500" />
    },
    {
      title: isSpanish ? "Trabajo de Pasos" : "Step Work",
      description: isSpanish ? "Guía para trabajar los 12 pasos" : "Guide to working the 12 steps",
      icon: <Calendar className="w-6 h-6 text-purple-500" />
    },
    {
      title: isSpanish ? "Apoyo Continuo" : "Ongoing Support",
      description: isSpanish ? "Mantener una relación saludable" : "Maintaining a healthy relationship",
      icon: <Heart className="w-6 h-6 text-red-500" />
    }
  ];

  const emergencyContacts = [
    {
      name: isSpanish ? "Línea de Crisis AA" : "AA Crisis Line",
      number: "1-800-923-8722",
      available: isSpanish ? "24/7" : "24/7"
    },
    {
      name: isSpanish ? "Línea de Crisis NA" : "NA Crisis Line", 
      number: "1-818-773-9999",
      available: isSpanish ? "24/7" : "24/7"
    }
  ];

  return (
    <Page title={isSpanish ? "Padrino AA/NA" : "AA/NA Sponsor"}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isSpanish ? "Apoyo de Padrino AA/NA" : "AA/NA Sponsor Support"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? "Conecta con recursos de padrinazgo, herramientas de comunicación y apoyo para tu viaje de recuperación."
              : "Connect with sponsorship resources, communication tools, and support for your recovery journey."
            }
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant={activeTab === "connect" ? "default" : "outline"}
            onClick={() => setActiveTab("connect")}
          >
            {isSpanish ? "Conectar" : "Connect"}
          </Button>
          <Button 
            variant={activeTab === "steps" ? "default" : "outline"}
            onClick={() => setActiveTab("steps")}
          >
            {isSpanish ? "Trabajo de Pasos" : "Step Work"}
          </Button>
          <Button 
            variant={activeTab === "resources" ? "default" : "outline"}
            onClick={() => setActiveTab("resources")}
          >
            {isSpanish ? "Recursos" : "Resources"}
          </Button>
          <Button 
            variant={activeTab === "emergency" ? "default" : "outline"}
            onClick={() => setActiveTab("emergency")}
          >
            {isSpanish ? "Emergencia" : "Emergency"}
          </Button>
        </div>

        {activeTab === "connect" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-500" />
                  {isSpanish ? "Encontrar un Padrino" : "Find a Sponsor"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder={isSpanish ? "Tu ubicación" : "Your location"} />
                  <Input placeholder={isSpanish ? "Programa preferido (AA/NA)" : "Preferred program (AA/NA)"} />
                  <Button className="w-full">
                    {isSpanish ? "Buscar Padrinos Disponibles" : "Search Available Sponsors"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                  {isSpanish ? "Comunicación con Padrino" : "Sponsor Communication"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea placeholder={isSpanish ? "Mensaje para tu padrino..." : "Message to your sponsor..."} />
                  <Button className="w-full">
                    {isSpanish ? "Enviar Mensaje" : "Send Message"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "steps" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {step.icon}
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <Button size="sm" className="w-full">
                    {isSpanish ? "Aprender Más" : "Learn More"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{isSpanish ? "Reuniones Locales" : "Local Meetings"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {isSpanish ? "Encuentra reuniones AA/NA cerca de ti" : "Find AA/NA meetings near you"}
                </p>
                <Button className="w-full">
                  {isSpanish ? "Buscar Reuniones" : "Find Meetings"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isSpanish ? "Literatura" : "Literature"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {isSpanish ? "Accede a libros y materiales de recuperación" : "Access recovery books and materials"}
                </p>
                <Button className="w-full">
                  {isSpanish ? "Ver Literatura" : "View Literature"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isSpanish ? "Seguimiento Diario" : "Daily Tracker"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {isSpanish ? "Rastrea tu progreso diario de sobriedad" : "Track your daily sobriety progress"}
                </p>
                <Button className="w-full">
                  {isSpanish ? "Abrir Seguimiento" : "Open Tracker"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "emergency" && (
          <div className="space-y-6">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Phone className="w-6 h-6" />
                  {isSpanish ? "Contactos de Emergencia" : "Emergency Contacts"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg border">
                      <div>
                        <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{isSpanish ? "Disponible" : "Available"}: {contact.available}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {contact.number}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Page>
  );
};

export default AASponsor;
