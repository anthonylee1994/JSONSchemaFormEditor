import React, { useContext } from 'react'
import { List, ListItem, ListItemIcon, Radio, TextField, ListItemSecondaryAction, IconButton, Icon, Tooltip, Paper, RadioGroup, FormControlLabel } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import FieldContext from '../../../FieldContext'
import FormEditorContext from '../../../../FormEditorContext'
import LocaleContext from '../../../LocaleContext'
import { get } from 'lodash'
import OptionEditToolBar from '../OptionEditToolBar'

const SingleChoiceAnswerEditor = () => {
  const { t } = useTranslation()
  const { field, index } = useContext(FieldContext)
  const formEditor = useContext(FormEditorContext)
  const locale = useContext(LocaleContext)
  const options = get(field, 'payload.options', [])

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

  const editDefaultOption = (e) => {
    formEditor.updateFormField(index, {
      ...field,
      payload: {
        ...get(field, 'payload', {}),
        default: Number(e.target.value)
      }
    })
  }

  const removeOption = (optionIndex: number) => () => {
    const defaultValue = get(field, 'payload.default', 0)
    formEditor.updateFormField(index, {
      ...field,
      payload: {
        ...get(field, 'payload', {}),
        options: [
          ...options.slice(0, optionIndex),
          ...options.slice(optionIndex + 1)
        ],
        default: (() => {
          if (defaultValue >= options.length || defaultValue === optionIndex) {
            return 0
          } else if (defaultValue > optionIndex) {
            return defaultValue - 1
          }
          return defaultValue
        })()
      }
    })
  }

  return (
    <div>
      <RadioGroup
        value={get(field, 'payload.default', 0)}
        onChange={editDefaultOption}
      >
        <List style={{ padding: 0 }}>
          {options.map((option, optionIndex) => (
            <ListItem key={optionIndex} dense>
              <ListItemIcon style={{ minWidth: 30 }}>
                <Tooltip title={t('answer.editor.defaultAnswer', { lng: locale })}>
                  <FormControlLabel
                    value={optionIndex}
                    control={<Radio />}
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
      </RadioGroup>

      <OptionEditToolBar />
    </div>
  )
}

export default SingleChoiceAnswerEditor
