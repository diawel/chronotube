import { color } from 'src/common/styles/color'
import styled from 'styled-components'
import TextBlock from 'src/view/components/atoms/TextBlock'
import { fontSize } from 'src/common/styles/fontSize'
import { ml } from 'src/common/utils/switchLanguages'

const Abstract: React.FC = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <TextBlock color={color.black} size={fontSize.title} weight="bold">
          404 Not Found
        </TextBlock>
      </TitleWrapper>
      <TextBlock color={color.black} size={fontSize.regular}>
        {ml({
          ja: 'このページは存在しません。URLを変えるか、初めからお試しください。',
          en: 'This page does not exist. Please change the URL or try again.',
        })}
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
