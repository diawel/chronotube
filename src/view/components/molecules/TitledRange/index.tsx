import TextBlock from 'src/view/components/atoms/TextBlock'
import { color } from 'src/common/styles/color'
import styled from 'styled-components'
import { fontSize } from 'src/common/styles/fontSize'

export type TitledRangePropsType = {
  title: string
  start: string
  end: string
}

const valueStyle = { color: color.black, size: fontSize.title, weight: 'bold' }

const TitledRange: React.FC<TitledRangePropsType> = (props) => {
  const { title, start, end } = props
  return (
    <Wrapper>
      <TextBlock color={color.black} size={fontSize.regular}>
        {title}
      </TextBlock>
      <TextBlock {...valueStyle}>{start}</TextBlock>
      <TextBlock color={color.black} size={fontSize.large}>
        ↓
      </TextBlock>
      <TextBlock {...valueStyle}>{end}</TextBlock>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 4px;
`

export default TitledRange
