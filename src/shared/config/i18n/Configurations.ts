export interface Language {
  key: string;
  icon: string;
  label: string;
}

export const languages: Language[] = [
  {
    key: 'en',
    icon: 'flag-icon-us',
    label: 'header.language.english',
  },
  {
    key: 'tr',
    icon: 'flag-icon-tr',
    label: 'header.language.turkish',
  },
  {
    key: 'de',
    icon: 'flag-icon-de',
    label: 'header.language.german',
  },
  {
    key: 'fr',
    icon: 'flag-icon-fr',
    label: 'header.language.french',
  },
  {
    key: 'es',
    icon: 'flag-icon-es',
    label: 'header.language.spanish',
  },
];

import translationEN from '@shared/config/i18n/locales/en/translation.json';
import translationTR from '@shared/config/i18n/locales/tr/translation.json';
import translationDE from '@shared/config/i18n/locales/de/translation.json';
import translationES from '@shared/config/i18n/locales/es/translation.json';
import translationFR from '@shared/config/i18n/locales/fr/translation.json';

// the translations
export const languageResources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  de: {
    translation: translationDE,
  },
};
