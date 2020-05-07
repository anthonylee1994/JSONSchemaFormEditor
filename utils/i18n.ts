import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import lang from '../lang'

(i18n.use(initReactI18next) as any)
  .init({
    resources: lang,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
