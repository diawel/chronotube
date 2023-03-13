import { ReactNode } from 'react'
import styled from 'styled-components'
import Footer, { footerHeight } from '../../molecules/Footer'

export type ColumnContentPropsType = {
  children: ReactNode
  hideFooter?: boolean
}

const ColumnContent: React.FC<ColumnContentPropsType> = (props) => {
  const { children, hideFooter } = props
  return (
    <>
      <OuterWrapper>
        <InnerWrapper>{children}</InnerWrapper>
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

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 384px;
  padding: 16px;
`

export default ColumnContent
