import { ReactNode } from 'react'
import { color } from 'src/common/styles/color'
import styled from 'styled-components'
import Wrap from '../../atoms/Wrap'
import FixedFooter from '../../molecules/FixedFooter'
import { footerHeight } from '../../molecules/Footer'

export type ColumnContentPropsType = {
  children: ReactNode
}

const ColumnContent: React.FC<ColumnContentPropsType> = (props) => {
  const { children } = props
  return (
    <Wrap>
      <OuterWrapper>
        <InnerWrapper>{children}</InnerWrapper>
      </OuterWrapper>
      <FixedFooter background={color.lightGray} />
    </Wrap>
  )
}

const OuterWrapper = styled.div`
  min-height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 384px;
  margin-bottom: calc(${footerHeight} * 2);
  padding: 16px;
`

export default ColumnContent
