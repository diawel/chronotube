import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import TextBlock from 'src/view/components/atoms/TextBlock'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'
import DescriptionSection from './DescriptionSection'

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

const Description = (
  <Wrapper>
    <TitleWrapper>
      <TextBlock color={color.black} size={fontSize.medium} weight="bold">
        再生履歴の書き出し方
      </TextBlock>
    </TitleWrapper>
    <DescriptionSection
      text="Google データエクスポートにアクセスします。"
      figure={
        <a href="https://takeout.google.com/" target="_blank" rel="nofollow">
          <PrimaryButton text="Google データエクスポート" />
        </a>
      }
    />
    <DescriptionSection
      text="「YouTube と YouTube Music」の項目のみにチェックを付けます。"
      figure={<DescriptionImage src="/image/addhistory_0.png" />}
    />

    <DescriptionSection
      text="エクスポートする項目を「履歴」のみにします。"
      figure={<DescriptionImage src="/image/addhistory_1.png" />}
    />
    <DescriptionSection
      text="履歴の形式を「JSON」にします。"
      figure={<DescriptionImage src="/image/addhistory_2.png" />}
    />
    <DescriptionSection
      text="画面下部に進んで「エクスポートを作成」します。"
      figure={<DescriptionImage src="/image/addhistory_3.png" />}
    />
    <DescriptionSection
      text="完了後に届くメールから、データをダウンロードします。"
      figure={<DescriptionImage src="/image/addhistory_4.png" />}
    />
  </Wrapper>
)

export default Description
