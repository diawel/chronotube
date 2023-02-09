import { ReactNode } from 'react'
import { color } from 'src/styles/color'
import styled from 'styled-components'
import Wrap from '../../atoms/Wrap'
import FixedFooter from '../../molecules/FixedFooter'

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
  max-width: 360px;
  margin-bottom: 80px;
  padding: 16px;
`

export default ColumnContent
