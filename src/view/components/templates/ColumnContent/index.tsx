import { ReactNode } from 'react'
import styled from 'styled-components'
import Footer, { footerHeight } from '../../molecules/Footer'

export type ColumnContentPropsType = {
  children: ReactNode
  hideFooter?: boolean
} & InnerWrapperStyleType

const ColumnContent: React.FC<ColumnContentPropsType> = (props) => {
  const { children, hideFooter, maxWidth } = props

  return (
    <>
      <OuterWrapper>
        <InnerWrapper maxWidth={maxWidth}>{children}</InnerWrapper>
      </OuterWrapper>
      {hideFooter ? <></> : <Footer />}
    </>
  )
}

const OuterWrapper = styled.div`
  min-height: calc(100svh - ${footerHeight});
  display: flex;
  justify-content: center;
  align-items: center;
`

type InnerWrapperStyleType = {
  maxWidth?: string
}

const InnerWrapper = styled.div<InnerWrapperStyleType>(
  (style) => `
    width: 100%;
    max-width: ${style.maxWidth ? style.maxWidth : '416px'};
    box-sizing: border-box;
    padding: 16px;
  `
)

export default ColumnContent
