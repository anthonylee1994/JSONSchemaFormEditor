import React, { useContext } from 'react'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { Tooltip, Icon, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useStyles from '../../../../../styles'
import FieldContext from '../../../FieldContext'
import FormEditorContext from '../../../../FormEditorContext'
import { get } from 'lodash'
import LocaleContext from '../../../LocaleContext'

const OptionEditToolBar = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { field, index } = useContext(FieldContext)
  const formEditor = useContext(FormEditorContext)
  const options = get(field, 'payload.options', [])
  const locale = useContext(LocaleContext)
  const { locales } = formEditor

  const onCreate = () => {
    formEditor.updateFormField(index, {
      ...field,
      payload: {
        ...get(field, 'payload', {}),
        options: [
          ...options,
          locales.reduce((acc, lo) => ({
            ...acc,
            [lo]: ''
          }), {})
        ]
      }
    })
  }

  return (
    <div className={classes.optionEditToolBar}>
      <Button
        fullWidth
        size='medium'
        variant='outlined'
        color='primary'
        startIcon={<Icon>add</Icon>}
        onClick={onCreate}
      >
        {t('action.create', { lng: locale })}
      </Button>
    </div>
  )
}

export default OptionEditToolBar
