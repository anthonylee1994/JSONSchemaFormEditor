import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0),
    height: '100%',
    overflowY: 'auto'
  },
  noFormFieldToolBar: {
    padding: theme.spacing(2)
  },
  fieldProperty: {
    padding: theme.spacing(1)
  },
  formGroup: {
    padding: theme.spacing(1)
  },
  fieldBlock: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    position: 'relative',
    transition: 'all 100ms ease-in-out'
  },
  fieldBlockDragAreaContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  fieldBlockDragArea: {
    margin: theme.spacing(0.5),
    color: theme.palette.primary.main,
    cursor: 'move'
  },
  answerEditor: {
    margin: `${theme.spacing(2)}px 0`,
    padding: theme.spacing(0),
    border: 'dotted 2px rgba(255,255,255,0.3)',
    borderRadius: theme.spacing(1)
  },
  shortAnswerEditor: {
    padding: theme.spacing(1)
  },
  paragraphAnswerEditor: {
    padding: theme.spacing(1)
  },
  dateAnswerEditor: {
    padding: theme.spacing(1)
  },
  optionEditToolBar: {
    margin: theme.spacing(1)
  },
  nonActiveFieldLayer: {
    background: 'rgba(255,255,255,0.2)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
    opacity: 0,
    transition: 'all 300ms ease-in-out',
    '&:hover': {
      opacity: 1
    }
  }
}))

export default useStyles
