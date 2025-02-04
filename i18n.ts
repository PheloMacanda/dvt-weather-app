import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import en from './languages/en.json';

const locales = getLocales();
const deviceLanguage = locales?.[0]?.languageCode ?? 'en';

const resources = {
    en: {
        translation: en,
        fullName: 'English'
    }
};

i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v4',
    lng: deviceLanguage,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false // not needed
    }
});

export default i18n;