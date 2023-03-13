import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import styled from 'styled-components'
import ClampedText from '../../atoms/ClampedText'
import TextBlock from '../../atoms/TextBlock'

export type ListedVideoBoxPropsType = {
  id: string
  title: string
  snippet: string
}

const ListedVideoBox: React.FC<ListedVideoBoxPropsType> = (props) => {
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
          size={fontSize.small}
          weight="bold"
          lineClamp="1"
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
  height: 48px;
`

const Thumbnail = styled.img`
  height: 100%;
  margin-right: 12px;
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  object-fit: cover;
`

const TextBox = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`

export default ListedVideoBox
