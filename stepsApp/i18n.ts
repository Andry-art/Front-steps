import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/assets/locales/en.json';
import ru from './src/assets/locales/ru.json';

export const defaultNS = 'en';

export const resources = {
  en: {
    [defaultNS]: en,
  },
  ru: {
    [defaultNS]: ru,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: [defaultNS, 'ru'],
  defaultNS,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
});
