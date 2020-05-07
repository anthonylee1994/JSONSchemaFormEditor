import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import useStyles from '../../../../../styles'
import { TimePicker } from '@material-ui/pickers'
import FieldContext from '../../../FieldContext'
import FormEditorContext from '../../../../FormEditorContext'
import LocaleContext from '../../../LocaleContext'
import { get } from 'lodash'

const TimeAnswerEditor = () => {
  const { t } = useTranslation()
  const { field, index } = useContext(FieldContext)
  const formEditor = useContext(FormEditorContext)
  const locale = useContext(LocaleContext)
  const classes = useStyles()

  const onChange = (time) => {
    formEditor.updateFormField(index, {
      ...field,
      payload: {
        ...get(field, 'payload', {}),
        default: time
      }
    })
  }

  return (
    <div className={classes.dateAnswerEditor}>
      <TimePicker
        fullWidth
        clearable
        size='small'
        color='secondary'
        format='hh:mm A'
        margin='dense'
        value={get(field, 'payload.default')}
        onChange={onChange}
        label={t('answer.editor.defaultAnswer', { lng: locale })}
      />
    </div>
  )
}

export default TimeAnswerEditor
