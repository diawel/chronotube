import { ReactNode, useContext } from 'react'
import styled from 'styled-components'
import { DeviceContext } from 'src/index'
import TitledValue from 'src/view/components/molecules/TitledValue'
import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'
import SideSlider from 'src/view/components/atoms/SideSlider'
import { dateToString } from 'src/common/utils/dateToString'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import SkeletonTitledValue from 'src/view/components/atoms/SkeletonBox/SkeletonTitledValue'
import { mlString } from 'src/common/utils/switchLanguages'

let cachedLiveQuery: any

const Abstract: React.FC = () => {
  const liveQuery =
    useLiveQuery(async () => {
      const channelsFetched = await subscription.meta.get('fetched')
      const latestHistory = await watchHistory.histories.toCollection().last()
      return {
        channelCount: await subscription.channels.count(),
        channelsFetchedAt: channelsFetched?.value as Date | undefined,
        historyCount: await watchHistory.histories.count(),
        latestPlaybackDate: latestHistory?.playbackDate,
      }
    }) || cachedLiveQuery

  let blocks: ReactNode[] = []

  if (liveQuery) {
    cachedLiveQuery = liveQuery

    blocks = [
      <>
        <TitledValue
          title={mlString({
            ja: '登録チャンネル数',
            en: 'Subscribed channels',
          })}
          value={
            liveQuery.channelCount ? liveQuery.channelCount.toString() : 'なし'
          }
        />
        <TitledValue
          title={mlString({
            ja: '総再生数',
            en: 'Total views',
          })}
          value={
            liveQuery.historyCount ? liveQuery.historyCount.toString() : 'なし'
          }
        />
      </>,
      <>
        <TitledValue
          title={mlString({
            ja: '登録チャンネル最終更新',
            en: 'Last subscriptions update',
          })}
          value={
            liveQuery.channelsFetchedAt
              ? dateToString(liveQuery.channelsFetchedAt)
              : 'なし'
          }
        />
        <TitledValue
          title={mlString({
            ja: '最新の再生履歴',
            en: 'Latest watch history',
          })}
          value={
            liveQuery.latestPlaybackDate
              ? dateToString(liveQuery.latestPlaybackDate)
              : 'なし'
          }
        />
      </>,
    ]
  } else {
    blocks = [
      <>
        <SkeletonTitledValue />
        <SkeletonTitledValue />
      </>,
      <>
        <SkeletonTitledValue />
        <SkeletonTitledValue />
      </>,
    ]
  }

  const deviceType = useContext(DeviceContext)
  switch (deviceType) {
    case 'mobile':
      return (
        <MobileWrapper>
          <SideSlider margin="16px">{blocks}</SideSlider>
        </MobileWrapper>
      )
    case 'pc':
      return (
        <PcWrapper>
          {blocks.map((block, index) => {
            return <InnerWrapper key={index}>{block}</InnerWrapper>
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
