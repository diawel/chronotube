import { ReactNode } from 'react'
import styled from 'styled-components'

export type NoTranslatePropsType = {
  children: ReactNode
}

const NoTranslate: React.FC<NoTranslatePropsType> = (props) => {
  const { children } = props
  return <Container translate="no">{children}</Container>
}

const Container = styled.div`
  display: contents;
`

export default NoTranslate
