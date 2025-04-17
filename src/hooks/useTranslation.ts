
import { useEffect, useState } from 'react';
import translations from '../data/translations';

type Language = 'English' | 'Español' | 'Português' | 'Русский' | 'Deutsch' | 'हिन्दी' | 'Français' | 'Filipino' | '中文' | 'العربية';

const useTranslation = () => {
  const [preferredLanguage, setPreferredLanguage] = useState<Language>('English');
  
  useEffect(() => {
    // Load the saved language preference if available
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage) {
      setPreferredLanguage(savedLanguage);
    }
  }, []);

  // Function to change language
  const changeLanguage = (language: Language) => {
    localStorage.setItem('preferredLanguage', language);
    setPreferredLanguage(language);
    
    // Dispatch a custom event to notify other components of language change
    window.dispatchEvent(new Event('languageChange'));
    
    console.log(`Language changed to: ${language}`);
  };
  
  // Helper functions to check current language
  const isSpanish = preferredLanguage === 'Español';
  const isPortuguese = preferredLanguage === 'Português';
  const isRussian = preferredLanguage === 'Русский';
  const isGerman = preferredLanguage === 'Deutsch';
  const isHindi = preferredLanguage === 'हिन्दी';
  const isFrench = preferredLanguage === 'Français';
  const isFilipino = preferredLanguage === 'Filipino';
  const isChinese = preferredLanguage === '中文';
  const isArabic = preferredLanguage === 'العربية';
  
  // Function to get translated text based on key
  const getTranslatedText = (key: string) => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key; // Return the key itself as fallback
    }
    
    if (translations[key][preferredLanguage]) {
      return translations[key][preferredLanguage];
    } else {
      console.warn(`Translation not available for key '${key}' in ${preferredLanguage}`);
      return translations[key]['English'] || key;
    }
  };
  
  return {
    preferredLanguage,
    changeLanguage,
    isSpanish,
    isPortuguese,
    isRussian,
    isGerman,
    isHindi,
    isFrench, 
    isFilipino,
    isChinese,
    isArabic,
    getTranslatedText
  };
};

export default useTranslation;
