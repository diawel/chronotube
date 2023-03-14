import { color } from 'src/common/styles/color'
import styled from 'styled-components'
import TextBlock from 'src/view/components/atoms/TextBlock'
import { fontSize } from 'src/common/styles/fontSize'

const Abstract: React.FC = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <TextBlock color={color.black} size={fontSize.title} weight="bold">
          404 Not Found
        </TextBlock>
      </TitleWrapper>
      <TextBlock color={color.black} size={fontSize.regular}>
        このページは存在しません。URLを変えるか、初めからお試しください。
      </TextBlock>
    </Wrapper>
  )
}

const TitleWrapper = styled.div`
  margin-bottom: 8px;
`

const Wrapper = styled.div`
  padding: 64px 0;
`

export default Abstract
