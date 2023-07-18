import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import { ThumbnailType } from 'src/common/utils/types/youtube'
import styled from 'styled-components'
import ClampedText from '../../atoms/ClampedText'
import RoundBox from '../../atoms/RoundBox'
import NoTranslate from '../../atoms/NoTranslate'
import { ReactNode } from 'react'

export type ChannelCardPropsType = {
  thumbnail: ThumbnailType
  name: string
  snippet: ReactNode
  listed?: boolean
}

const ChannelCard: React.FC<ChannelCardPropsType> = (props) => {
  const { thumbnail, name, snippet, listed } = props
  return (
    <RoundBox background={color.white}>
      <CoverImage src={thumbnail.url} />
      <TextWrapper>
        <ClampedText
          lineClamp="1"
          color={color.black}
          size={listed ? fontSize.regular : fontSize.medium}
          weight="bold"
        >
          <NoTranslate>{name}</NoTranslate>
        </ClampedText>
        <ClampedText
          lineClamp="1"
          color={color.black}
          size={listed ? fontSize.small : fontSize.regular}
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
  box-shadow: 0px 16px 32px ${color.shadow};
  border-radius: 24px;
`

const TextWrapper = styled.div`
  padding: 8px 16px 12px;
`

export default ChannelCard
