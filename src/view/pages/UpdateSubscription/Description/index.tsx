import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import TextBlock from 'src/view/components/atoms/TextBlock'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'
import DescriptionSection from './DescriptionSection'
import Text from 'src/view/components/atoms/Text'

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
        ブランドアカウントを使用している場合
      </TextBlock>
    </TitleWrapper>
    <DescriptionSection
      text={
        <>
          Google
          アカウントの仕様により、2回目以降のログインで、ブランドアカウントが選択できないことがあります。その場合には以下のボタンから、
          <Text weight="bold">選びたいブランドアカウントを含まない</Text>
          アカウントでもログインしておくことで、ブランドアカウントが選択できるようになります。
        </>
      }
      figure={
        <a
          href="https://accounts.google.com/AddSession"
          target="_blank"
          rel="nofollow"
        >
          <PrimaryButton text="Google アカウントを追加" />
        </a>
      }
    />
  </Wrapper>
)

export default Description
