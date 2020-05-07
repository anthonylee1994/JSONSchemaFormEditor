import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import useStyles from '../../../../../styles'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'
import FieldContext from '../../../FieldContext'
import FormEditorContext from '../../../../FormEditorContext'
import LocaleContext from '../../../LocaleContext'
import { get, first } from 'lodash'

const DateAnswerEditor = () => {
  const { t } = useTranslation()
  const { field, index } = useContext(FieldContext)
  const formEditor = useContext(FormEditorContext)
  const locale = useContext(LocaleContext)
  const classes = useStyles()

  const onChange = (date) => {
    formEditor.updateFormField(index, {
      ...field,
      payload: {
        ...get(field, 'payload', {}),
        default: date
      }
    })
  }

  return (
    <div className={classes.dateAnswerEditor}>
      <DatePicker
        fullWidth
        animateYearScrolling
        clearable
        size='small'
        color='secondary'
        format='YYYY-MM-DD'
        margin='dense'
        value={get(field, 'payload.default')}
        onChange={onChange}
        label={t('answer.editor.defaultAnswer', { lng: locale })}
      />
    </div>
  )
}

export default DateAnswerEditor
