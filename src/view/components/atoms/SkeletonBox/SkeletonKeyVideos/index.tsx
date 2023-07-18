import styled from 'styled-components'
import VideoBlock from './VideoBlock'
import { mlString } from 'src/common/utils/switchLanguages'

const SkeletonKeyVideos: React.FC = () => {
  return (
    <Wrapper>
      <VideoBlock
        subtitle={mlString({
          ja: 'はじめて再生した動画',
          en: 'First watched',
        })}
      />
      <VideoBlock
        subtitle={mlString({
          ja: 'もっとも再生した動画',
          en: 'Most views',
        })}
      />
      <VideoBlock
        subtitle={mlString({
          ja: '出会う直前に再生した動画',
          en: 'Viewed just before encounter',
        })}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 64px;
`

export default SkeletonKeyVideos
