import { ReactNode } from 'react'
import styled from 'styled-components'

export type TextPropsType = {
  children: ReactNode
  style?: SpanStyleType
}

type SpanStyleType = {
  color?: string
  size?: string
  weight?: string
}

const Text: React.FC<TextPropsType> = (props) => {
  const { children, style } = props
  return <StyledSpan {...style}>{children}</StyledSpan>
}

const StyledSpan = styled.span<SpanStyleType>(
  (style) => `
    color: ${style.color ? style.color : 'inherit'};
    font-size: ${style.size ? style.size : 'inherit'};
    font-weight: ${style.weight ? style.weight : 'inherit'};
  `
)

export default Text
