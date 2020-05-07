import React, { useContext, useEffect } from 'react'
import { Paper, Grid } from '@material-ui/core'
import Toolbar from '../Toolbar'
import useStyles from '../../styles'
import FieldProperty from './FieldProperty'
import DragArea from './DragArea'
import { IField } from '../../hooks/useFormEditor'
import FormEditorContext from '../FormEditorContext'
import FieldContext from './FieldContext'
import useDragOrderable from '../../hooks/useDragOrderable'

export interface IFieldBlockProps {
  field: IField
  index: number
  moveItem: any
}

const FieldBlock = ({
  field,
  index,
  moveItem
}: IFieldBlockProps) => {
  const classes = useStyles()
  const {
    editingFormFieldIndex,
    setEditingFormFieldIndex,
  } = useContext(FormEditorContext)

  const {
    drag,
    drop,
    isDragging,
    ref
  } = useDragOrderable({
    index,
    moveItem,
    id: index,
    type: 'field'
  })

  drag(drop(ref))

  useEffect(() => {
    if (isDragging) {
      setEditingFormFieldIndex(index)
    }
  }, [isDragging])

  return (
    <FieldContext.Provider
      value={{
        field,
        index
      }}
    >
      <Paper
        ref={ref}
        className={classes.fieldBlock}
        style={{
          opacity: index !== editingFormFieldIndex ? 0.4 : 1,
          transform: `scale(${index === editingFormFieldIndex ? '1' : '0.95'})`
        }}
      >
        <Grid container>
          <Grid item xs={8}>
            <Toolbar fieldIndex={index} />
          </Grid>
          <Grid item xs={4} className={classes.fieldBlockDragAreaContainer}>
            <DragArea />
          </Grid>
        </Grid>
        <FieldProperty />
        {index !== editingFormFieldIndex ? (
          <div
            className={classes.nonActiveFieldLayer}
            onClick={() => setEditingFormFieldIndex(index)}
          />
        ) : null}
      </Paper>
    </FieldContext.Provider>
  )
}

export default FieldBlock
