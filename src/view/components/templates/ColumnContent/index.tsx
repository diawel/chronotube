import styled from 'styled-components'
import StandardContent from '../StandardContent'
import { ReactNode } from 'react'

export type ColumnContentPropsType = InnerWrapperStyleType & {
  hideFooter?: boolean
  children: ReactNode
}

const ColumnContent: React.FC<ColumnContentPropsType> = (props) => {
  const { children, maxWidth, hideFooter } = props

  return (
    <StandardContent hideFooter={hideFooter}>
      <InnerWrapper maxWidth={maxWidth}>{children}</InnerWrapper>
    </StandardContent>
  )
}

type InnerWrapperStyleType = {
  maxWidth?: string
}

const InnerWrapper = styled.div<InnerWrapperStyleType>(
  (style) => `
    margin: 0 auto;
    max-width: ${style.maxWidth ?? '416px'};
    box-sizing: border-box;
    padding: 16px;
  `
)

export default ColumnContent
