import { ReactNode } from 'react'
import styled from 'styled-components'

export type ButtonPropsType = {
  onClick: () => void
  children: ReactNode
}

const Button: React.FC<ButtonPropsType> = (props) => {
  const { onClick, children } = props
  const handleClick = (): void => {
    onClick()
  }
  return <StyledButton onClick={handleClick}>{children}</StyledButton>
}

const StyledButton = styled.button`
  display: contents;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
  text-align: inherit;
`

export default Button
