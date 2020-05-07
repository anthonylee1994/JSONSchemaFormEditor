import { useRef, MutableRefObject } from 'react'
import { useDrop, useDrag, DropTargetMonitor, DragElementWrapper, DragSourceOptions } from 'react-dnd'

export interface IUseDragOrderableHooks {
  drag: DragElementWrapper<DragSourceOptions>
  drop: DragElementWrapper<any>
  isDragging: boolean
  ref: MutableRefObject<any>
}

const useDragOrderable = ({
  id,
  index,
  moveItem,
  type = 'any'
}: {
  id: any
  type: string
  index: number
  moveItem: (dragIndex: number, hoverIndex: number) => void
}) => {
  const ref = useRef<any>(null)

  const [, drop] = useDrop({
    accept: type,
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      index,
      type
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  return {
    drag,
    drop,
    isDragging,
    ref
  }
}

export default useDragOrderable
