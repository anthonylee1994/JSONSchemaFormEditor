import React, { useContext } from 'react'
import { Icon, Tooltip, Button } from '@material-ui/core'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { useTranslation } from 'react-i18next'
import FormEditorContext from '../FormEditorContext'

interface IToolbarProps {
  fieldIndex?: number
}

const Toolbar = ({
  fieldIndex
}: IToolbarProps) => {

  const { t } = useTranslation()
  const formEditor = useContext(FormEditorContext)
  const hasFields = typeof fieldIndex !== 'undefined'

  if (!hasFields) {
    return (
      <Button
        fullWidth
        size='large'
        variant='outlined'
        color='primary'
        startIcon={<Icon>add</Icon>}
        onClick={formEditor.addFormField}
      >
        {t('action.create')}
      </Button>
    )
  }

  return (
    <ToggleButtonGroup size='small'>
      <Tooltip title={t('action.create')}>
        <ToggleButton value='left' onClick={formEditor.addFormField}>
          <Icon fontSize='small'>
            add
          </Icon>
        </ToggleButton>
      </Tooltip>

      {hasFields ? (
        <Tooltip title={t('action.duplicate')}>
          <ToggleButton
            value='center'
            onClick={() => formEditor.duplicateFormField(fieldIndex)}
          >
            <Icon>
              file_copy
            </Icon>
          </ToggleButton>
        </Tooltip>
      ) : null}

      {hasFields ? (
        <Tooltip title={t('action.delete')}>
          <ToggleButton
            value='right'
            onClick={() => formEditor.removeFormField(fieldIndex)}
          >
            <Icon>
              delete
            </Icon>
          </ToggleButton>
        </Tooltip>
      ) : null}
    </ToggleButtonGroup>
  )
}

export default Toolbar
