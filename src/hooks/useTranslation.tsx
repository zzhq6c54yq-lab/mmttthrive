
import { useState, useEffect } from "react";

export const useTranslation = () => {
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  
  useEffect(() => {
    // Load the saved language preference if available
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'English';
    setPreferredLanguage(savedLanguage);
    
    // Listen for language change events
    const handleLanguageChange = () => {
      const updatedLanguage = localStorage.getItem('preferredLanguage') || 'English';
      setPreferredLanguage(updatedLanguage);
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Expanded translation dictionary with more comprehensive entries and Portuguese support
  const translations: Record<string, Record<string, string>> = {
    'welcomeTitle': {
      'English': 'Welcome to Thrive MT!',
      'Español': '¡Bienvenido a Thrive MT!',
      'Português': 'Bem-vindo ao Thrive MT!'
    },
    'tourQuestion': {
      'English': 'Would you like a guided tour of the app\'s features?',
      'Español': '¿Te gustaría un recorrido guiado por las funciones de la aplicación?',
      'Português': 'Gostaria de um tour guiado pelos recursos do aplicativo?'
    },
    'henryIntro': {
      'English': 'Hi, I\'m Henry, your mental wellness assistant! I can guide you through the app\'s features to help you get started.',
      'Español': 'Hola, soy Henry, ¡tu asistente de bienestar mental! Puedo guiarte a través de las funciones de la aplicación para ayudarte a comenzar.',
      'Português': 'Olá, eu sou Henry, seu assistente de bem-estar mental! Posso guiá-lo pelos recursos do aplicativo para ajudá-lo a começar.'
    },
    'tutorialAccess': {
      'English': 'Each feature has its own tutorial that you can access anytime by clicking the "How to use this feature" button.',
      'Español': 'Cada función tiene su propio tutorial al que puedes acceder en cualquier momento haciendo clic en el botón "Cómo usar esta función".',
      'Português': 'Cada recurso tem seu próprio tutorial que você pode acessar a qualquer momento clicando no botão "Como usar este recurso".'
    },
    'skipForNow': {
      'English': 'Skip for now',
      'Español': 'Omitir por ahora',
      'Português': 'Pular por enquanto'
    },
    'showMeAround': {
      'English': 'Next',
      'Español': 'Siguiente',
      'Português': 'Próximo'
    },
    'welcomeMessage': {
      'English': 'Let\'s explore the main features of Thrive MT together to help you start your mental',
      'Español': 'Exploremos juntos las principales características de Thrive MT para ayudarte a comenzar tu salud mental',
      'Português': 'Vamos explorar juntos os principais recursos do Thrive MT para ajudá-lo a iniciar sua saúde mental'
    },
    'gotIt': {
      'English': 'Got it',
      'Español': 'Entendido',
      'Português': 'Entendi'
    },
    'continue': {
      'English': 'Continue',
      'Español': 'Continuar',
      'Português': 'Continuar'
    },
    'previous': {
      'English': 'Previous',
      'Español': 'Anterior',
      'Português': 'Anterior'
    },
    'skip': {
      'English': 'Skip',
      'Español': 'Omitir',
      'Português': 'Pular'
    },
    'close': {
      'English': 'Close',
      'Español': 'Cerrar',
      'Português': 'Fechar'
    },
    // Dashboard translations
    'welcome': {
      'English': 'Welcome to',
      'Español': 'Bienvenido a',
      'Português': 'Bem-vindo ao'
    },
    'welcomePersonal': {
      'English': 'Hey! Let\'s work on your mental health journey',
      'Español': '¡Hola! Trabajemos en tu viaje de salud mental',
      'Português': 'Olá! Vamos trabalhar em sua jornada de saúde mental'
    },
    'meetHenry': {
      'English': 'Meet Henry',
      'Español': 'Conoce a Henry',
      'Português': 'Conheça o Henry'
    },
    'newFeatures': {
      'English': 'New Features',
      'Español': 'Nuevas Funciones',
      'Português': 'Novos Recursos'
    },
    'barterSystem': {
      'English': 'Barter System',
      'Español': 'Sistema de Intercambio',
      'Português': 'Sistema de Troca'
    },
    'upgradePlan': {
      'English': 'Upgrade Plan',
      'Español': 'Mejorar Plan',
      'Português': 'Atualizar Plano'
    },
    'premiumTools': {
      'English': 'Premium tools',
      'Español': 'Herramientas premium',
      'Português': 'Ferramentas premium'
    },
    'coPayCredits': {
      'English': 'Co-Pay Credits',
      'Español': 'Créditos de Copago',
      'Português': 'Créditos de Copagamento'
    },
    // Mood screen translations
    'howAreYouFeeling': {
      'English': 'How are you feeling today?',
      'Español': '¿Cómo te sientes hoy?',
      'Português': 'Como você está se sentindo hoje?'
    },
    'selectMood': {
      'English': 'Select the emotion that best describes your current state',
      'Español': 'Selecciona la emoción que mejor describe tu estado actual',
      'Português': 'Selecione a emoção que melhor descreve seu estado atual'
    },
    'happy': {
      'English': 'Happy',
      'Español': 'Feliz',
      'Português': 'Feliz'
    },
    'ok': {
      'English': 'OK',
      'Español': 'Bien',
      'Português': 'Bem'
    },
    'neutral': {
      'English': 'Neutral',
      'Español': 'Neutral',
      'Português': 'Neutro'
    },
    'down': {
      'English': 'Down',
      'Español': 'Decaído',
      'Português': 'Para baixo'
    },
    'sad': {
      'English': 'Sad',
      'Español': 'Triste',
      'Português': 'Triste'
    },
    'overwhelmed': {
      'English': 'Overwhelmed',
      'Español': 'Abrumado',
      'Português': 'Sobrecarregado'
    },
    // Tutorial translations
    'welcomeToThriveMT': {
      'English': 'Welcome to Thrive MT',
      'Español': 'Bienvenido a Thrive MT',
      'Português': 'Bem-vindo ao Thrive MT'
    },
    'personalizedDashboard': {
      'English': 'Your personalized mental wellness dashboard is ready. We\'ve designed it to support your journey to better mental health, focusing on Hopeful Horizons, Empowerment through Education, Nurtured Connections, Resilience and Recovery, and ensuring Your Journey Matters. Click the Thrive MT button in the top right corner anytime you need help navigating the platform.',
      'Español': 'Tu panel de bienestar mental personalizado está listo. Lo hemos diseñado para apoyar tu viaje hacia una mejor salud mental, centrándote en Horizontes Esperanzadores, Empoderamiento a través de la Educación, Conexiones Nutridas, Resiliencia y Recuperación, y asegurando que Tu Viaje Importa. Haz clic en el botón Thrive MT en la esquina superior derecha en cualquier momento que necesites ayuda para navegar por la plataforma.',
      'Português': 'Seu painel personalizado de bem-estar mental está pronto. Nós o projetamos para apoiar sua jornada para uma melhor saúde mental, com foco em Horizontes Esperançosos, Capacitação por meio da Educação, Conexões Nutridas, Resiliência e Recuperação, e garantindo que Sua Jornada Importa. Clique no botão Thrive MT no canto superior direito sempre que precisar de ajuda para navegar na plataforma.'
    },
    'exploreWorkshops': {
      'English': 'Explore Wellness Workshops',
      'Español': 'Explora Talleres de Bienestar',
      'Português': 'Explore Oficinas de Bem-Estar'
    },
    'workshopsDescription': {
      'English': 'Discover a variety of workshops designed to support different aspects of your mental health journey.',
      'Español': 'Descubre una variedad de talleres diseñados para apoyar diferentes aspectos de tu viaje de salud mental.',
      'Português': 'Descubra uma variedade de oficinas projetadas para apoiar diferentes aspectos da sua jornada de saúde mental.'
    },
    'supportYourJourney': {
      'English': 'We\'re here to support your mental wellness journey with personalized resources and tools.',
      'Español': 'Estamos aquí para apoyar tu viaje de bienestar mental con herramientas y recursos personalizados.',
      'Português': 'Estamos aqui para apoiar sua jornada de bem-estar mental com recursos e ferramentas personalizados.'
    },
    'tutorialButtonHelp': {
      'English': 'Look for this button in the top right corner for a full tutorial anytime.',
      'Español': 'Busque este botón en la esquina superior derecha para obtener ayuda en cualquier momento.',
      'Português': 'Procure este botão no canto superior direito para um tutorial completo a qualquer momento.'
    }
  };

  // Function to get translated text based on the current language preference
  const getTranslatedText = (key: string) => {
    return translations[key]?.[preferredLanguage] || translations[key]?.['English'] || key;
  };

  const isSpanish = preferredLanguage === 'Español';
  const isPortuguese = preferredLanguage === 'Português';

  return {
    preferredLanguage,
    isSpanish,
    isPortuguese,
    getTranslatedText
  };
};

export default useTranslation;
