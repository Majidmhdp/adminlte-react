import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languageResources } from '@shared/config/i18n/Configurations';

i18n
  .use(initReactI18next as any) // passes i18n down to react-i18next
  .init({
    resources: languageResources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      wait: true,
    },
  } as any);

export default i18n;
