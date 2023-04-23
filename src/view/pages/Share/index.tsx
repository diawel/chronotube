import { useLocation, useNavigate } from 'react-router-dom'
import { color } from 'src/common/styles/color'
import Ad from 'src/view/components/atoms/Ad'
import styled, { keyframes } from 'styled-components'
import InitPage from '../util/InitPage'
import IconBox from './IconBox'
import KeyVideos from 'src/view/components/organisms/KeyVideos'
import { useEffect, useState } from 'react'
import * as t from 'io-ts'
import { isRight } from 'fp-ts/lib/These'
import SkeletonIconBox from './SkeletonIconBox'
import SkeletonKeyVideos from 'src/view/components/atoms/SkeletonBox/SkeletonKeyVideos'
import ChannelColumns from 'src/view/components/templates/ChannelColumns'
import Engage from './Engage'

const SharedChannel = t.type({
  id: t.string,
  name: t.string,
  subscribeDate: t.string,
  playCount: t.number,
})

const SharedData = t.type({
  channel: SharedChannel,
  firstPlayback: t.union([
    t.type({
      id: t.string,
      title: t.string,
      playbackDate: t.string,
    }),
    t.undefined,
  ]),
  mostPlayedVideo: t.union([
    t.type({
      id: t.string,
      title: t.string,
      playCount: t.number,
    }),
    t.undefined,
  ]),
  triggerPlayback: t.union([
    t.type({
      id: t.string,
      title: t.string,
      uploader: t.type({
        id: t.string,
        name: t.string,
      }),
    }),
    t.undefined,
  ]),
})

export type SharedChannelType = t.TypeOf<typeof SharedChannel>
export type SharedDataType = t.TypeOf<typeof SharedData>

const Share: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sharedData, setSharedData] = useState<SharedDataType | undefined>()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    let parsed
    try {
      parsed = JSON.parse(searchParams.get('d') ?? '')
    } catch {}
    const decoded = SharedData.decode(parsed)
    if (isRight(decoded)) setSharedData(decoded.right)
    else navigate('/', { replace: true })
  }, [location])

  let abstractColumnInner, detailColumnInner

  if (sharedData) {
    const { channel, firstPlayback, mostPlayedVideo, triggerPlayback } =
      sharedData

    abstractColumnInner = <IconBox channel={channel} />
    detailColumnInner = (
      <>
        <KeyVideos
          firstPlayback={
            firstPlayback
              ? {
                  id: firstPlayback.id,
                  title: firstPlayback.title,
                  playbackDate: new Date(firstPlayback.playbackDate),
                }
              : undefined
          }
          mostPlayedVideo={
            mostPlayedVideo
              ? {
                  id: mostPlayedVideo.id,
                  title: mostPlayedVideo.title,
                  playCount: mostPlayedVideo.playCount,
                }
              : undefined
          }
          triggerPlayback={
            triggerPlayback
              ? {
                  id: triggerPlayback.id,
                  title: triggerPlayback.title,
                  uploader: triggerPlayback.uploader,
                }
              : undefined
          }
        />
        <Engage />
      </>
    )
  } else {
    abstractColumnInner = <SkeletonIconBox />
    detailColumnInner = <SkeletonKeyVideos />
  }

  detailColumnInner = (
    <>
      {detailColumnInner}
      <AdWrapper>
        <Ad />
      </AdWrapper>
    </>
  )

  return (
    <Wrapper>
      <InitPage
        themeColor={color.white}
        pageTitle="シェアされた結果 | Chronotube"
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

export default Share
