import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import styled from 'styled-components'
import Text from '../../atoms/Text'

export type SmallButtonPropsType = {
  text: string
}

const SmallButton: React.FC<SmallButtonPropsType> = (props) => {
  const { text } = props
  return (
    <Container>
      <Text color={color.black} size={fontSize.small}>
        {text}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  display: inline-block;
  padding: 4px 24px 6px;
  border: solid 1px ${color.black};
  border-radius: 24px;
`

export default SmallButton
