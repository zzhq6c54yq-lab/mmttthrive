
import commonTranslations from './common';
import introTranslations from './intro';
import mentalHealthTranslations from './mentalHealth';
import henryTranslations from './henry';
import userMenuTranslations from './userMenu';

// Combine all translation sections
const translations: Record<string, Record<string, string>> = {
  ...commonTranslations,
  ...introTranslations,
  ...mentalHealthTranslations,
  ...henryTranslations,
  ...userMenuTranslations
};

export default translations;
