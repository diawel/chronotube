import styled from 'styled-components'
import { FileListSetterType } from '../Filter'

const dragOvered = (event: React.DragEvent<HTMLDivElement>): void => {
  event.stopPropagation()
  event.preventDefault()
}

const dropped = (
  event: React.DragEvent<HTMLDivElement>,
  fileListSetter: FileListSetterType
): void => {
  event.stopPropagation()
  event.preventDefault()
  fileListSetter(event.dataTransfer.files)
}

type DropPropsType = {
  fileListSetter: FileListSetterType
  children?: React.ReactNode
}

const Drop: React.FC<DropPropsType> = (props) => {
  const { fileListSetter, children } = props

  return (
    <Wrapper
      onDragOver={dragOvered}
      onDrop={(event) => dropped(event, fileListSetter)}
    >
      {children}
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  display: contents;
`

export default Drop
