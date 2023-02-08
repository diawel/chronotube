import { ReactNode } from 'react'
import styled from 'styled-components'

export type TextPropsType = {
  children: ReactNode
  style?: SpanStyleType
}

type SpanStyleType = {
  size?: string
  color?: string
}

const Text: React.FC<TextPropsType> = (props) => {
  const { children, style } = props
  return <StyledSpan {...style}>{children}</StyledSpan>
}

const StyledSpan = styled.span<SpanStyleType>(
  (style) => `
    font-size: ${style.size ? style.size : 'inherit'};
    color: ${style.color ? style.color : 'inherit'};
  `
)

export default Text
