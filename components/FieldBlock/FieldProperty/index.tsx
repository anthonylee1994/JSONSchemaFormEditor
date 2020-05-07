import React, { useContext } from 'react'
import useStyles from '../../../styles'
import AnswerTypeDropdown from './AnswerTypeDropdown'
import RequiredSwitch from './RequiredSwitch'
import QuestionField from './QuestionField'
import AnswerEditor from './AnswerEditor'
import FormEditorContext from '../../FormEditorContext'
import LocaleContext from '../LocaleContext'
import FieldContext from '../FieldContext'

const FieldProperty = () => {
  const classes = useStyles()
  const { locales, editingFormFieldIndex } = useContext(FormEditorContext)
  const { index } = useContext(FieldContext)

  return (
    <div className={classes.fieldProperty}>
      {locales.map((locale, key) => (
        <LocaleContext.Provider
          value={locale}
          key={key}
        >
          <QuestionField />
        </LocaleContext.Provider>
      ))}
      <AnswerTypeDropdown />
      {index === editingFormFieldIndex ? (
        <AnswerEditor />
      ) : null}
      <RequiredSwitch />
    </div>
  )
}

export default FieldProperty
