import React, { useContext } from 'react'
import useStyles from '../../../../styles'
import ShortAnswerEditor from './ShortAnswerEditor'
import ParagraphAnswerEditor from './ParagraphAnswerEditor'
import MultipleChoiceAnswerEditor from './MultipleChoiceAnswerEditor'
import SingleChoiceAnswerEditor from './SingleChoiceAnswerEditor'
import DateAnswerEditor from './DateAnswerEditor'
import TimeAnswerEditor from './TimeAnswerEditor'
import FieldContext from '../../FieldContext'
import FormEditorContext from '../../../FormEditorContext'
import LocaleContext from '../../LocaleContext'
import answerTypes from '../../../../constants/answerTypes'
import { first } from 'lodash'

const editorMapping = {
  shortAnswer: ShortAnswerEditor,
  paragraph: ParagraphAnswerEditor,
  multipleChoice: MultipleChoiceAnswerEditor,
  singleChoice: SingleChoiceAnswerEditor,
  date: DateAnswerEditor,
  time: TimeAnswerEditor
}

const AnswerEditor = () => {
  const classes = useStyles()
  const { field } = useContext(FieldContext)
  const { locales } = useContext(FormEditorContext)

  const Editor = editorMapping[field.answerType] || editorMapping.shortAnswer

  if (answerTypes.find(x => x.disableLocale && x.id === field.answerType)) {
    return (
      <LocaleContext.Provider
        value={first(locales)}
      >
        <div className={classes.answerEditor}>
          <Editor />
        </div>
      </LocaleContext.Provider>
    )
  }

  return (
    <div>
      {locales.map((locale, key) => (
        <LocaleContext.Provider
          value={locale}
          key={key}
        >
          <div className={classes.answerEditor}>
            <Editor />
          </div>
        </LocaleContext.Provider>
      ))}
    </div>
  )
}

export default AnswerEditor
