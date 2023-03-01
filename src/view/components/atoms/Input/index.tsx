import { color } from 'src/common/styles/color'
import styled from 'styled-components'

export type InputPropsType = {
  type: string
  value: string
  valueSetter: (value: string) => void
  placeholder?: string
  onBlur?: () => void
}

const Input: React.FC<InputPropsType> = (props) => {
  const { type, value, valueSetter, placeholder, onBlur } = props
  return (
    <StyledInput
      onChange={(event) => {
        valueSetter(event.target.value)
      }}
      {...{ type, value, placeholder, onBlur }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.currentTarget.blur()
        }
      }}
    />
  )
}
const StyledInput = styled.input`
  background: ${color.white};
  appearance: none;
  border-radius: 24px;
  color: ${color.black};
  font-size: 12px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  padding: 0 24px;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  &::placeholder {
    color: ${color.darkGray};
  }
`

export default Input
