import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
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
          YouTubeにログインして、#あなたの推し履歴 が確認できます。
        </TextBlock>
      </TextWrapper>
      <Link to="/">
        <PrimaryButton text="#わたしの推し履歴 を調べる" />
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
