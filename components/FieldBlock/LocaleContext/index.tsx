import { createContext } from 'react'
import { IField } from '../../../hooks/useFormEditor'

const LocaleContext = createContext<string>('en')

export default LocaleContext
