import { IField } from '../hooks/useFormEditor'
import { get, isEqual } from 'lodash'

const convertFormFieldToJsonSchemaProperty = (field: IField) => {
  const mappings = {
    shortAnswer() {
      return {
        type: 'string',
        default: get(field, 'payload.default', {})
      }
    },
    paragraph() {
      return {
        type: 'string',
        default: get(field, 'payload.default', {}),
        __uiSchema: {
          'ui:widget': 'textarea'
        }
      }
    },
    singleChoice() {
      return {
        type: 'string',
        enum: get(field, 'payload.options', []),
        default: get(field, `payload.options[${get(field, 'payload.default', 0)}]`, {}),
        __uiSchema: {
          'ui:widget': 'radio',
          'ui:options': {
            inline: true
          }
        }
      }
    },
    multipleChoice() {
      return {
        type: 'array',
        items: {
          type: 'string',
          enum: get(field, 'payload.options', [])
        },
        uniqueItems: true,
        __uiSchema: {
          'ui:widget': 'checkboxes'
        },
        default: get(field, 'payload.default', []).map(x => get(field, `payload.options[${x}]`, {}))
      }
    },
    date() {
      return {
        type: 'string',
        format: 'date',
        default: get(field, 'payload.default', ''),
        __uiSchema: {
          'ui:widget': 'mui-date'
        }
      }
    },
    time() {
      return {
        type: 'string',
        format: 'time',
        default: get(field, 'payload.default', ''),
        __uiSchema: {
          'ui:widget': 'mui-time'
        }
      }
    }
  }

  return {
    title: field.question,
    ...mappings[field.answerType]()
  }

}

const convertJsonSchemaPropertyToFormField = (
  jsonSchemaProperty: any,
  required = false
): IField => {
  const propertyType = get(jsonSchemaProperty, 'type')
  const uiSchema = get(jsonSchemaProperty, '__uiSchema')
  const question = get(jsonSchemaProperty, 'title', {})
  const format = get(jsonSchemaProperty, 'format')

  const answerType = (() => {
    if (propertyType === 'string' && get(uiSchema, 'ui:widget') === 'textarea') {
      return 'paragraph'
    }

    if (propertyType === 'string' && Array.isArray(get(jsonSchemaProperty, 'enum'))) {
      return 'singleChoice'
    }

    if (propertyType === 'array' && Array.isArray(get(jsonSchemaProperty, 'items.enum'))) {
      return 'multipleChoice'
    }

    if (propertyType === 'string' && format === 'date') {
      return 'date'
    }

    if (propertyType === 'string' && format === 'time') {
      return 'time'
    }

    return 'shortAnswer'
  })()

  const mappings = {
    shortAnswer() {
      return {
        payload: {
          default: get(jsonSchemaProperty, 'default')
        }
      }
    },
    paragraph() {
      return {
        payload: {
          default: get(jsonSchemaProperty, 'default')
        }
      }
    },
    singleChoice() {
      const options = get(jsonSchemaProperty, 'enum', [])
      const defaultOptionIndex = options.findIndex(option => isEqual(option, get(jsonSchemaProperty, 'default')))

      return {
        payload: {
          options,
          default: defaultOptionIndex
        }
      }
    },
    multipleChoice() {
      const options = get(jsonSchemaProperty, 'items.enum', [])
      const defaultOptionIndices = get(jsonSchemaProperty, 'default', []).map(x => options.findIndex(option => isEqual(option, x)))

      return {
        payload: {
          options,
          default: defaultOptionIndices
        }
      }
    },
    date() {
      return {
        payload: {
          default: get(jsonSchemaProperty, 'default', '')
        }
      }
    },
    time() {
      return {
        payload: {
          default: get(jsonSchemaProperty, 'default', '')
        }
      }
    }
  }

  return {
    question,
    answerType,
    ...mappings[answerType](),
    required
  }

}

export const convertToJSONSchema = (formFields: IField[]) => {
  const requiredFields = formFields.reduce((acc, { required }, i) => required ? [...acc, String(i)] : acc, [] as string[])

  return {
    type: 'object',
    required: requiredFields,
    properties: formFields.reduce((acc, formField, i) => {
      return {
        ...acc,
        [`${i}`]: convertFormFieldToJsonSchemaProperty(formField)
      }
    }, {})
  }
}

export const convertToFormFields = (jsonSchema: any = {}): IField[] => {
  const properties = get(jsonSchema, 'properties', {})
  const required = get(jsonSchema, 'required', [])

  const fields = Object.keys(properties).map(Number).sort().map((index) => {
    return convertJsonSchemaPropertyToFormField(
      properties[String(index)],
      required.includes(String(index))
    )
  })

  return fields
}
