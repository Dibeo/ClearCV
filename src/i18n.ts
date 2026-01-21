import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    load: 'languageOnly',
    ns: ["common", "bar", "form"],
    defaultNS: "common",
    backend: {
      loadPath: "/ClearCV/lang/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: true,
    },
    detection: {
      order: ['path', 'navigator', 'localStorage'],
      lookupFromPathIndex: 0,
    },
  });
