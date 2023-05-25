import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import LoadingIcon from 'src/view/components/atoms/LoadingIcon'
import TextBlock from 'src/view/components/atoms/TextBlock'
import styled from 'styled-components'

export type LoadingPropsType = {
  loadingSnippet: string
}

const Loading: React.FC<LoadingPropsType> = (props) => {
  const { loadingSnippet } = props

  return (
    <Wrapper>
      <IconWrapper>
        <LoadingIcon />
      </IconWrapper>
      <TextBlock color={color.black} size={fontSize.small}>
        {loadingSnippet}
      </TextBlock>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconWrapper = styled.div`
  padding: 32px;
`

export default Loading
