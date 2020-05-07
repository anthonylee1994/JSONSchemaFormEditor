import React from 'react'
import { Icon, Tooltip } from '@material-ui/core'
import useStyles from '../../../styles'
import { useTranslation } from 'react-i18next'

const DragArea = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Tooltip title={t('action.move')}>
      <Icon className={classes.fieldBlockDragArea} {...props}>
        drag_indicator
      </Icon>
    </Tooltip>
  )
}

export default DragArea
