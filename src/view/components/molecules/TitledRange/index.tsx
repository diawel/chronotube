import TextBlock from 'src/view/components/atoms/TextBlock'
import { color } from 'src/common/styles/color'
import styled from 'styled-components'

export type TitledRangePropsType = {
  title: string
  start: string
  end: string
}

const titleStyle = { color: color.black, size: '12px' }
const valueStyle = { color: color.black, size: '36px', weight: 'bold' }

const TitledRange: React.FC<TitledRangePropsType> = (props) => {
  const { title, start, end } = props
  return (
    <Wrapper>
      <TextBlock color={color.black} size="12px">
        {title}
      </TextBlock>
      <TextBlock {...valueStyle}>{start}</TextBlock>
      <TextBlock color={color.black} size="24px">
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
