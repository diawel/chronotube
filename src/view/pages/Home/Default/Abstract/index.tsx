import { useContext } from 'react'
import styled from 'styled-components'
import { DeviceTypeContext } from 'src/index'
import TitledValue from 'src/view/components/molecules/TitledValue'
import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'
import SideSlider from 'src/view/components/atoms/SideSlider'
import Wrap from 'src/view/components/atoms/Wrap'
import { dateToString } from 'src/common/utils/dateToString'

const Abstract: React.FC = () => {
  const channels = useLiveQuery(async () => await subscription.channels.count())

  const channelsFetched: Date | undefined = useLiveQuery(
    async () => await subscription.meta.get('fetched')
  )?.value

  const Blocks = [
    <Wrap key={0}>
      <TitledValue
        title="登録チャンネル数"
        value={channels ? channels.toString() : ''}
      />
      <TitledValue title="総再生数" value="なし" />
    </Wrap>,
    <Wrap key={1}>
      <TitledValue
        title="登録チャンネル最終更新"
        value={channelsFetched ? dateToString(channelsFetched) : ''}
      />
      <TitledValue title="最新の再生履歴" value="なし" />
    </Wrap>,
  ]

  const deviceType = useContext(DeviceTypeContext)
  switch (deviceType) {
    case 'mobile':
      return (
        <MobileWrapper>
          <SideSlider margin="16px">{Blocks}</SideSlider>
        </MobileWrapper>
      )
    case 'pc':
      return (
        <PcWrapper>
          {Blocks.map((Block, index) => {
            return <InnerWrapper key={index}>{Block}</InnerWrapper>
          })}
        </PcWrapper>
      )
  }
}

const MobileWrapper = styled.div`
  padding: 36px 0 24px;
`

const PcWrapper = styled.div`
  padding: 36px 60px 24px;
`

const InnerWrapper = styled.div`
  display: inline-block;
  margin-right: 50px;
`

export default Abstract
