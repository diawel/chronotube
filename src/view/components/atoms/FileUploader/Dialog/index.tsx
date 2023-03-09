import styled from 'styled-components'
import { FileListSetterType } from '../Filter'

const selected = (
  event: React.ChangeEvent<HTMLInputElement>,
  fileListSetter: FileListSetterType
): void => {
  if (event.target.files) {
    fileListSetter(event.target.files)
  }
}

type DialogPropsType = {
  fileListSetter: FileListSetterType
  acceptList?: string[]
  multiple?: boolean
  children?: React.ReactNode
}

const Dialog: React.FC<DialogPropsType> = (props) => {
  const { fileListSetter, acceptList, multiple, children } = props

  return (
    <Wrapper>
      {children}
      <InvisibleInput
        type="file"
        accept={acceptList?.join(',')}
        onChange={(event) => selected(event, fileListSetter)}
        multiple={multiple}
      />
    </Wrapper>
  )
}

export const Wrapper = styled.label`
  cursor: pointer;
  display: contents;
`

export const InvisibleInput = styled.input`
  display: none;
`

export default Dialog
