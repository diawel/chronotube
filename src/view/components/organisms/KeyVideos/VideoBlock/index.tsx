import EnclosedTitle from 'src/view/components/molecules/EnclosedTitle'
import VideoBox from 'src/view/components/molecules/VideoBox'
import styled from 'styled-components'

export type VideoBlockPropsType = {
  subtitle: string
  id: string
  title: string
  snippet: string
}

const VideoBlock: React.FC<VideoBlockPropsType> = (props) => {
  const { subtitle, id, title, snippet } = props
  return (
    <Wrapper>
      <TitleWrapper>
        <EnclosedTitle text={subtitle} />
      </TitleWrapper>
      <a
        href={id ? `https://www.youtube.com/watch?v=${id}` : undefined}
        target="_blank"
        rel="nofollow"
      >
        <VideoBox {...{ id, title, snippet }} />
      </a>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 48px;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`

export default VideoBlock
