import React, { useContext } from 'react'
import { FormControl, InputLabel, Select, MenuItem, ListItemIcon, Icon, Typography } from '@material-ui/core'
import answerTypes from '../../../../constants/answerTypes'
import { useTranslation } from 'react-i18next'
import FormEditorContext from '../../../FormEditorContext'
import FieldContext from '../../FieldContext'

const AnswerTypeDropdown = () => {
  const { t } = useTranslation()
  const { field, index } = useContext(FieldContext)
  const formEditor = useContext(FormEditorContext)

  const onChange = (e) => {
    const answerType = answerTypes.find(x => x.id === e.target.value)

    formEditor.updateFormField(index, {
      ...field,
      answerType: e.target.value,
      payload: answerType.getInitialPayload(formEditor.locales)
    })
  }

  return (
    <FormControl
      fullWidth
      margin='dense'
      size='small'
    >
      <InputLabel>
        {t('answer.type')}
      </InputLabel>
      <Select
        value={field.answerType}
        onChange={onChange}
        color='secondary'
      >
        {answerTypes.map(({ id, icon }) => (
          <MenuItem key={id} value={id}>
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <Typography variant='inherit'>
              {t(`answer.type.${id}`)}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AnswerTypeDropdown
