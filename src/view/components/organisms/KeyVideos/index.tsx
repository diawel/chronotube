import { dateToString } from 'src/common/utils/dateToString'
import VideoBlock from './VideoBlock'
import { ChannelAbstractType } from 'src/common/utils/types/youtube'
import NoTranslate from '../../atoms/NoTranslate'
import { ml, mlString } from 'src/common/utils/switchLanguages'

export type KeyVideosPropsType = {
  firstPlayback?: { id: string; title: string; playbackDate: Date }
  mostPlayedVideo?: { id: string; title: string; playCount: number }
  triggerPlayback?: {
    id: string
    title: string
    uploader: ChannelAbstractType
  }
}

const KeyVideos: React.FC<KeyVideosPropsType> = (props) => {
  const { firstPlayback, mostPlayedVideo, triggerPlayback } = props
  return (
    <div>
      <VideoBlock
        subtitle={mlString({
          ja: 'はじめて再生した動画',
          en: 'First viewed',
        })}
        id={firstPlayback?.id}
        title={firstPlayback?.title}
        snippet={
          firstPlayback
            ? ml({
                ja: `${dateToString(firstPlayback.playbackDate)}に再生`,
                en: `Played on ${dateToString(firstPlayback.playbackDate)}`,
              })
            : ml({ ja: '不明', en: 'Unknown' })
        }
      />
      <VideoBlock
        subtitle={mlString({
          ja: 'もっとも再生した動画',
          en: 'Most viewed',
        })}
        id={mostPlayedVideo?.id}
        title={mostPlayedVideo?.title}
        snippet={
          mostPlayedVideo
            ? ml({
                ja: `${mostPlayedVideo.playCount}回再生`,
                en: `${mostPlayedVideo.playCount} views`,
              })
            : ml({ ja: '不明', en: 'Unknown' })
        }
      />
      <VideoBlock
        subtitle={mlString({
          ja: '出会う直前に再生した動画',
          en: 'Viewed just before encounter',
        })}
        id={triggerPlayback?.id}
        title={triggerPlayback?.title}
        snippet={
          triggerPlayback ? (
            <NoTranslate>{triggerPlayback.uploader.name}</NoTranslate>
          ) : (
            ml({ ja: '不明', en: 'Unknown' })
          )
        }
      />
    </div>
  )
}

export default KeyVideos
