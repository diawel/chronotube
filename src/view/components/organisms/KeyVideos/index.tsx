import { dateToString } from 'src/common/utils/dateToString'
import VideoBlock from './VideoBlock'
import { ChannelAbstractType } from 'src/common/utils/types/youtube'

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
        subtitle="はじめて再生した動画"
        id={firstPlayback?.id ?? ''}
        title={firstPlayback?.title ?? 'データがありません'}
        snippet={
          firstPlayback
            ? `${dateToString(firstPlayback.playbackDate)}に再生`
            : '不明'
        }
      />
      <VideoBlock
        subtitle="もっとも再生した動画"
        id={mostPlayedVideo?.id ?? ''}
        title={mostPlayedVideo?.title ?? 'データがありません'}
        snippet={
          mostPlayedVideo ? `${mostPlayedVideo.playCount}回再生` : '不明'
        }
      />
      <VideoBlock
        subtitle="出会う直前に再生した動画"
        id={triggerPlayback?.id ?? ''}
        title={triggerPlayback?.title ?? 'データがありません'}
        snippet={triggerPlayback ? triggerPlayback.uploader.name : '不明'}
      />
    </div>
  )
}

export default KeyVideos
