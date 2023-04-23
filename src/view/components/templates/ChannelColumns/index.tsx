import { ReactNode, useContext } from 'react'
import { color } from 'src/common/styles/color'
import { DeviceContext } from 'src/index'
import styled from 'styled-components'

export type ChannelColumnsPruopsType = {
  abstractColumn: ReactNode
  detailColumn: ReactNode
}

const ChannelColumns: React.FC<ChannelColumnsPruopsType> = (props) => {
  const { abstractColumn, detailColumn } = props
  const deviceType = useContext(DeviceContext)

  switch (deviceType) {
    case 'mobile':
      return (
        <MobileContainer>
          <AbstractWrapper>{abstractColumn}</AbstractWrapper>
          <DetailColumn padding="0" margin="0 auto">
            {detailColumn}
          </DetailColumn>
        </MobileContainer>
      )
    case 'pc':
      return (
        <PcContainer>
          <AbstractColumn>{abstractColumn}</AbstractColumn>
          <DetailColumn padding="108px 24px" margin="0">
            {detailColumn}
          </DetailColumn>
        </PcContainer>
      )
  }
}

const PcContainer = styled.div`
  background: ${color.white};
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-evenly;
  margin-top: -8px;
  padding-top: 8px;
`

const AbstractColumn = styled.div`
  width: 280px;
  height: 100svh;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
`

type DetailColumnWrapperStyleType = {
  padding: string
  margin: string
}

const DetailColumn = styled.div<DetailColumnWrapperStyleType>(
  (style) => `
    padding: ${style.padding};
    margin: ${style.margin};
    width: 100%;
    max-width: 440px;
  `
)

const MobileContainer = styled.div`
  background: ${color.white};
  min-height: 100vh;
  padding: calc(64px + 8px) 16px 64px;
  margin-top: -8px;
`

const AbstractWrapper = styled.div`
  width: 100%;
  max-width: 240px;
  margin: 0 auto 64px;
  display: flex;
  justify-content: center;
`

export default ChannelColumns
