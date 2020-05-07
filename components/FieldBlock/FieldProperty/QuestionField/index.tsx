import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@material-ui/core'
import FieldContext from '../../FieldContext'
import FormEditorContext from '../../../FormEditorContext'
import { get } from 'lodash'
import LocaleContext from '../../LocaleContext'

const QuestionField = () => {
  const { t } = useTranslation()

  const { index, field } = useContext(FieldContext)
  const formEditor = useContext(FormEditorContext)
  const locale = useContext(LocaleContext)

  const onChange = (e) => {
    formEditor.updateFormField(index, {
      ...field,
      question: {
        ...get(field, 'question', {}),
        [locale]: e.target.value
      }
    })
  }

  return (
    <TextField
      fullWidth
      size='small'
      label={t('question', { lng: locale })}
      margin='dense'
      color='secondary'
      onChange={onChange}
      value={get(field, `question.${locale}`, '')}
    />
  )
}

export default QuestionField
