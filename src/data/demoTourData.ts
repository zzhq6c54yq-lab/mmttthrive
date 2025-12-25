import { Calendar, Bot, Heart, Sparkles, Rocket } from 'lucide-react';

export interface DemoTourStep {
  id: string;
  icon: React.ElementType;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  highlights?: string[];
  highlightsEs?: string[];
}

export const demoTourSteps: DemoTourStep[] = [
  {
    id: 'welcome',
    icon: Sparkles,
    title: 'Welcome to Thrive MT Demo',
    titleEs: 'Bienvenido a la Demo de Thrive MT',
    description: 'Experience our mental wellness platform with sample data. Everything you see is for demonstration purposes—your real journey begins when you sign up!',
    descriptionEs: '¡Experimenta nuestra plataforma de bienestar mental con datos de muestra. Todo lo que ves es para demostración—tu viaje real comienza cuando te registres!',
    highlights: ['Explore all features freely', 'No account required', 'Sample data provided'],
    highlightsEs: ['Explora todas las funciones libremente', 'No se requiere cuenta', 'Datos de muestra incluidos']
  },
  {
    id: 'daily-plan',
    icon: Calendar,
    title: 'Your Daily Wellness Plan',
    titleEs: 'Tu Plan de Bienestar Diario',
    description: 'Your personalized daily activities help build healthy habits. Complete tasks, track your progress, and build streaks to stay motivated.',
    descriptionEs: 'Tus actividades diarias personalizadas ayudan a crear hábitos saludables. Completa tareas, sigue tu progreso y construye rachas para mantenerte motivado.',
    highlights: ['Personalized activities', 'Progress tracking', 'Streak rewards'],
    highlightsEs: ['Actividades personalizadas', 'Seguimiento de progreso', 'Recompensas por racha']
  },
  {
    id: 'henry',
    icon: Bot,
    title: 'Meet Henry, Your AI Companion',
    titleEs: 'Conoce a Henry, Tu Compañero IA',
    description: 'Henry is your supportive AI wellness companion. Chat anytime for guidance, coping strategies, or just to talk through how you\'re feeling.',
    descriptionEs: 'Henry es tu compañero de bienestar IA. Chatea en cualquier momento para obtener orientación, estrategias de afrontamiento, o simplemente para hablar sobre cómo te sientes.',
    highlights: ['24/7 availability', 'Personalized support', 'Evidence-based guidance'],
    highlightsEs: ['Disponible 24/7', 'Apoyo personalizado', 'Orientación basada en evidencia']
  },
  {
    id: 'mood-tracking',
    icon: Heart,
    title: 'Mood & Progress Tracking',
    titleEs: 'Seguimiento de Ánimo y Progreso',
    description: 'Daily check-ins help you understand your emotional patterns. Track your mood, identify triggers, and celebrate your wellness journey.',
    descriptionEs: 'Los chequeos diarios te ayudan a entender tus patrones emocionales. Rastrea tu ánimo, identifica desencadenantes y celebra tu viaje de bienestar.',
    highlights: ['Daily mood check-ins', 'Pattern insights', 'Progress visualization'],
    highlightsEs: ['Chequeos diarios de ánimo', 'Perspectivas de patrones', 'Visualización de progreso']
  },
  {
    id: 'get-started',
    icon: Rocket,
    title: 'Ready to Start Your Journey?',
    titleEs: '¿Listo para Comenzar Tu Viaje?',
    description: 'You\'ve seen what Thrive MT can do. Sign up today to create your personalized wellness plan and start building healthier habits.',
    descriptionEs: 'Has visto lo que Thrive MT puede hacer. Regístrate hoy para crear tu plan de bienestar personalizado y comienza a construir hábitos más saludables.',
    highlights: ['Free to get started', 'Personalized for you', 'Join our community'],
    highlightsEs: ['Gratis para comenzar', 'Personalizado para ti', 'Únete a nuestra comunidad']
  }
];
