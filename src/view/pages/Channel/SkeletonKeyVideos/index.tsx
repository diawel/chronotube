import { VideoType } from 'src/common/utils/types/youtube'
import styled from 'styled-components'
import { History } from 'src/common/utils/db/watchHistory'
import { dateToString } from 'src/common/utils/dateToString'
import VideoBlock from './VideoBlock'

const SkeletonKeyVideos: React.FC = () => {
  return (
    <Wrapper>
      <VideoBlock subtitle="はじめて再生した動画" />
      <VideoBlock subtitle="もっとも再生した動画" />
      <VideoBlock subtitle="出会う直前に再生した動画" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 64px;
`

export default SkeletonKeyVideos
