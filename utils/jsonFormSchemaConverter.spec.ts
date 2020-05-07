import { IField } from '../hooks/useFormEditor'
import { convertToJSONSchema, convertToFormFields } from './jsonFormSchemaConverter'

const testingFormFields: IField[] = [
  {
    question: {
      en: 'Why you code for Food?',
      zh_hk: '點解您會為搵食做狗？'
    },
    answerType: 'shortAnswer',
    payload: {
      default: {
        en: 'No money',
        zh_hk: '冇錢'
      }
    },
    required: true
  },
  {
    question: {
      en: 'Again, why you code for Food?',
      zh_hk: '問多次，點解您會為搵食做狗？'
    },
    answerType: 'paragraph',
    payload: {
      default: {
        en: 'No money\nNo rich dad',
        zh_hk: '冇錢\n冇父幹'
      }
    },
    required: true
  },
  {
    question: {
      en: 'Will code for Food?',
      zh_hk: '為搵食做IT狗？'
    },
    answerType: 'singleChoice',
    payload: {
      options: [
        {
          en: 'Yes',
          zh_hk: '會'
        },
        {
          en: 'No',
          zh_hk: '唔會'
        }
      ],
      default: 1
    },
    required: true
  },
  {
    question: {
      en: 'What foods did you code for?',
      zh_hk: '做IT狗搵咗咩食？'
    },
    answerType: 'multipleChoice',
    payload: {
      options: [
        {
          en: 'Shit',
          zh_hk: '屎'
        },
        {
          en: 'Curry',
          zh_hk: '咖喱'
        },
        {
          en: 'Curry Favor Shit',
          zh_hk: '咖喱味嘅屎'
        },
        {
          en: 'Shit Favor Curry',
          zh_hk: '屎味嘅咖喱'
        }
      ],
      default: [
        0,
        2
      ]
    },
    required: false
  },
  {
    question: {
      en: 'When will you die? (date)',
      zh_hk: '幾時死?'
    },
    answerType: 'date',
    payload: {
      default: '2020-05-07T05:38:55.959Z'
    },
    required: false
  },
  {
    question: {
      en: 'When will you die? (time)',
      zh_hk: '幾點死?'
    },
    answerType: 'time',
    payload: {
      default: '2020-05-07T11:40:14.585Z'
    },
    required: false
  }
]

const testJsonFormSchema = {
  'type': 'object',
  'required': [
    '0',
    '1',
    '2'
  ],
  'properties': {
    '0': {
      'title': {
        'en': 'Why you code for Food?',
        'zh_hk': '點解您會為搵食做狗？'
      },
      'type': 'string',
      'default': {
        'en': 'No money',
        'zh_hk': '冇錢'
      }
    },
    '1': {
      'title': {
        'en': 'Again, why you code for Food?',
        'zh_hk': '問多次，點解您會為搵食做狗？'
      },
      'type': 'string',
      'default': {
        'en': 'No money\nNo rich dad',
        'zh_hk': '冇錢\n冇父幹'
      },
      '__uiSchema': {
        'ui:widget': 'textarea'
      }
    },
    '2': {
      'title': {
        'en': 'Will code for Food?',
        'zh_hk': '為搵食做IT狗？'
      },
      'type': 'string',
      'enum': [
        {
          'en': 'Yes',
          'zh_hk': '會'
        },
        {
          'en': 'No',
          'zh_hk': '唔會'
        }
      ],
      'default': {
        'en': 'No',
        'zh_hk': '唔會'
      },
      '__uiSchema': {
        'ui:widget': 'radio',
        'ui:options': {
          'inline': true
        }
      }
    },
    '3': {
      'title': {
        'en': 'What foods did you code for?',
        'zh_hk': '做IT狗搵咗咩食？'
      },
      'type': 'array',
      'items': {
        'type': 'string',
        'enum': [
          {
            'en': 'Shit',
            'zh_hk': '屎'
          },
          {
            'en': 'Curry',
            'zh_hk': '咖喱'
          },
          {
            'en': 'Curry Favor Shit',
            'zh_hk': '咖喱味嘅屎'
          },
          {
            'en': 'Shit Favor Curry',
            'zh_hk': '屎味嘅咖喱'
          }
        ]
      },
      'uniqueItems': true,
      '__uiSchema': {
        'ui:widget': 'checkboxes'
      },
      'default': [
        {
          'en': 'Shit',
          'zh_hk': '屎'
        },
        {
          'en': 'Curry Favor Shit',
          'zh_hk': '咖喱味嘅屎'
        }
      ]
    },
    '4': {
      'title': {
        'en': 'When will you die? (date)',
        'zh_hk': '幾時死?'
      },
      'type': 'string',
      'format': 'date',
      'default': '2020-05-07T05:38:55.959Z',
      '__uiSchema': {
        'ui:widget': 'mui-date'
      }
    },
    '5': {
      'title': {
        'en': 'When will you die? (time)',
        'zh_hk': '幾點死?'
      },
      'type': 'string',
      'format': 'time',
      'default': '2020-05-07T11:40:14.585Z',
      '__uiSchema': {
        'ui:widget': 'mui-time'
      }
    }
  }
}

describe('jsonFormSchemaConverter', () => {
  it('convert form fields to JSON schema', () => {
    expect(JSON.parse(JSON.stringify(convertToJSONSchema(testingFormFields)))).toEqual(testJsonFormSchema)
  })

  it('converts JSON schema back to form fields', () => {
    expect(JSON.parse(JSON.stringify(convertToFormFields(testJsonFormSchema)))).toEqual(testingFormFields)
  })
})
