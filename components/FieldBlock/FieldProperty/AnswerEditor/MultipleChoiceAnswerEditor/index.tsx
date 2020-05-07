import React, { useContext } from 'react'
import { List, ListItem, ListItemIcon, Checkbox, TextField, ListItemSecondaryAction, IconButton, Icon, Tooltip, FormControlLabel, FormGroup } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import FieldContext from '../../../FieldContext'
import FormEditorContext from '../../../../FormEditorContext'
import LocaleContext from '../../../LocaleContext'
import { get } from 'lodash'
import OptionEditToolBar from '../OptionEditToolBar'

const MultipleChoiceAnswerEditor = () => {
  const { t } = useTranslation()
  const { field, index } = useContext(FieldContext)
  const formEditor = useContext(FormEditorContext)
  const locale = useContext(LocaleContext)
  const options = get(field, 'payload.options', [])
  const defaultValues = get(field, 'payload.default', [])

  const editOption = (optionIndex: number) => (e) => {
    formEditor.updateFormField(index, {
      ...field,
      payload: {
        ...get(field, 'payload', {}),
        options: [
          ...options.slice(0, optionIndex),
          {
            ...get(options, `[${optionIndex}]`, {}),
            [locale]: e.target.value
          },
          ...options.slice(optionIndex + 1)
        ]
      }
    })
  }

  const editDefaultOption = (optionIndex: number) => (e) => {
    formEditor.updateFormField(index, {
      ...field,
      payload: {
        ...get(field, 'payload', {}),
        default: e.target.checked ? [
          ...defaultValues,
          optionIndex
        ] : defaultValues.filter(x => x !== optionIndex)
      }
    })
  }

  const removeOption = (optionIndex: number) => () => {
    const oldChecks = options.map((_, i) => defaultValues.includes(i))
    const newChecks = [
      ...oldChecks.slice(0, optionIndex),
      ...oldChecks.slice(optionIndex + 1)
    ]

    formEditor.updateFormField(index, {
      ...field,
      payload: {
        ...get(field, 'payload', {}),
        options: [
          ...options.slice(0, optionIndex),
          ...options.slice(optionIndex + 1)
        ],
        default: newChecks.reduce((acc, x, i) => x ? [...acc, i] : acc, [])
      }
    })
  }

  return (
    <div>
      <FormGroup>
        <List style={{ padding: 0 }}>
          {options.map((option, optionIndex) => (
            <ListItem key={optionIndex} dense>
              <ListItemIcon style={{ minWidth: 30 }}>
                <Tooltip title={t('answer.editor.defaultAnswer', { lng: locale })}>
                  <FormControlLabel
                    value={optionIndex}
                    control={(
                      <Checkbox
                        checked={defaultValues.includes(optionIndex)}
                        onChange={editDefaultOption(optionIndex)}
                      />
                    )}
                    label=''
                  />
                </Tooltip>
              </ListItemIcon>
              <TextField
                fullWidth
                label={t('answer.option', { lng: locale })}
                margin='dense'
                color='secondary'
                size='small'
                value={get(option, locale, '')}
                onChange={editOption(optionIndex)}
              />
              {options.length > 1 ? (
                <ListItemSecondaryAction>
                  <Tooltip title={t('action.delete')}>
                    <IconButton
                      size='small'
                      edge='end'
                      onClick={removeOption(optionIndex)}
                    >
                      <Icon fontSize='small'>delete</Icon>
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              ) : null}
            </ListItem>
          ))}
        </List>
      </FormGroup>

      <OptionEditToolBar />
    </div>
  )
}

export default MultipleChoiceAnswerEditor
