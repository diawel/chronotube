import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import { ml, mlString } from 'src/common/utils/switchLanguages'
import { DeviceContext } from 'src/index'
import TextBlock from 'src/view/components/atoms/TextBlock'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'

const Engage: React.FC = () => {
  const deviceType = useContext(DeviceContext)

  return (
    <Wrapper padding={deviceType == 'mobile' ? '16px' : '24px'}>
      <TextWrapper>
        <TextBlock color={color.black} size={fontSize.large} weight="bold">
          {ml({
            ja: 'YouTubeにログインして、#あなたの推し履歴 が確認できます。',
            en: 'Log in to YouTube to see #YourFavoriteHistory.',
          })}
        </TextBlock>
      </TextWrapper>
      <Link to="/">
        <PrimaryButton
          text={mlString({
            ja: '#わたしの推し履歴 を調べる',
            en: 'Check #MyFavoriteHistory',
          })}
        />
      </Link>
    </Wrapper>
  )
}

type WrapperStyleType = {
  padding: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    padding: ${style.padding};
    border-radius: 24px;
    background: ${color.lightGray};
    margin: 64px auto;
  `
)

const TextWrapper = styled.div`
  margin-bottom: 48px;
`

export default Engage
