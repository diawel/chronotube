import TextBlock from 'src/view/components/atoms/TextBlock'
import { color } from 'src/common/styles/color'
import styled from 'styled-components'
import { fontSize } from 'src/common/styles/fontSize'

export type TitledValuePropsType = {
  title: string
  value: string
}

const TitledValue: React.FC<TitledValuePropsType> = (props) => {
  const { title, value } = props
  return (
    <Wrapper>
      <TextBlock color={color.black} size={fontSize.regular}>
        {title}
      </TextBlock>
      <TextBlock color={color.black} size={fontSize.title} weight="bold">
        {value}
      </TextBlock>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 4px;
`

export default TitledValue
