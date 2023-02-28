import { color } from 'src/common/styles/color'
import { ThumbnailType } from 'src/common/utils/types/youtube'
import styled from 'styled-components'
import ClampedText from '../../atoms/ClampedText'
import RoundBox from '../../atoms/RoundBox'

export type ChannelCardPropsType = {
  thumbnail: ThumbnailType
  name: string
  snippet: string
}

const ChannelCard: React.FC<ChannelCardPropsType> = (props) => {
  const { thumbnail, name, snippet } = props
  return (
    <RoundBox shadow={`0px 16px 32px ${color.shadow}`} background={color.white}>
      <RoundBox
        shadow={`0px 16px 32px ${color.shadow}`}
        background={color.white}
      >
        <CoverImage src={thumbnail.url} />
      </RoundBox>
      <TextWrapper>
        <ClampedText
          lineClamp="1"
          color={color.black}
          size="12px"
          weight="bold"
        >
          {name}
        </ClampedText>
        <ClampedText
          lineClamp="1"
          color={color.black}
          size="18px"
          weight="bold"
        >
          {snippet}
        </ClampedText>
      </TextWrapper>
    </RoundBox>
  )
}

const CoverImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
`

const TextWrapper = styled.div`
  padding: 8px 16px 12px;
`

export default ChannelCard
