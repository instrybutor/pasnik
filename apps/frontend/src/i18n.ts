import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend((language, _, callback) => {
      import(`../locales/${language}.json`)
        .then((resources) => callback(null, resources))
        .catch((error) => callback(error, null));
    })
  )
  .init({
    lng: 'pl',
    debug: process.env.NODE_ENV === 'development',
    preload: ['pl'],
    defaultNS: 'translation',
    fallbackLng: ['pl'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
