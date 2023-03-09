import { ReactNode, useContext } from 'react'
import styled from 'styled-components'
import { DeviceTypeContext } from 'src/index'
import TitledValue from 'src/view/components/molecules/TitledValue'
import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'
import SideSlider from 'src/view/components/atoms/SideSlider'
import Wrap from 'src/view/components/atoms/Wrap'
import { dateToString } from 'src/common/utils/dateToString'
import { watchHistory } from 'src/common/utils/db/watchHistory'

const Abstract: React.FC = () => {
  const liveQuery = useLiveQuery(async () => {
    const channelsFetched = await subscription.meta.get('fetched')
    const latestHistory = await watchHistory.histories.toCollection().last()
    return {
      channelCount: await subscription.channels.count(),
      channelsFetchedAt: channelsFetched?.value as Date | undefined,
      historyCount: await watchHistory.histories.count(),
      latestPlaybackDate: latestHistory?.playbackDate,
    }
  })

  let Blocks: ReactNode[] = []

  if (liveQuery) {
    Blocks = [
      <Wrap key={0}>
        <TitledValue
          title="登録チャンネル数"
          value={
            liveQuery.channelCount ? liveQuery.channelCount.toString() : 'なし'
          }
        />
        <TitledValue
          title="総再生数"
          value={
            liveQuery.historyCount ? liveQuery.historyCount.toString() : 'なし'
          }
        />
      </Wrap>,
      <Wrap key={1}>
        <TitledValue
          title="登録チャンネル最終更新"
          value={
            liveQuery.channelsFetchedAt
              ? dateToString(liveQuery.channelsFetchedAt)
              : 'なし'
          }
        />
        <TitledValue
          title="最新の再生履歴"
          value={
            liveQuery.latestPlaybackDate
              ? dateToString(liveQuery.latestPlaybackDate)
              : 'なし'
          }
        />
      </Wrap>,
    ]
  }

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
