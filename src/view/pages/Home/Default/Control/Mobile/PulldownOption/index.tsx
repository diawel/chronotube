import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Text from 'src/view/components/atoms/Text'
import { color } from 'src/common/styles/color'

export type PulldownOptionType = {
  linkTo: string
  text: string
}

const PulldownOption: React.FC<PulldownOptionType> = (prop) => {
  const { linkTo, text } = prop

  return (
    <Link to={linkTo}>
      <Wrapper>
        <Text color={color.black} size="12px">
          {text}
        </Text>
      </Wrapper>
    </Link>
  )
}

const Wrapper = styled.div`
  padding: 8px 24px;
`

export default PulldownOption
