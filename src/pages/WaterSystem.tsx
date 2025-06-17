
import React from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Users, Award, TrendingUp } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const WaterSystem = () => {
  const { isSpanish } = useTranslation();

  return (
    <Page title={isSpanish ? "Sistema de Agua" : "Water System"}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <Droplets className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isSpanish ? "Sistema de Agua Thrive" : "Thrive Water System"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? "Un enfoque innovador para el bienestar a través de la hidratación consciente y el seguimiento del consumo de agua."
              : "An innovative approach to wellness through mindful hydration and water consumption tracking."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-6 h-6 text-blue-500" />
                {isSpanish ? "Seguimiento Diario" : "Daily Tracking"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {isSpanish 
                  ? "Registra tu consumo diario de agua y recibe recordatorios personalizados."
                  : "Track your daily water intake and receive personalized reminders."
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-500" />
                {isSpanish ? "Desafíos Comunitarios" : "Community Challenges"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {isSpanish 
                  ? "Participa en desafíos de hidratación con otros miembros de la comunidad."
                  : "Participate in hydration challenges with other community members."
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                {isSpanish ? "Logros y Recompensas" : "Achievements & Rewards"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {isSpanish 
                  ? "Gana insignias y recompensas por mantener buenos hábitos de hidratación."
                  : "Earn badges and rewards for maintaining good hydration habits."
                }
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-blue-800">
              {isSpanish ? "Próximamente" : "Coming Soon"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-blue-700 text-lg">
              {isSpanish 
                ? "El Sistema de Agua Thrive estará disponible pronto. ¡Mantente atento para más actualizaciones!"
                : "The Thrive Water System will be available soon. Stay tuned for more updates!"
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};

export default WaterSystem;
