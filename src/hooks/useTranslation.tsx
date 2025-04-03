
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

  // Expanded translation dictionary with more comprehensive entries
  const translations: Record<string, Record<string, string>> = {
    'welcomeTitle': {
      'English': 'Welcome to Thrive MT!',
      'Español': '¡Bienvenido a Thrive MT!'
    },
    'tourQuestion': {
      'English': 'Would you like a guided tour of the app\'s features?',
      'Español': '¿Te gustaría un recorrido guiado por las funciones de la aplicación?'
    },
    'henryIntro': {
      'English': 'Hi, I\'m Henry, your mental wellness assistant! I can guide you through the app\'s features to help you get started.',
      'Español': 'Hola, soy Henry, ¡tu asistente de bienestar mental! Puedo guiarte a través de las funciones de la aplicación para ayudarte a comenzar.'
    },
    'tutorialAccess': {
      'English': 'Each feature has its own tutorial that you can access anytime by clicking the "How to use this feature" button.',
      'Español': 'Cada función tiene su propio tutorial al que puedes acceder en cualquier momento haciendo clic en el botón "Cómo usar esta función".'
    },
    'skipForNow': {
      'English': 'Skip for now',
      'Español': 'Omitir por ahora'
    },
    'showMeAround': {
      'English': 'Next',
      'Español': 'Siguiente'
    },
    'welcomeMessage': {
      'English': 'Let\'s explore the main features of Thrive MT together to help you start your mental',
      'Español': 'Exploremos juntos las principales características de Thrive MT para ayudarte a comenzar tu salud mental'
    },
    'gotIt': {
      'English': 'Got it',
      'Español': 'Entendido'
    },
    'continue': {
      'English': 'Continue',
      'Español': 'Continuar'
    },
    'previous': {
      'English': 'Previous',
      'Español': 'Anterior'
    },
    'skip': {
      'English': 'Skip',
      'Español': 'Omitir'
    },
    'close': {
      'English': 'Close',
      'Español': 'Cerrar'
    },
    // Dashboard translations
    'welcome': {
      'English': 'Welcome to',
      'Español': 'Bienvenido a'
    },
    'welcomePersonal': {
      'English': 'Hey! Let\'s work on your mental health journey',
      'Español': '¡Hola! Trabajemos en tu viaje de salud mental'
    },
    'meetHenry': {
      'English': 'Meet Henry',
      'Español': 'Conoce a Henry'
    },
    'newFeatures': {
      'English': 'New Features',
      'Español': 'Nuevas Funciones'
    },
    'barterSystem': {
      'English': 'Barter System',
      'Español': 'Sistema de Intercambio'
    },
    'upgradePlan': {
      'English': 'Upgrade Plan',
      'Español': 'Mejorar Plan'
    },
    'premiumTools': {
      'English': 'Premium tools',
      'Español': 'Herramientas premium'
    },
    'coPayCredits': {
      'English': 'Co-Pay Credits',
      'Español': 'Créditos de Copago'
    },
    // Mood screen translations
    'howAreYouFeeling': {
      'English': 'How are you feeling today?',
      'Español': '¿Cómo te sientes hoy?'
    },
    'selectMood': {
      'English': 'Select the emotion that best describes your current state',
      'Español': 'Selecciona la emoción que mejor describe tu estado actual'
    },
    'happy': {
      'English': 'Happy',
      'Español': 'Feliz'
    },
    'ok': {
      'English': 'OK',
      'Español': 'Bien'
    },
    'neutral': {
      'English': 'Neutral',
      'Español': 'Neutral'
    },
    'down': {
      'English': 'Down',
      'Español': 'Decaído'
    },
    'sad': {
      'English': 'Sad',
      'Español': 'Triste'
    },
    'overwhelmed': {
      'English': 'Overwhelmed',
      'Español': 'Abrumado'
    },
    // Tutorial translations
    'welcomeToThriveMT': {
      'English': 'Welcome to Thrive MT',
      'Español': 'Bienvenido a Thrive MT'
    },
    'personalizedDashboard': {
      'English': 'Your personalized mental wellness dashboard is ready. We\'ve designed it to support your journey to better mental health, focusing on Hopeful Horizons, Empowerment through Education, Nurtured Connections, Resilience and Recovery, and ensuring Your Journey Matters. Click the Thrive MT button in the top right corner anytime you need help navigating the platform.',
      'Español': 'Tu panel de bienestar mental personalizado está listo. Lo hemos diseñado para apoyar tu viaje hacia una mejor salud mental, centrándote en Horizontes Esperanzadores, Empoderamiento a través de la Educación, Conexiones Nutridas, Resiliencia y Recuperación, y asegurando que Tu Viaje Importa. Haz clic en el botón Thrive MT en la esquina superior derecha en cualquier momento que necesites ayuda para navegar por la plataforma.'
    },
    'exploreWorkshops': {
      'English': 'Explore Wellness Workshops',
      'Español': 'Explora Talleres de Bienestar'
    },
    'workshopsDescription': {
      'English': 'Discover a variety of workshops designed to support different aspects of your mental health journey.',
      'Español': 'Descubre una variedad de talleres diseñados para apoyar diferentes aspectos de tu viaje de salud mental.'
    },
    'supportYourJourney': {
      'English': 'We\'re here to support your mental wellness journey with personalized resources and tools.',
      'Español': 'Estamos aquí para apoyar tu viaje de bienestar mental con herramientas y recursos personalizados.'
    },
    'tutorialButtonHelp': {
      'English': 'Look for this button in the top right corner for a full tutorial anytime.',
      'Español': 'Busque este botón en la esquina superior derecha para obtener ayuda en cualquier momento.'
    }
  };

  // Function to get translated text based on the current language preference
  const getTranslatedText = (key: string) => {
    return translations[key]?.[preferredLanguage] || translations[key]?.['English'] || key;
  };

  const isSpanish = preferredLanguage === 'Español';

  return {
    preferredLanguage,
    isSpanish,
    getTranslatedText
  };
};

export default useTranslation;
