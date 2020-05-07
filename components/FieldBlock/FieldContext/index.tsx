import { createContext } from 'react'
import { IField } from '../../../hooks/useFormEditor'

const FieldContext = createContext<{ field: IField, index: number }>(undefined)

export default FieldContext
