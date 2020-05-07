const answerTypes = [
  {
    id: 'shortAnswer',
    icon: 'short_text',
    getInitialPayload(locales: string[] = ['en']) {
      return {
        default: locales.reduce((acc, locale) => ({
          ...acc,
          [locale]: ''
        }), {})
      }
    }
  },
  {
    id: 'paragraph',
    icon: 'subject',
    getInitialPayload(locales: string[] = ['en']) {
      return {
        default: locales.reduce((acc, locale) => ({
          ...acc,
          [locale]: ''
        }), {})
      }
    }
  },
  {
    id: 'singleChoice',
    icon: 'radio_button_checked',
    getInitialPayload(locales: string[] = ['en']) {
      return {
        options: [
          locales.reduce((acc, locale) => ({
            ...acc,
            [locale]: ''
          }), {})
        ],
        default: 0
      }
    }
  },
  {
    id: 'multipleChoice',
    icon: 'check_box',
    getInitialPayload(locales: string[] = ['en']) {
      return {
        options: [
          locales.reduce((acc, locale) => ({
            ...acc,
            [locale]: ''
          }), {})
        ],
        default: []
      }
    }
  },
  {
    id: 'date',
    icon: 'event',
    disableLocale: true,
    getInitialPayload(locales: string[] = ['en']) {
      return {
        default: null
      }
    }
  },
  {
    id: 'time',
    icon: 'schedule',
    disableLocale: true,
    getInitialPayload(locales: string[] = ['en']) {
      return {
        default: null
      }
    }
  }
]

export default answerTypes
