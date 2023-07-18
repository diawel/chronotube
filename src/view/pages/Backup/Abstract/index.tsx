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
          {ml({
            ja: '再生履歴をバックアップ',
            en: 'Backup watch history',
          })}
        </TextBlock>
      </TitleWrapper>
      <TextBlock color={color.black} size={fontSize.regular}>
        {ml({
          ja: 'バックアップした再生履歴は、「再生履歴を追加」から復元できます。',
          en: 'You can restore your watch history from "Add watch history" page.',
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
