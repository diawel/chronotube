import styled from 'styled-components'
import StandardContent, { StandardContentPropsType } from '../StandardContent'

export type ColumnContentPropsType = StandardContentPropsType &
  InnerWrapperStyleType

const ColumnContent: React.FC<ColumnContentPropsType> = (props) => {
  const { children, maxWidth } = props

  return (
    <StandardContent>
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
