import { VideoType } from 'src/common/utils/types/youtube'
import styled from 'styled-components'
import { History } from 'src/common/utils/db/watchHistory'
import { dateToString } from 'src/common/utils/dateToString'
import VideoBlock from './VideoBlock'

export type KeyVideosPropsType = {
  firstPlayback?: History
  mostPlayedVideo?: VideoType & { playCount: number }
  triggerPlayback?: History
}

const KeyVideos: React.FC<KeyVideosPropsType> = (props) => {
  const { firstPlayback, mostPlayedVideo, triggerPlayback } = props
  return (
    <Wrapper>
      <VideoBlock
        subtitle="はじめて再生した動画"
        id={firstPlayback?.id || ''}
        title={firstPlayback?.title || 'データがありません'}
        snippet={
          firstPlayback
            ? `${dateToString(firstPlayback.playbackDate)}に再生`
            : '不明'
        }
      />
      <VideoBlock
        subtitle="もっとも再生した動画"
        id={mostPlayedVideo?.id || ''}
        title={mostPlayedVideo?.title || 'データがありません'}
        snippet={
          mostPlayedVideo ? `${mostPlayedVideo.playCount}回再生` : '不明'
        }
      />
      <VideoBlock
        subtitle="出会う直前に再生した動画"
        id={triggerPlayback?.id || ''}
        title={triggerPlayback?.title || 'データがありません'}
        snippet={triggerPlayback ? triggerPlayback.uploader.name : '不明'}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 64px;
`

export default KeyVideos
