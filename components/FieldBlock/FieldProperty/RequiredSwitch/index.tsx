import React, { useContext } from 'react'
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core'
import useStyles from '../../../../styles'
import { useTranslation } from 'react-i18next'
import FieldContext from '../../FieldContext'
import FormEditorContext from '../../../FormEditorContext'

const RequiredSwitch = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const { field, index } = useContext(FieldContext)
  const formEditor = useContext(FormEditorContext)

  const onChange = (e) => {
    formEditor.updateFormField(index, {
      ...field,
      required: e.target.checked
    })
  }

  return (
    <FormGroup
      row
      className={classes.formGroup}
    >
      <FormControlLabel
        control={
          <Switch
            inputProps={{
              style: {
                left: 0
              }
            }}
            checked={field.required}
            onChange={onChange}
            color='secondary'
          />
        }
        label={t('required')}
      />
    </FormGroup>
  )
}

export default RequiredSwitch
