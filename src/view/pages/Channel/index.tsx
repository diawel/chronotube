import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { color } from 'src/common/styles/color'
import { subscription } from 'src/common/utils/db/subscription'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import { VideoType } from 'src/common/utils/types/youtube'
import Ad from 'src/view/components/atoms/Ad'
import EngageAddHistory from 'src/view/components/organisms/EngageAddHistory'
import styled, { keyframes } from 'styled-components'
import InitPage from '../util/InitPage'
import ChannelHystory from './ChannelHistory'
import IconBox from './IconBox'
import KeyVideos from './KeyVideos'
import SkeletonIconBox from './SkeletonIconBox'
import SkeletonKeyVideos from './SkeletonKeyVideos'
import ChannelColumns from 'src/view/components/templates/ChannelColumns'

const Channel: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  if (!id) return <></>

  const ad = (
    <AdWrapper>
      <Ad />
    </AdWrapper>
  )

  const liveQuery = useLiveQuery(async () => {
    const channel = await subscription.channels.get(id)
    const firstPlayback = await watchHistory.histories
      .where({ 'uploader.id': id })
      .first()
    const channelHistories = await watchHistory.histories
      .where({ 'uploader.id': id })
      .toArray()
    const channelVideos: {
      [key: string]: VideoType & { playCount: number }
    } = {}
    channelHistories.forEach((history) => {
      if (!channelVideos[history.id])
        channelVideos[history.id] = { ...history, playCount: 0 }
      channelVideos[history.id].playCount++
    })

    return {
      historyCount: await watchHistory.histories.count(), // 再生履歴の有効性確認用
      channel: channel,
      firstPlayback: firstPlayback,
      mostPlayedVideo: Object.values(channelVideos).length
        ? Object.values(channelVideos).reduce((a, b) =>
            a.playCount > b.playCount ? a : b
          )
        : undefined,
      triggerPlayback: firstPlayback
        ? await watchHistory.histories
            .where('playbackDate')
            .below(firstPlayback.playbackDate)
            .last()
        : undefined,
      channelHistories: channelHistories,
    }
  })

  let abstractColumnInner, detailColumnInner, channelName

  if (liveQuery) {
    if (!liveQuery.channel) {
      navigate('/', { replace: true })
      return <></>
    }

    const {
      historyCount,
      channel,
      firstPlayback,
      mostPlayedVideo,
      triggerPlayback,
      channelHistories,
    } = liveQuery

    channelName = channel.name

    abstractColumnInner = (
      <IconBox channel={channel} withPlayCount={historyCount > 0} />
    )

    if (historyCount)
      detailColumnInner = (
        <>
          <KeyVideos
            firstPlayback={firstPlayback}
            mostPlayedVideo={mostPlayedVideo}
            triggerPlayback={triggerPlayback}
          />
          {ad}
          <ChannelHystory
            histories={channelHistories}
            subscribeDate={channel.subscribeDate}
          />
        </>
      )
    else
      detailColumnInner = (
        <>
          <EngageAddHistory />
          <BlurBox>
            <KeyVideos
              firstPlayback={firstPlayback}
              mostPlayedVideo={mostPlayedVideo}
              triggerPlayback={triggerPlayback}
            />
          </BlurBox>
          {ad}
        </>
      )
  } else {
    abstractColumnInner = <SkeletonIconBox />
    detailColumnInner = <SkeletonKeyVideos />
  }

  return (
    <Wrapper>
      <InitPage
        themeColor={color.white}
        pageTitle={channelName ? `${channelName} | Chronotube` : 'Chronotube'}
      />
      <ChannelColumns
        abstractColumn={abstractColumnInner}
        detailColumn={detailColumnInner}
      />
    </Wrapper>
  )
}

const show = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const Wrapper = styled.div`
  animation: ${show} 0.3s ease-out both;
`

const BlurBox = styled.div`
  filter: blur(2px);
`

const AdWrapper = styled.div`
  margin: 64px 0;
`

export default Channel
