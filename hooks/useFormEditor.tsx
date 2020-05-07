import { useState, useEffect } from 'react'
import { cloneDeep } from 'lodash'
import useDebounce from '../utils/useDebounce'
import { convertToJSONSchema, convertToFormFields } from '../utils/jsonFormSchemaConverter'

export interface IField {
  question: any
  answerType: 'shortAnswer' | 'paragraph' | 'singleChoice' | 'multipleChoice' | 'date' | 'time'
  payload: any
  required: boolean
}

export interface IUseFormEditorProps {
  initialFormFields: IField[]
  locales: string[]
  jsonSchema: any
  onSave: (jsonSchema: any) => void
}

export interface IUseFormEditorHooks {
  addFormField: () => void
  removeFormField: (index: number) => void
  updateFormField: (index: number, formField: IField) => void
  duplicateFormField: (index: number) => void
  setFormFields: (formFields: IField[]) => void
  formFields: IField[]
  locales: string[]
  editingFormFieldIndex: number
  setEditingFormFieldIndex: (editingFormFieldIndex: number) => void
}

const initialFormField: IField = {
  question: {},
  answerType: 'shortAnswer',
  payload: {},
  required: false
}

const useFormEditor = ({
  initialFormFields,
  locales,
  jsonSchema,
  onSave
}: IUseFormEditorProps): IUseFormEditorHooks => {
  const [formFields, setFormFields] = useState<IField[]>(initialFormFields || [])
  const [editingFormFieldIndex, setEditingFormFieldIndex] = useState(0)

  const debouncedFormFields = useDebounce(formFields, [500])

  const addFormField = () => {
    setFormFields([
      ...formFields,
      initialFormField
    ])
  }

  const removeFormField = (index: number) => {
    if (index === editingFormFieldIndex) {
      setEditingFormFieldIndex(editingFormFieldIndex > 1 ? editingFormFieldIndex - 1 : 0)
    }

    setFormFields([
      ...formFields.slice(0, index),
      ...formFields.slice(index + 1)
    ])
  }

  const updateFormField = (index: number, formField: IField) => {
    setFormFields([
      ...formFields.slice(0, index),
      formField,
      ...formFields.slice(index + 1)
    ])
  }

  const duplicateFormField = (index: number) => {
    setFormFields([
      ...formFields.slice(0, index),
      formFields[index],
      cloneDeep(formFields[index]),
      ...formFields.slice(index + 1)
    ])
  }

  const saveFormFields = () => {
    onSave(convertToJSONSchema(debouncedFormFields))
  }

  const readFormFields = () => {
    setFormFields(convertToFormFields(jsonSchema))
  }

  useEffect(saveFormFields, [debouncedFormFields])
  useEffect(readFormFields, [jsonSchema])

  return {
    addFormField,
    removeFormField,
    updateFormField,
    setFormFields,
    duplicateFormField,
    formFields,
    locales,
    editingFormFieldIndex,
    setEditingFormFieldIndex
  }
}

export default useFormEditor
