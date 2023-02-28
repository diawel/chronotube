import Text, { TextPropsType } from 'src/view/components/atoms/Text'
import styled from 'styled-components'

export type TextBlockPropsType = TextPropsType & {
  lineClamp: string
}

const ClampedText: React.FC<TextBlockPropsType> = (props) => {
  const { lineClamp, color, size, weight, children } = props
  return (
    <ClampContainer {...{ lineClamp, color }}>
      <Text {...{ size, weight, children }} />
    </ClampContainer>
  )
}

type ClampContainerStyleType = {
  lineClamp: string
  color?: string
}

const ClampContainer = styled.div<ClampContainerStyleType>(
  (style) => `
    -webkit-line-clamp: ${style.lineClamp};
    color: ${style.color ? style.color : 'inherit'};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `
)

export default ClampedText
