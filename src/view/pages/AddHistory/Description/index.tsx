import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import {
  getCurrentLanguage,
  ml,
  mlString,
} from 'src/common/utils/switchLanguages'
import TextBlock from 'src/view/components/atoms/TextBlock'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import TextWithFigure from 'src/view/components/molecules/TextWithFigure'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 80px;
`

const TitleWrapper = styled.div`
  margin-bottom: 16px;
`

const DescriptionImage = styled.img`
  width: 100%;
  mix-blend-mode: darken;
  border: 1px solid ${color.darkGray};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0 16px;
`

const Description: React.FC = () => {
  const currentLanguege = getCurrentLanguage()
  return (
    <Wrapper>
      <TitleWrapper>
        <TextBlock color={color.black} size={fontSize.medium} weight="bold">
          {ml({
            ja: '再生履歴の書き出し方',
            en: 'How to export your watch history',
          })}
        </TextBlock>
      </TitleWrapper>
      <TextWithFigure
        text={mlString({
          ja: 'Google データエクスポートにアクセスします。',
          en: 'Access Google Takeout from the button below.',
        })}
        figure={
          <a href="https://takeout.google.com/" target="_blank" rel="nofollow">
            <PrimaryButton
              text={mlString({
                ja: 'Google データエクスポート',
                en: 'Google Takeout',
              })}
            />
          </a>
        }
      />
      <TextWithFigure
        text={mlString({
          ja: '「YouTube と YouTube Music」の項目のみにチェックを付けます。',
          en: 'Check only "YouTube and YouTube Music".',
        })}
        figure={
          <DescriptionImage
            src={`/image/add_history-${currentLanguege}-0.png`}
          />
        }
      />
      <TextWithFigure
        text={mlString({
          ja: 'エクスポートする項目を「履歴」のみにします。',
          en: 'Select only "History".',
        })}
        figure={
          <DescriptionImage
            src={`/image/add_history-${currentLanguege}-1.png`}
          />
        }
      />
      <TextWithFigure
        text={mlString({
          ja: '履歴の形式を「JSON」にします。',
          en: 'Set the history format to "JSON".',
        })}
        figure={
          <DescriptionImage
            src={`/image/add_history-${currentLanguege}-2.png`}
          />
        }
      />
      <TextWithFigure
        text={mlString({
          ja: '画面下部に進んで「エクスポートを作成」します。',
          en: 'Scroll down and click "Create export".',
        })}
        figure={
          <DescriptionImage
            src={`/image/add_history-${currentLanguege}-3.png`}
          />
        }
      />
      <TextWithFigure
        text={mlString({
          ja: '完了後に届くメールから、データをダウンロードします。',
          en: 'Download the file from the email you will receive in a few minutes.',
        })}
        figure={
          <DescriptionImage
            src={`/image/add_history-${currentLanguege}-4.png`}
          />
        }
      />
    </Wrapper>
  )
}

export default Description
