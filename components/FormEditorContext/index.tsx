import { createContext } from 'react'
import { IUseFormEditorHooks } from '../../hooks/useFormEditor'

const FormEditorContext = createContext<IUseFormEditorHooks>(undefined)

export default FormEditorContext
