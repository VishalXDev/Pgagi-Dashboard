import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './local/en.json';
import es from './local/es.json';

// Prevent re-initialization in hot reload / dev
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false, // React already escapes
      },
      resources: {
        en: { translation: en },
        es: { translation: es },
      },
      react: {
        useSuspense: false,
      },
    });

  i18n.on('failedLoading', (lng, error) => {
    console.error(`Failed to load language: ${lng}`, error);
  });
}

export default i18n;
