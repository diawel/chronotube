import styled from 'styled-components'
import Text from 'src/view/components/atoms/Text'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'

export type SnippetPropsType = {
  text: string
}

const Snippet: React.FC<SnippetPropsType> = (props) => {
  const { text } = props
  return (
    <Wrapper>
      <Text color={color.black} size={fontSize.small}>
        {text}
      </Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 4px;
`

export default Snippet
