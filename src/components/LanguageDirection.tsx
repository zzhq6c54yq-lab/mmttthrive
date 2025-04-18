
import React, { useEffect } from 'react';
import useTranslation from '@/hooks/useTranslation';

/**
 * This component handles setting the document direction (RTL/LTR) based on the selected language.
 * It doesn't render anything but affects the document's HTML tag.
 */
const LanguageDirection: React.FC = () => {
  const { preferredLanguage } = useTranslation();
  
  useEffect(() => {
    // All currently supported languages use LTR direction
    document.documentElement.setAttribute('dir', 'ltr');
  }, [preferredLanguage]);
  
  return null; // This component doesn't render anything
};

export default LanguageDirection;
