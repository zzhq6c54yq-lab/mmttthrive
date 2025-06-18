
import React, { useState } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lotus, Play, Pause, Clock, Heart, Brain, Leaf } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const MeditationStudio = () => {
  const { isSpanish } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSession, setCurrentSession] = useState<string | null>(null);

  const meditationCategories = [
    {
      title: isSpanish ? "Mindfulness" : "Mindfulness",
      description: isSpanish ? "Atención plena y consciencia del momento presente" : "Present moment awareness and mindful attention",
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      sessions: 12
    },
    {
      title: isSpanish ? "Relajación" : "Relaxation",
      description: isSpanish ? "Técnicas de relajación profunda y alivio del estrés" : "Deep relaxation techniques and stress relief",
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      sessions: 8
    },
    {
      title: isSpanish ? "Sueño" : "Sleep",
      description: isSpanish ? "Meditaciones guiadas para un mejor descanso" : "Guided meditations for better sleep",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      sessions: 10
    },
    {
      title: isSpanish ? "Autocompasión" : "Self-Compassion",
      description: isSpanish ? "Cultiva el amor propio y la aceptación" : "Cultivate self-love and acceptance",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      sessions: 6
    }
  ];

  const featuredSessions = [
    {
      title: isSpanish ? "Respiración para Principiantes" : "Beginner's Breathing",
      duration: "10 min",
      difficulty: isSpanish ? "Principiante" : "Beginner"
    },
    {
      title: isSpanish ? "Escaneo Corporal" : "Body Scan",
      duration: "20 min",
      difficulty: isSpanish ? "Intermedio" : "Intermediate"
    },
    {
      title: isSpanish ? "Meditación de Gratitud" : "Gratitude Meditation",
      duration: "15 min",
      difficulty: isSpanish ? "Todos los niveles" : "All Levels"
    }
  ];

  const handlePlayPause = (sessionTitle: string) => {
    if (currentSession === sessionTitle && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentSession(sessionTitle);
      setIsPlaying(true);
    }
  };

  return (
    <Page title={isSpanish ? "Estudio de Meditación" : "Meditation Studio"}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <Lotus className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isSpanish ? "Estudio de Meditación" : "Meditation Studio"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? "Descubre la paz interior con nuestras meditaciones guiadas, técnicas de respiración y prácticas de mindfulness."
              : "Discover inner peace with our guided meditations, breathing techniques, and mindfulness practices."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {meditationCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {category.sessions} {isSpanish ? "sesiones" : "sessions"}
                  </span>
                  <Button size="sm">
                    {isSpanish ? "Explorar" : "Explore"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {isSpanish ? "Sesiones Destacadas" : "Featured Sessions"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">{session.title}</h4>
                      <p className="text-sm text-gray-600">{session.duration} • {session.difficulty}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePlayPause(session.title)}
                      className="flex items-center gap-2"
                    >
                      {currentSession === session.title && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      {currentSession === session.title && isPlaying 
                        ? (isSpanish ? "Pausar" : "Pause")
                        : (isSpanish ? "Reproducir" : "Play")
                      }
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {isSpanish ? "Tu Progreso" : "Your Progress"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">7</div>
                  <p className="text-gray-600">
                    {isSpanish ? "Días de racha" : "Day streak"}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">42</div>
                  <p className="text-gray-600">
                    {isSpanish ? "Minutos esta semana" : "Minutes this week"}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {isSpanish ? "Próximo Objetivo" : "Next Goal"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isSpanish 
                      ? "Medita 5 días seguidos para desbloquear nuevas sesiones"
                      : "Meditate 5 days in a row to unlock new sessions"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default MeditationStudio;
