import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import styled from 'styled-components'
import ClampedText from '../../atoms/ClampedText'
import TextBlock from '../../atoms/TextBlock'

export type VideoBoxPropsType = {
  id: string
  title: string
  snippet: string
}

const VideoBox: React.FC<VideoBoxPropsType> = (props) => {
  const { id, title, snippet } = props
  return (
    <Container>
      <Thumbnail
        src={
          id
            ? `https://img.youtube.com/vi/${id}/mqdefault.jpg`
            : '/image/empty.svg'
        }
      />
      <TextBox>
        <ClampedText
          color={color.black}
          size={fontSize.regular}
          weight="bold"
          lineClamp="2"
        >
          {title}
        </ClampedText>
        <TextBlock color={color.black} size={fontSize.small}>
          {snippet}
        </TextBlock>
      </TextBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 72px;
`

const Thumbnail = styled.img`
  height: 100%;
  margin-right: 16px;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0px 16px 32px ${color.shadow};
`

const TextBox = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
`

export default VideoBox
