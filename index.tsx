import React, { useCallback } from 'react'
import useStyles from './styles'
import FieldBlock from './components/FieldBlock'
import './utils/i18n'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import useFormEditor from './hooks/useFormEditor'
import FormEditorContext from './components/FormEditorContext'
import Toolbar from './components/Toolbar'
import update from 'immutability-helper'

moment.locale('en')

export interface IJSONSchemaFormEditorProps {
  onSave: (jsonSchema: any) => void
  jsonSchema: any
}

const JSONSchemaFormEditor = ({
  onSave,
  jsonSchema
}: IJSONSchemaFormEditorProps) => {
  const classes = useStyles()
  const formEditor = useFormEditor({
    onSave,
    jsonSchema,
    initialFormFields: [],
    locales: ['en', 'zh_hk']
  })

  const {
    formFields,
    setFormFields,
    setEditingFormFieldIndex
  } = formEditor

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = formFields[dragIndex]
      setFormFields(
        update(formFields, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem]
          ]
        })
      )
      setEditingFormFieldIndex(hoverIndex)
    },
    [formFields]
  )

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <FormEditorContext.Provider value={formEditor}>
        <div className={classes.root}>
          {formFields.length === 0 ? (
            <div className={classes.noFormFieldToolBar}>
              <Toolbar />
            </div>
          ) : null}
          {formFields.map((formField, index) => (
            <FieldBlock
              field={formField}
              index={index}
              key={index}
              moveItem={moveItem}
            />
          ))}
        </div>
      </FormEditorContext.Provider>
    </MuiPickersUtilsProvider>
  )
}

export default JSONSchemaFormEditor
