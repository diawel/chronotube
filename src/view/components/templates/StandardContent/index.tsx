import { ReactNode } from 'react'
import styled from 'styled-components'
import Footer, { footerHeight } from '../../molecules/Footer'

export type StandardContentPropsType = {
  children: ReactNode
  hideFooter?: boolean
}

const StandardContent: React.FC<StandardContentPropsType> = (props) => {
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
  align-items: center;
`

const InnerWrapper = styled.div`
  width: 100%;
`

export default StandardContent
