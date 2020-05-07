import React, { useContext } from 'react'
import { TextField } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useStyles from '../../../../../styles'
import FieldContext from '../../../FieldContext'
import FormEditorContext from '../../../../FormEditorContext'
import { get } from 'lodash'
import LocaleContext from '../../../LocaleContext'

const ShortAnswerEditor = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { field, index } = useContext(FieldContext)
  const formEditor = useContext(FormEditorContext)
  const locale = useContext(LocaleContext)

  const onChange = (e) => {
    formEditor.updateFormField(index, {
      ...field,
      payload: {
        ...get(field, 'payload', {}),
        default: {
          ...get(field, 'payload.default', {}),
          [locale]: e.target.value
        }
      }
    })
  }

  return (
    <div className={classes.shortAnswerEditor}>
      <TextField
        fullWidth
        label={t('answer.editor.defaultAnswer', { lng: locale })}
        size='small'
        margin='dense'
        color='secondary'
        onChange={onChange}
        value={get(field, `payload.default.${locale}`)}
      />
    </div>
  )
}

export default ShortAnswerEditor
