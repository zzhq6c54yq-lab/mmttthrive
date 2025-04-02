import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, ChevronLeft, ChevronRight, X, Award, Bell, CheckCircle,
  Brain, Library, Users, Heart, GraduationCap, CalendarRange, LeafyGreen,
  ListChecks, Video, Puzzle, HeartHandshake, Headphones, Coffee, Moon,
  HandHeart, Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  highlight?: string;
  icon?: React.ReactNode;
}

interface FeatureTutorialProps {
  featureId: string;
  onClose: () => void;
  embedded?: boolean;
}

const FeatureTutorial: React.FC<FeatureTutorialProps> = ({ 
  featureId, 
  onClose,
  embedded = false
}) => {
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialSteps, setTutorialSteps] = useState<TutorialStep[]>([]);
  const location = useLocation();
  const { toast } = useToast();

  // Get the preferred language for translations
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';

  // Load tutorial steps based on the feature
  useEffect(() => {
    const getTutorialForFeature = () => {
      // Default tutorial steps for any feature
      const defaultSteps: TutorialStep[] = [
        {
          title: getTranslatedText('welcomeTitle', featureId),
          description: getTranslatedText('introDescription', featureId),
          image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png",
          icon: <Lightbulb className="h-12 w-12 text-amber-400" />
        }
      ];

      // Feature-specific tutorial steps
      switch (featureId) {
        case "wellness-challenges":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "challenges-overview",
              icon: <ListChecks className="h-12 w-12 text-green-400" />
            },
            {
              title: getTranslatedText('pointsTitle', featureId),
              description: getTranslatedText('pointsDescription', featureId),
              highlight: "points-system",
              icon: <Award className="h-12 w-12 text-amber-400" />
            },
            {
              title: getTranslatedText('categoriesTitle', featureId),
              description: getTranslatedText('categoriesDescription', featureId),
              highlight: "challenge-categories",
              icon: <Target className="h-12 w-12 text-blue-400" />
            },
            {
              title: getTranslatedText('completingTitle', featureId),
              description: getTranslatedText('completingDescription', featureId),
              highlight: "complete-challenge",
              icon: <CheckCircle className="h-12 w-12 text-green-400" />
            },
            {
              title: getTranslatedText('redeemingTitle', featureId),
              description: getTranslatedText('redeemingDescription', featureId),
              highlight: "redeem-points",
              icon: <Award className="h-12 w-12 text-amber-400" />
            },
            {
              title: getTranslatedText('remindersTitle', featureId),
              description: getTranslatedText('remindersDescription', featureId),
              highlight: "reminders",
              icon: <Bell className="h-12 w-12 text-indigo-400" />
            }
          ];
        case "copay-credits":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "credits-overview",
              icon: <Award className="h-12 w-12 text-amber-400" />
            },
            {
              title: getTranslatedText('earningTitle', featureId),
              description: getTranslatedText('earningDescription', featureId),
              highlight: "earning-credits",
              icon: <Award className="h-12 w-12 text-amber-400" />
            },
            {
              title: getTranslatedText('usingTitle', featureId),
              description: getTranslatedText('usingDescription', featureId),
              highlight: "using-credits",
              icon: <HandHeart className="h-12 w-12 text-pink-400" />
            }
          ];
        case "real-time-therapy":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "therapy-overview",
              icon: <GraduationCap className="h-12 w-12 text-indigo-400" />
            },
            {
              title: getTranslatedText('sessionTitle', featureId),
              description: getTranslatedText('sessionDescription', featureId),
              highlight: "booking-session",
              icon: <CalendarRange className="h-12 w-12 text-blue-400" />
            },
            {
              title: getTranslatedText('paymentTitle', featureId),
              description: getTranslatedText('paymentDescription', featureId),
              highlight: "payment-options",
              icon: <Award className="h-12 w-12 text-amber-400" />
            }
          ];
        case "community-support":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "community-overview",
              icon: <Users className="h-12 w-12 text-indigo-400" />
            },
            {
              title: getTranslatedText('groupsTitle', featureId),
              description: getTranslatedText('groupsDescription', featureId),
              highlight: "support-groups",
              icon: <Users className="h-12 w-12 text-indigo-400" />
            },
            {
              title: getTranslatedText('postingTitle', featureId),
              description: getTranslatedText('postingDescription', featureId),
              highlight: "posting-guidelines",
              icon: <Heart className="h-12 w-12 text-pink-400" />
            }
          ];
        case "resource-library":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "resources-overview",
              icon: <Library className="h-12 w-12 text-indigo-400" />
            },
            {
              title: getTranslatedText('searchingTitle', featureId),
              description: getTranslatedText('searchingDescription', featureId),
              highlight: "search-filter",
              icon: <Library className="h-12 w-12 text-indigo-400" />
            },
            {
              title: getTranslatedText('savingTitle', featureId),
              description: getTranslatedText('savingDescription', featureId),
              highlight: "save-resources",
              icon: <Heart className="h-12 w-12 text-pink-400" />
            }
          ];
        case "dashboard":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "dashboard-overview",
              icon: <Target className="h-12 w-12 text-blue-400" />
            },
            {
              title: getTranslatedText('widgetsTitle', featureId),
              description: getTranslatedText('widgetsDescription', featureId),
              highlight: "dashboard-widgets",
              icon: <Puzzle className="h-12 w-12 text-green-400" />
            },
            {
              title: getTranslatedText('dailyChallengesTitle', featureId),
              description: getTranslatedText('dailyChallengesDescription', featureId),
              highlight: "daily-challenges",
              icon: <ListChecks className="h-12 w-12 text-green-400" />
            },
            {
              title: getTranslatedText('gratitudeTitle', featureId),
              description: getTranslatedText('gratitudeDescription', featureId),
              highlight: "gratitude-visualizer",
              icon: <Heart className="h-12 w-12 text-pink-400" />
            },
            {
              title: getTranslatedText('videoDiaryTitle', featureId),
              description: getTranslatedText('videoDiaryDescription', featureId),
              highlight: "video-diary",
              icon: <Video className="h-12 w-12 text-blue-400" />
            },
            {
              title: getTranslatedText('appointmentsTitle', featureId),
              description: getTranslatedText('appointmentsDescription', featureId),
              highlight: "appointments",
              icon: <CalendarRange className="h-12 w-12 text-blue-400" />
            },
            {
              title: getTranslatedText('insightsTitle', featureId),
              description: getTranslatedText('insightsDescription', featureId),
              highlight: "insights",
              icon: <Brain className="h-12 w-12 text-purple-400" />
            },
            {
              title: getTranslatedText('workshopsTitle', featureId),
              description: getTranslatedText('workshopsDescription', featureId),
              highlight: "workshops",
              icon: <CalendarRange className="h-12 w-12 text-blue-400" />
            },
            {
              title: getTranslatedText('keyFeaturesTitle', featureId),
              description: getTranslatedText('keyFeaturesDescription', featureId),
              highlight: "key-features",
              icon: <Lightbulb className="h-12 w-12 text-amber-400" />
            },
            {
              title: getTranslatedText('navigationTitle', featureId),
              description: getTranslatedText('navigationDescription', featureId),
              highlight: "navigation",
              icon: <Target className="h-12 w-12 text-blue-400" />
            }
          ];
        case "video-diary":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "video-diary-overview",
              icon: <Video className="h-12 w-12 text-blue-400" />
            }
          ];
        case "mindfulness":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "mindfulness-overview",
              icon: <Moon className="h-12 w-12 text-indigo-400" />
            }
          ];
        case "journaling":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "journaling-overview",
              icon: <Heart className="h-12 w-12 text-pink-400" />
            }
          ];
        case "binaural-beats":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "binaural-beats-overview",
              icon: <Headphones className="h-12 w-12 text-purple-400" />
            }
          ];
        case "lifestyle-integration":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "lifestyle-integration-overview",
              icon: <Coffee className="h-12 w-12 text-brown-400" />
            }
          ];
        case "mental-wellness-tools":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "mental-wellness-tools-overview",
              icon: <LeafyGreen className="h-12 w-12 text-green-400" />
            }
          ];
        case "my-sponsor":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "my-sponsor-overview",
              icon: <HeartHandshake className="h-12 w-12 text-red-400" />
            }
          ];
        default:
          return defaultSteps;
      }
    };

    setTutorialSteps(getTutorialForFeature());
  }, [featureId, preferredLanguage]);

  const getTranslatedText = (type: string, feature: string) => {
    const translations: Record<string, Record<string, Record<string, string>>> = {
      'welcomeTitle': {
        'wellness-challenges': {
          'English': 'Welcome to Wellness Challenges',
          'Español': 'Bienvenido a los Desafíos de Bienestar'
        },
        'copay-credits': {
          'English': 'Welcome to Co-Pay Credits',
          'Español': 'Bienvenido a Créditos de Copago'
        },
        'dashboard': {
          'English': 'Welcome to Your Dashboard',
          'Español': 'Bienvenido a tu Panel'
        },
        'real-time-therapy': {
          'English': 'Welcome to Real-Time Therapy',
          'Español': 'Bienvenido a Terapia en Tiempo Real'
        },
        'community-support': {
          'English': 'Welcome to Community Support',
          'Español': 'Bienvenido a Apoyo Comunitario'
        },
        'resource-library': {
          'English': 'Welcome to Resource Library',
          'Español': 'Bienvenido a la Biblioteca de Recursos'
        },
        'video-diary': {
          'English': 'Welcome to Video Diary',
          'Español': 'Bienvenido al Diario en Video'
        },
        'mindfulness': {
          'English': 'Welcome to Mindfulness & Sleep',
          'Español': 'Bienvenido a Atención Plena y Sueño'
        },
        'journaling': {
          'English': 'Welcome to Journaling',
          'Español': 'Bienvenido a Diario Personal'
        },
        'binaural-beats': {
          'English': 'Welcome to Binaural Beats',
          'Español': 'Bienvenido a Ritmos Binaurales'
        },
        'lifestyle-integration': {
          'English': 'Welcome to Lifestyle Integration',
          'Español': 'Bienvenido a Integración de Estilo de Vida'
        },
        'mental-wellness-tools': {
          'English': 'Welcome to Mental Wellness Tools',
          'Español': 'Bienvenido a Herramientas de Bienestar Mental'
        },
        'my-sponsor': {
          'English': 'Welcome to My Sponsor',
          'Español': 'Bienvenido a Mi Patrocinador'
        }
      },
      'introDescription': {
        'wellness-challenges': {
          'English': "I'm Henry, and I'll guide you through the Wellness Challenges feature.",
          'Español': "Soy Henry, y te guiaré a través de la función de Desafíos de Bienestar."
        },
        'dashboard': {
          'English': "I'm Henry, and I'll guide you through your personalized dashboard.",
          'Español': "Soy Henry, y te guiaré a través de tu panel personalizado."
        },
        'real-time-therapy': {
          'English': "I'm Henry, and I'll guide you through the Real-Time Therapy options.",
          'Español': "Soy Henry, y te guiaré a través de las opciones de Terapia en Tiempo Real."
        },
        'community-support': {
          'English': "I'm Henry, and I'll guide you through our Community Support features.",
          'Español': "Soy Henry, y te guiaré a través de nuestras características de Apoyo Comunitario."
        },
        'resource-library': {
          'English': "I'm Henry, and I'll guide you through our Resource Library.",
          'Español': "Soy Henry, y te guiaré a través de nuestra Biblioteca de Recursos."
        },
        'copay-credits': {
          'English': "I'm Henry, and I'll guide you through the Co-Pay Credits system.",
          'Español': "Soy Henry, y te guiaré a través del sistema de Créditos de Copago."
        },
        'video-diary': {
          'English': "I'm Henry, and I'll guide you through the Video Diary feature.",
          'Español': "Soy Henry, y te guiaré a través de la función de Diario en Video."
        },
        'mindfulness': {
          'English': "I'm Henry, and I'll guide you through our Mindfulness & Sleep features.",
          'Español': "Soy Henry, y te guiaré a través de nuestras funciones de Atención Plena y Sueño."
        },
        'journaling': {
          'English': "I'm Henry, and I'll guide you through the Journaling feature.",
          'Español': "Soy Henry, y te guiaré a través de la función de Diario Personal."
        },
        'binaural-beats': {
          'English': "I'm Henry, and I'll guide you through our Binaural Beats therapy.",
          'Español': "Soy Henry, y te guiaré a través de nuestra terapia de Ritmos Binaurales."
        },
        'lifestyle-integration': {
          'English': "I'm Henry, and I'll guide you through Lifestyle Integration features.",
          'Español': "Soy Henry, y te guiaré a través de las funciones de Integración de Estilo de Vida."
        },
        'mental-wellness-tools': {
          'English': "I'm Henry, and I'll guide you through our Mental Wellness Tools.",
          'Español': "Soy Henry, y te guiaré a través de nuestras Herramientas de Bienestar Mental."
        },
        'my-sponsor': {
          'English': "I'm Henry, and I'll guide you through the My Sponsor feature.",
          'Español': "Soy Henry, y te guiaré a través de la función de Mi Patrocinador."
        }
      },
      'featureTitle': {
        'wellness-challenges': {
          'English': 'Wellness Challenges',
          'Español': 'Desafíos de Bienestar'
        },
        'copay-credits': {
          'English': 'Co-Pay Credits System',
          'Español': 'Sistema de Créditos de Copago'
        },
        'dashboard': {
          'English': 'Your Dashboard',
          'Español': 'Tu Panel'
        },
        'real-time-therapy': {
          'English': 'Real-Time Therapy',
          'Español': 'Terapia en Tiempo Real'
        },
        'community-support': {
          'English': 'Community Support',
          'Español': 'Apoyo Comunitario'
        },
        'resource-library': {
          'English': 'Resource Library',
          'Español': 'Biblioteca de Recursos'
        },
        'video-diary': {
          'English': 'Video Diary',
          'Español': 'Diario en Video'
        },
        'mindfulness': {
          'English': 'Mindfulness & Sleep',
          'Español': 'Atención Plena y Sueño'
        },
        'journaling': {
          'English': 'Journaling',
          'Español': 'Diario Personal'
        },
        'binaural-beats': {
          'English': 'Binaural Beats',
          'Español': 'Ritmos Binaurales'
        },
        'lifestyle-integration': {
          'English': 'Lifestyle Integration',
          'Español': 'Integración de Estilo de Vida'
        },
        'mental-wellness-tools': {
          'English': 'Mental Wellness Tools',
          'Español': 'Herramientas de Bienestar Mental'
        },
        'my-sponsor': {
          'English': 'My Sponsor',
          'Español': 'Mi Patrocinador'
        }
      },
      'mainDescription': {
        'wellness-challenges': {
          'English': 'Complete daily challenges to improve your mental health and earn points towards co-pay credits.',
          'Español': 'Completa desafíos diarios para mejorar tu salud mental y ganar puntos para créditos de copago.'
        },
        'copay-credits': {
          'English': 'Earn and use credits to reduce the cost of your therapy sessions.',
          'Español': 'Gana y usa créditos para reducir el costo de tus sesiones de terapia.'
        },
        'dashboard': {
          'English': 'Your dashboard provides a quick overview of your progress and upcoming appointments.',
          'Español': 'Tu panel proporciona una visión rápida de tu progreso y próximas citas.'
        },
        'real-time-therapy': {
          'English': 'Connect with licensed therapists instantly when you need support.',
          'Español': 'Conéctate con terapeutas licenciados al instante cuando necesites apoyo.'
        },
        'community-support': {
          'English': 'Connect with others facing similar challenges in a safe, moderated environment.',
          'Español': 'Conéctate con otros que enfrentan desafíos similares en un entorno seguro y moderado.'
        },
        'resource-library': {
          'English': 'Access a wide range of mental health resources, articles, and tools.',
          'Español': 'Accede a una amplia gama de recursos, artículos y herramientas de salud mental.'
        },
        'video-diary': {
          'English': 'Record video messages to track your journey or share with your therapist.',
          'Español': 'Graba mensajes de video para seguir tu viaje o compartir con tu terapeuta.'
        },
        'mindfulness': {
          'English': 'Record and visualize things you are grateful for to improve mental wellbeing.',
          'Español': 'Registra y visualiza las cosas por las que estás agradecido para mejorar el bienestar mental.'
        },
        'journaling': {
          'English': 'Record your thoughts and feelings to improve your mental health.',
          'Español': 'Registra tus pensamientos y sentimientos para mejorar tu salud mental.'
        },
        'binaural-beats': {
          'English': 'Listen to binaural beats to improve your mood and focus.',
          'Español': 'Escucha ritmos binaurales para mejorar tu estado de ánimo y concentración.'
        },
        'lifestyle-integration': {
          'English': 'Explore ways to integrate healthy habits into your daily life.',
          'Español': 'Explora formas de integrar hábitos saludables en tu vida diaria.'
        },
        'mental-wellness-tools': {
          'English': 'Use tools to support your mental health and well-being.',
          'Español': 'Usa herramientas para apoyar tu salud mental y bienestar.'
        },
        'my-sponsor': {
          'English': 'Learn about your sponsor and how they can support you.',
          'Español': 'Aprende sobre tu patrocinador y cómo pueden apoyarte.'
        }
      },
      'pointsTitle': {
        'wellness-challenges': {
          'English': 'Points System',
          'Español': 'Sistema de Puntos'
        }
      },
      'pointsDescription': {
        'wellness-challenges': {
          'English': 'Earn points for completing challenges, which can be redeemed for co-pay credits.',
          'Español': 'Gana puntos por completar desafíos, que pueden canjearse por créditos de copago.'
        }
      },
      'categoriesTitle': {
        'wellness-challenges': {
          'English': 'Challenge Categories',
          'Español': 'Categorías de Desafíos'
        }
      },
      'categoriesDescription': {
        'wellness-challenges': {
          'English': 'Challenges are organized by category to target different aspects of mental wellness.',
          'Español': 'Los desafíos están organizados por categoría para apuntar a diferentes aspectos del bienestar mental.'
        }
      },
      'completingTitle': {
        'wellness-challenges': {
          'English': 'Completing Challenges',
          'Español': 'Completando Desafíos'
        }
      },
      'completingDescription': {
        'wellness-challenges': {
          'English': 'Mark challenges as complete to earn points and track your progress.',
          'Español': 'Marca los desafíos como completados para ganar puntos y seguir tu progreso.'
        }
      },
      'redeemingTitle': {
        'wellness-challenges': {
          'English': 'Redeeming Points',
          'Español': 'Canjeando Puntos'
        }
      },
      'redeemingDescription': {
        'wellness-challenges': {
          'English': 'Use your earned points to receive discounts on therapy sessions.',
          'Español': 'Usa tus puntos ganados para recibir descuentos en sesiones de terapia.'
        }
      },
      'remindersTitle': {
        'wellness-challenges': {
          'English': 'Setting Reminders',
          'Español': 'Configurando Recordatorios'
        }
      },
      'remindersDescription': {
        'wellness-challenges': {
          'English': 'Set reminders to help you stay on track with your daily challenges.',
          'Español': 'Configura recordatorios para ayudarte a mantenerte al día con tus desafíos diarios.'
        }
      },
      'earningTitle': {
        'copay-credits': {
          'English': 'Earning Credits',
          'Español': 'Ganando Créditos'
        }
      },
      'earningDescription': {
        'copay-credits': {
          'English': 'Complete wellness challenges and activities to earn co-pay credits.',
          'Español': 'Completa desafíos de bienestar y actividades para ganar créditos de copago.'
        }
      },
      'usingTitle': {
        'copay-credits': {
          'English': 'Using Credits',
          'Español': 'Usando Créditos'
        }
      },
      'usingDescription': {
        'copay-credits': {
          'English': 'Apply your credits to reduce the cost of therapy sessions at checkout.',
          'Español': 'Aplica tus créditos para reducir el costo de las sesiones de terapia al pagar.'
        }
      },
      'sessionTitle': {
        'real-time-therapy': {
          'English': 'Booking a Session',
          'Español': 'Reservando una Sesión'
        }
      },
      'sessionDescription': {
        'real-time-therapy': {
          'English': 'Schedule appointments with therapists based on your availability.',
          'Español': 'Programa citas con terapeutas según tu disponibilidad.'
        }
      },
      'paymentTitle': {
        'real-time-therapy': {
          'English': 'Payment Options',
          'Español': 'Opciones de Pago'
        }
      },
      'paymentDescription': {
        'real-time-therapy': {
          'English': 'Use insurance, co-pay credits, or direct payment for your sessions.',
          'Español': 'Usa seguro, créditos de copago o pago directo para tus sesiones.'
        }
      },
      'groupsTitle': {
        'community-support': {
          'English': 'Support Groups',
          'Español': 'Grupos de Apoyo'
        }
      },
      'groupsDescription': {
        'community-support': {
          'English': 'Join virtual support groups led by qualified facilitators.',
          'Español': 'Únete a grupos de apoyo virtuales dirigidos por facilitadores calificados.'
        }
      },
      'postingTitle': {
        'community-support': {
          'English': 'Posting Guidelines',
          'Español': 'Pautas para Publicar'
        }
      },
      'postingDescription': {
        'community-support': {
          'English': 'Learn about our community guidelines for respectful communication.',
          'Español': 'Aprende sobre nuestras pautas comunitarias para una comunicación respetuosa.'
        }
      },
      'searchingTitle': {
        'resource-library': {
          'English': 'Searching Resources',
          'Español': 'Buscando Recursos'
        }
      },
      'searchingDescription': {
        'resource-library': {
          'English': 'Use filters and keywords to find relevant mental health resources.',
          'Español': 'Usa filtros y palabras clave para encontrar recursos relevantes de salud mental.'
        }
      },
      'savingTitle': {
        'resource-library': {
          'English': 'Saving Resources',
          'Español': 'Guardando Recursos'
        }
      },
      'savingDescription': {
        'resource-library': {
          'English': 'Save your favorite resources for quick access later.',
          'Español': 'Guarda tus recursos favoritos para acceder rápidamente más tarde.'
        }
      },
      'widgetsTitle': {
        'dashboard': {
          'English': 'Dashboard Widgets',
          'Español': 'Widgets del Panel'
        }
      },
      'widgetsDescription': {
        'dashboard': {
          'English': 'Each widget on your dashboard provides valuable information and quick access to features.',
          'Español': 'Cada widget en tu panel proporciona información valiosa y acceso rápido a las funciones.'
        }
      },
      'navigationTitle': {
        'dashboard': {
          'English': 'Navigation',
          'Español': 'Navegación'
        }
      },
      'navigationDescription': {
        'dashboard': {
          'English': 'Access all app features from your dashboard through the menu and feature cards.',
          'Español': 'Accede a todas las funciones de la aplicación desde tu panel a través del menú y las tarjetas de funciones.'
        }
      },
      'dailyChallengesTitle': {
        'dashboard': {
          'English': 'Daily Wellness Challenges',
          'Español': 'Desafíos Diarios de Bienestar'
        }
      },
      'dailyChallengesDescription': {
        'dashboard': {
          'English': 'Complete daily challenges to improve your mental health and earn rewards.',
          'Español': 'Completa desafíos diarios para mejorar tu salud mental y ganar recompensas.'
        }
      },
      'gratitudeTitle': {
        'dashboard': {
          'English': 'Gratitude Visualizer',
          'Español': 'Visualizador de Gratitud'
        }
      },
      'gratitudeDescription': {
        'dashboard': {
          'English': 'Record and visualize things you are grateful for to improve mental wellbeing.',
          'Español': 'Registra y visualiza las cosas por las que estás agradecido para mejorar el bienestar mental.'
        }
      },
      'videoDiaryTitle': {
        'dashboard': {
          'English': 'Video Diary',
          'Español': 'Diario en Video'
        }
      },
      'videoDiaryDescription': {
        'dashboard': {
          'English': 'Record video messages to track your journey or share with your therapist.',
          'Español': 'Graba mensajes de video para seguir tu viaje o compartir con tu terapeuta.'
        }
      },
      'appointmentsTitle': {
        'dashboard': {
          'English': 'Upcoming Appointments',
          'Español': 'Próximas Citas'
        }
      },
      'appointmentsDescription': {
        'dashboard': {
          'English': 'View and manage your upcoming therapy sessions and wellness appointments.',
          'Español': 'Ve y administra tus próximas sesiones de terapia y citas de bienestar.'
        }
      },
      'insightsTitle': {
        'dashboard': {
          'English': 'Insights',
          'Español': 'Análisis'
        }
      },
      'insightsDescription': {
        'dashboard': {
          'English': 'Track your mood and view insights about your mental health journey.',
          'Español': 'Sigue tu estado de ánimo y ve análisis sobre tu viaje de salud mental.'
        }
      },
      'workshopsTitle': {
        'dashboard': {
          'English': 'Featured Workshops',
          'Español': 'Talleres Destacados'
        }
      },
      'workshopsDescription': {
        'dashboard': {
          'English': 'Discover and join interactive workshops to learn new coping skills.',
          'Español': 'Descubre y únete a talleres interactivos para aprender nuevas habilidades de afrontamiento.'
        }
      },
      'keyFeaturesTitle': {
        'dashboard': {
          'English': 'Key Features',
          'Español': 'Características Principales'
        }
      },
      'keyFeaturesDescription': {
        'dashboard': {
          'English': 'Explore all the features available to support your mental wellness journey.',
          'Español': 'Explora todas las características disponibles para apoyar tu viaje de bienestar mental.'
        }
      }
    };
    
    const commonTranslations: Record<string, Record<string, string>> = {
      'next': {
        'English': 'Next',
        'Español': 'Siguiente'
      },
      'previous': {
        'English': 'Previous',
        'Español': 'Anterior'
      },
      'finish': {
        'English': 'Finish',
        'Español': 'Finalizar'
      },
      'tutorialClosed': {
        'English': 'Tutorial Closed',
        'Español': 'Tutorial Cerrado'
      },
      'restartHelp': {
        'English': 'You can restart the tutorial anytime by clicking \'Help\' in the menu.',
        'Español': 'Puedes reiniciar el tutorial en cualquier momento haciendo clic en \'Ayuda\' en el menú.'
      }
    };
    
    if (commonTranslations[type]) {
      return commonTranslations[type][preferredLanguage] || commonTranslations[type]['English'];
    }
    
    if (!translations[type] || !translations[type][feature] || !translations[type][feature][preferredLanguage]) {
      return type === 'next' ? 'Next' : 
             type === 'previous' ? 'Previous' : 
             type === 'finish' ? 'Finish' : 
             'No translation available';
    }
    
    return translations[type][feature][preferredLanguage];
  };

  const handleClose = () => {
    if (!embedded) {
      setOpen(false);
      onClose();
      
      toast({
        title: getTranslatedText('tutorialClosed', featureId),
        description: getTranslatedText('restartHelp', featureId),
      });
    }
  };

  const handleNext = () => {
    if (tutorialSteps.length > 0 && currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIcon = () => {
    if (!tutorialSteps || tutorialSteps.length === 0) {
      return <Lightbulb className="h-12 w-12 text-amber-400 mb-2" />;
    }
    
    if (currentStep >= tutorialSteps.length) {
      return <Lightbulb className="h-12 w-12 text-amber-400 mb-2" />;
    }
    
    const step = tutorialSteps[currentStep];
    
    if (step.icon) {
      return React.cloneElement(step.icon as React.ReactElement, { className: "mb-2" });
    }
    
    if (step && step.highlight) {
      if (step.highlight === "points-system" || step.highlight === "earning-credits") {
        return <Award className="h-12 w-12 text-amber-400 mb-2" />;
      } else if (step.highlight === "reminders") {
        return <Bell className="h-12 w-12 text-indigo-400 mb-2" />;
      } else if (step.highlight === "complete-challenge") {
        return <CheckCircle className="h-12 w-12 text-green-400 mb-2" />;
      }
    }
    
    return <Lightbulb className="h-12 w-12 text-amber-400 mb-2" />;
  };

  if (embedded) {
    return (
      <div className="bg-[#2a2a3c]/60 border border-[#3a3a4c] rounded-lg overflow-hidden">
        {tutorialSteps.length > 0 && currentStep < tutorialSteps.length && (
          <div className="py-4 text-center px-4">
            {renderStepIcon()}
            <h3 className="text-lg font-medium text-white mb-2">
              {tutorialSteps[currentStep].title}
            </h3>
            <p className="text-gray-300">
              {tutorialSteps[currentStep].description}
            </p>
            
            {tutorialSteps[currentStep].image && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <img 
                  src={tutorialSteps[currentStep].image} 
                  alt={tutorialSteps[currentStep].title} 
                  className="w-full"
                />
              </div>
            )}
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {getTranslatedText('previous', featureId)}
              </Button>
              
              <Button 
                variant="default" 
                size="sm"
                onClick={handleNext}
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                {currentStep < tutorialSteps.length - 1 ? (
                  <>
                    {getTranslatedText('next', featureId)}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  getTranslatedText('finish', featureId)
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const hasValidStep = tutorialSteps.length > 0 && currentStep < tutorialSteps.length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png" 
              alt="Henry" 
              className="w-8 h-8 mr-3 rounded-full"
            />
            <DialogTitle className="text-xl text-white">{isSpanish ? "Tutorial de Características" : "Feature Tutorial"}</DialogTitle>
          </div>
          <DialogDescription className="text-gray-300">
            {isSpanish ? `Paso ${currentStep + 1} de ${tutorialSteps.length}` : `Step ${currentStep + 1} of ${tutorialSteps.length}`}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          {hasValidStep && (
            <div className="py-4 text-center">
              {renderStepIcon()}
              <h3 className="text-lg font-medium text-white mb-2">
                {tutorialSteps[currentStep].title}
              </h3>
              <p className="text-gray-300">
                {tutorialSteps[currentStep].description}
              </p>
              
              {tutorialSteps[currentStep].image && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <img 
                    src={tutorialSteps[currentStep].image} 
                    alt={tutorialSteps[currentStep].title} 
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {getTranslatedText('previous', featureId)}
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={handleNext}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {hasValidStep && currentStep < tutorialSteps.length - 1 ? (
                <>
                  {getTranslatedText('next', featureId)}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                getTranslatedText('finish', featureId)
              )}
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureTutorial;
