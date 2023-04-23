import { ReactNode } from 'react'
import styled from 'styled-components'

export type TextPropsType = SpanStyleType & {
  children: ReactNode
}

type SpanStyleType = {
  color?: string
  size?: string
  weight?: string
}

const Text = styled.span<SpanStyleType>(
  (style) => `
    color: ${style.color ?? 'inherit'};
    font-size: ${style.size ?? 'inherit'};
    font-weight: ${style.weight ?? 'inherit'};
  `
)

export default Text
