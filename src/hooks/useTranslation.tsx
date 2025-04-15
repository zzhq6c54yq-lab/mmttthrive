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
      console.log("Language changed to:", updatedLanguage);
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Comprehensive translation dictionary with Portuguese support
  const translations: Record<string, Record<string, string>> = {
    // Welcome and Intro screens
    'welcomeTitle': {
      'English': 'Welcome to Thrive MT!',
      'Español': '¡Bienvenido a Thrive MT!',
      'Português': 'Bem-vindo ao Thrive MT!'
    },
    'welcomeTagline': {
      'English': 'because life should be more than just surviving',
      'Español': 'porque la vida debe ser más que solo sobrevivir',
      'Português': 'porque a vida deve ser mais do que apenas sobreviver'
    },
    'beginJourney': {
      'English': 'Begin Your Journey',
      'Español': 'Comienza Tu Viaje',
      'Português': 'Comece Sua Jornada'
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
    
    // Common UI elements and buttons
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
      'English': 'Let\'s explore the main features of Thrive MT together to help you start your mental wellness journey',
      'Español': 'Exploremos juntos las principales características de Thrive MT para ayudarte a comenzar tu salud mental',
      'Português': 'Vamos explorar juntos os principais recursos do Thrive MT para ajudá-lo a iniciar sua jornada de saúde mental'
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
    'back': {
      'English': 'Back',
      'Español': 'Atrás',
      'Português': 'Voltar'
    },
    'next': {
      'English': 'Next',
      'Español': 'Siguiente',
      'Português': 'Próximo'
    },
    'save': {
      'English': 'Save',
      'Español': 'Guardar',
      'Português': 'Salvar'
    },
    'cancel': {
      'English': 'Cancel',
      'Español': 'Cancelar',
      'Português': 'Cancelar'
    },
    'edit': {
      'English': 'Edit',
      'Español': 'Editar',
      'Português': 'Editar'
    },
    'delete': {
      'English': 'Delete',
      'Español': 'Eliminar',
      'Português': 'Excluir'
    },
    'search': {
      'English': 'Search',
      'Español': 'Buscar',
      'Português': 'Pesquisar'
    },
    'submit': {
      'English': 'Submit',
      'Español': 'Enviar',
      'Português': 'Enviar'
    },
    'loading': {
      'English': 'Loading...',
      'Español': 'Cargando...',
      'Português': 'Carregando...'
    },
    'seeAll': {
      'English': 'See All',
      'Español': 'Ver Todo',
      'Português': 'Ver Tudo'
    },
    'viewMore': {
      'English': 'View More',
      'Español': 'Ver Más',
      'Português': 'Ver Mais'
    },
    'accessing': {
      'English': 'Accessing',
      'Español': 'Accediendo a',
      'Português': 'Acessando'
    },
    'loadingContent': {
      'English': 'Loading your specialized content...',
      'Español': 'Cargando tu contenido especializado...',
      'Português': 'Carregando seu conteúdo especializado...'
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
    'upcomingAppointments': {
      'English': 'Upcoming Appointments',
      'Español': 'Próximas Citas',
      'Português': 'Consultas Agendadas'
    },
    'specializedPrograms': {
      'English': 'Specialized Programs',
      'Español': 'Programas Especializados',
      'Português': 'Programas Especializados'
    },
    'moodInsights': {
      'English': 'Mood Insights',
      'Español': 'Análisis de Estado de Ánimo',
      'Português': 'Insights de Humor'
    },
    'videoDiary': {
      'English': 'Video Diary',
      'Español': 'Diario en Video',
      'Português': 'Diário em Vídeo'
    },
    'featuredWorkshops': {
      'English': 'Featured Workshops',
      'Español': 'Talleres Destacados',
      'Português': 'Workshops em Destaque'
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
    
    // Registration screen
    'createAccount': {
      'English': 'Create Your Account',
      'Español': 'Crea Tu Cuenta',
      'Português': 'Crie Sua Conta'
    },
    'joinThrive': {
      'English': 'Join Thrive MT to start your mental wellness journey',
      'Español': 'Únete a Thrive MT para comenzar tu viaje de bienestar mental',
      'Português': 'Junte-se ao Thrive MT para iniciar sua jornada de bem-estar mental'
    },
    'fullName': {
      'English': 'Full Name',
      'Español': 'Nombre Completo',
      'Português': 'Nome Completo'
    },
    'emailAddress': {
      'English': 'Email Address',
      'Español': 'Correo Electrónico',
      'Português': 'Endereço de Email'
    },
    'password': {
      'English': 'Password',
      'Español': 'Contraseña',
      'Português': 'Senha'
    },
    'register': {
      'English': 'Register',
      'Español': 'Registrarse',
      'Português': 'Registrar'
    },
    'skipRegistration': {
      'English': 'Continue Without Registration',
      'Español': 'Continuar Sin Registro',
      'Português': 'Continuar Sem Registro'
    },
    
    // Golden Years Portal
    'goldenYearsWelcome': {
      'English': 'Welcome to Your Golden Years Journey',
      'Español': 'Bienvenido a Tu Viaje de los Años Dorados',
      'Português': 'Bem-vindo à Sua Jornada da Idade Dourada'
    },
    'goldenYearsSubtitle': {
      'English': 'Explore resources designed to enhance your wellbeing, connect with others, and embrace this meaningful time of life.',
      'Español': 'Explora recursos diseñados para mejorar tu bienestar, conectarte con otros y aprovechar esta etapa significativa de la vida.',
      'Português': 'Explore recursos projetados para melhorar seu bem-estar, conectar-se com outros e abraçar este momento significativo da vida.'
    },
    'legacyJournal': {
      'English': 'Featured: Legacy Journal',
      'Español': 'Destacado: Diario de Legado',
      'Português': 'Destaque: Diário de Legado'
    },
    'legacyJournalDesc': {
      'English': 'Preserve your life story, wisdom, and memories for future generations. Our guided journaling experience helps you document your journey in a meaningful way that can be shared with loved ones.',
      'Español': 'Preserva tu historia de vida, sabiduría y recuerdos para las futuras generaciones. Nuestra experiencia de diario guiado te ayuda a documentar tu viaje de una manera significativa que puede ser compartida con seres queridos.',
      'Português': 'Preserve sua história de vida, sabedoria e memórias para as gerações futuras. Nossa experiência de diário guiado ajuda você a documentar sua jornada de uma forma significativa que pode ser compartilhada com entes queridos.'
    },
    'startJournal': {
      'English': 'Start Your Journal',
      'Español': 'Comienza Tu Diario',
      'Português': 'Comece Seu Diário'
    },
    'upcomingEvents': {
      'English': 'Upcoming Events',
      'Español': 'Próximos Eventos',
      'Português': 'Próximos Eventos'
    },
    'viewAllEvents': {
      'English': 'View All Events',
      'Español': 'Ver Todos los Eventos',
      'Português': 'Ver Todos os Eventos'
    },
    'needAssistance': {
      'English': 'Need Assistance?',
      'Español': '¿Necesita Ayuda?',
      'Português': 'Precisa de Ajuda?'
    },
    'resourcesFor': {
      'English': 'Resources for emergency help, caregiver support, or technical assistance.',
      'Español': 'Recursos para ayuda de emergencia, apoyo al cuidador o asistencia técnica.',
      'Português': 'Recursos para ajuda de emergência, suporte ao cuidador ou assistência técnica.'
    },
    'emergencyResources': {
      'English': 'Emergency Resources',
      'Español': 'Recursos de Emergencia',
      'Português': 'Recursos de Emergência'
    },
    'technicalSupport': {
      'English': 'Technical Support',
      'Español': 'Soporte Técnico',
      'Português': 'Suporte Técnico'
    },
    
    // Specialized Programs
    'departmentOfDefense': {
      'English': 'Department of Defense',
      'Español': 'Departamento de Defensa',
      'Português': 'Departamento de Defesa'
    },
    'militarySupport': {
      'English': 'Resources and support for military personnel and veterans',
      'Español': 'Recursos y apoyo para personal militar y veteranos',
      'Português': 'Recursos e suporte para militares e veteranos'
    },
    'collegeExperience': {
      'English': 'The College Experience',
      'Español': 'La Experiencia Universitaria',
      'Português': 'A Experiência Universitária'
    },
    'collegeSupport': {
      'English': 'Mental health support for students navigating campus life',
      'Español': 'Apoyo de salud mental para estudiantes en la vida universitaria',
      'Português': 'Suporte de saúde mental para estudantes navegando na vida universitária'
    },
    'smallBusiness': {
      'English': 'Small Business',
      'Español': 'Pequeñas Empresas',
      'Português': 'Pequenos Negócios'
    },
    'entrepreneurSupport': {
      'English': 'Mental health resources for entrepreneurs and small business owners',
      'Español': 'Recursos de salud mental para emprendedores y dueños de pequeñas empresas',
      'Português': 'Recursos de saúde mental para empreendedores e proprietários de pequenos negócios'
    },
    'adolescentExperience': {
      'English': 'Adolescent Experience',
      'Español': 'La Experiencia Adolescente',
      'Português': 'A Experiência Adolescente'
    },
    'youthSupport': {
      'English': 'Age-appropriate mental health support for children and teens',
      'Español': 'Apoyo de salud mental adaptado para niños y adolescentes de diferentes edades',
      'Português': 'Suporte de saúde mental apropriado para crianças e adolescentes de diferentes idades'
    },
    'goldenYears': {
      'English': 'The Golden Years',
      'Español': 'Los Años Dorados',
      'Português': 'A Idade Dourada'
    },
    'seniorSupport': {
      'English': 'Mental wellness resources for seniors and elderly adults',
      'Español': 'Recursos de bienestar mental para adultos mayores y personas de la tercera edad',
      'Português': 'Recursos de bem-estar mental para idosos e adultos da terceira idade'
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
    },
    
    // Help and support
    'getHelp': {
      'English': 'Get Help',
      'Español': 'Obtener Ayuda',
      'Português': 'Obter Ajuda'
    },
    'chatWithHenry': {
      'English': 'Chat with Henry',
      'Español': 'Chatear con Henry',
      'Português': 'Conversar com Henry'
    },
    'howCanIHelp': {
      'English': 'How can I help you with mental wellness tools today?',
      'Español': '¿Cómo puedo ayudarte con herramientas de bienestar mental hoy?',
      'Português': 'Como posso ajudá-lo com ferramentas de bem-estar mental hoje?'
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
