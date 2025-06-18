
import React, { useState } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Clock, TrendingUp, Calendar, Target, Award } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const SleepTracker = () => {
  const { isSpanish } = useTranslation();
  const [sleepHours, setSleepHours] = useState(7);

  const sleepTips = [
    {
      title: isSpanish ? "Rutina Nocturna" : "Bedtime Routine",
      description: isSpanish ? "Establece una rutina relajante antes de dormir" : "Create a relaxing bedtime routine"
    },
    {
      title: isSpanish ? "Ambiente Optimal" : "Sleep Environment",
      description: isSpanish ? "Mantén tu habitación fresca, oscura y silenciosa" : "Keep your room cool, dark, and quiet"
    },
    {
      title: isSpanish ? "Horario Consistente" : "Consistent Schedule",
      description: isSpanish ? "Ve a dormir y despierta a la misma hora cada día" : "Go to bed and wake up at the same time daily"
    }
  ];

  return (
    <Page title={isSpanish ? "Seguimiento del Sueño" : "Sleep Tracker"}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <Moon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isSpanish ? "Seguimiento del Sueño" : "Sleep Tracker"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? "Mejora tu calidad de sueño con herramientas de seguimiento, análisis y consejos personalizados."
              : "Improve your sleep quality with tracking tools, analysis, and personalized recommendations."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-500" />
                {isSpanish ? "Registro de Sueño" : "Sleep Log"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {isSpanish 
                  ? "Registra tus horas de sueño diarias y patrones."
                  : "Track your daily sleep hours and patterns."
                }
              </p>
              <div className="flex items-center gap-2 mb-4">
                <label className="text-sm font-medium">
                  {isSpanish ? "Horas de sueño:" : "Sleep hours:"}
                </label>
                <input 
                  type="number" 
                  value={sleepHours} 
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                  className="w-16 px-2 py-1 border rounded"
                  min="0" 
                  max="24"
                />
              </div>
              <Button className="w-full">
                {isSpanish ? "Registrar Sueño" : "Log Sleep"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
                {isSpanish ? "Análisis de Patrones" : "Pattern Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {isSpanish 
                  ? "Analiza tus tendencias de sueño y recibe insights personalizados."
                  : "Analyze your sleep trends and get personalized insights."
                }
              </p>
              <div className="mt-4">
                <div className="text-2xl font-bold text-blue-600">{sleepHours}h</div>
                <div className="text-sm text-gray-500">
                  {isSpanish ? "Promedio semanal" : "Weekly average"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-500" />
                {isSpanish ? "Objetivos" : "Sleep Goals"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {isSpanish 
                  ? "Establece y sigue objetivos de sueño saludables."
                  : "Set and track healthy sleep goals."
                }
              </p>
              <div className="mt-4">
                <div className="text-2xl font-bold text-purple-600">8h</div>
                <div className="text-sm text-gray-500">
                  {isSpanish ? "Objetivo diario" : "Daily target"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                {isSpanish ? "Consejos para Mejor Sueño" : "Sleep Improvement Tips"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sleepTips.map((tip, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-indigo-500" />
                {isSpanish ? "Calendario de Sueño" : "Sleep Calendar"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {isSpanish 
                  ? "Visualiza tus patrones de sueño en un calendario mensual."
                  : "Visualize your sleep patterns in a monthly calendar."
                }
              </p>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg text-center">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {isSpanish ? "Vista de calendario próximamente" : "Calendar view coming soon"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default SleepTracker;
