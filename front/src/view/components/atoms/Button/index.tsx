import { ReactNode } from 'react'
import styled from 'styled-components'

export type ButtonPropsType = {
  handleClick: () => void
  children: ReactNode
}

const Button: React.FC<ButtonPropsType> = (props) => {
  const { handleClick, children } = props
  const onClick = (): void => {
    handleClick()
  }
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

const StyledButton = styled.button`
  display: contents;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
`

export default Button
