import React from 'react';
import SpecializedProgramWelcome from '@/components/specialized-programs/SpecializedProgramWelcome';
import { Heart } from 'lucide-react';

const SingleParentsWelcome: React.FC = () => {
  const whatToExpect = [
    "Specialized assessments for single parent stress and burnout",
    "Time management strategies for parents juggling multiple responsibilities",
    "Self-care resources tailored for limited schedules",
    "Financial wellness tools to reduce money-related anxiety",
    "Co-parenting communication strategies and conflict resolution",
    "Support groups connecting you with other single parents",
    "Child development resources and parenting guidance",
    "Work-life integration workshops for working single parents"
  ];

  const whatToExpectSpanish = [
    "Evaluaciones especializadas para el estrés y agotamiento de padres solteros",
    "Estrategias de gestión del tiempo para padres que hacen malabares con múltiples responsabilidades",
    "Recursos de autocuidado adaptados para horarios limitados",
    "Herramientas de bienestar financiero para reducir la ansiedad relacionada con el dinero",
    "Estrategias de comunicación de co-parentalidad y resolución de conflictos",
    "Grupos de apoyo que te conectan con otros padres solteros",
    "Recursos de desarrollo infantil y orientación para padres",
    "Talleres de integración trabajo-vida para padres solteros que trabajan"
  ];

  return (
    <SpecializedProgramWelcome
      title="Single Parent Wellness Program"
      description="A comprehensive mental health and wellness program designed specifically for single parents navigating the unique challenges of solo parenting while maintaining their own wellbeing."
      whatToExpect={whatToExpect}
      color="rose-600"
      gradientFrom="rose-500"
      gradientTo="pink-700"
      borderColor="#f43f5e"
      portalPath="/single-parents-portal"
      icon={<Heart className="h-12 w-12 text-white" />}
      coverImage="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1280&q=80"
      motivationalMessage="You're not just surviving—you're building a legacy of resilience. Your strength in managing everything alone doesn't mean you have to face your wellness journey alone. This program is designed to support you, celebrate you, and remind you that taking care of yourself makes you a better parent."
    />
  );
};

export default SingleParentsWelcome;
