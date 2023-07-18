import { useContext } from 'react'
import { color } from 'src/common/styles/color'
import Text from '../../atoms/Text'
import styled from 'styled-components'
import { DeviceContext } from 'src/index'
import { Link } from 'react-router-dom'
import { fontSize } from 'src/common/styles/fontSize'
import { ml } from 'src/common/utils/switchLanguages'

export const footerHeight = '40px'

const Footer: React.FC = () => {
  const deviceType = useContext(DeviceContext)
  switch (deviceType) {
    case 'mobile':
      return (
        <StyledFooter justify="space-between">{FooterContent}</StyledFooter>
      )
    case 'pc':
      return <StyledFooter justify="flex-end">{FooterContent}</StyledFooter>
  }
}

const textStyle = { color: color.darkGray, size: fontSize.small }

const TextWrapper = styled.div`
  margin: 8px;
`

const FooterContent = (
  <>
    <a href="https://diawel.me/">
      <TextWrapper>
        <Text {...textStyle}>diawel.me</Text>
      </TextWrapper>
    </a>
    <Link to="/privacy">
      <TextWrapper>
        <Text {...textStyle}>
          {ml({
            ja: 'プライバシーポリシー',
            en: 'Privacy Policy',
          })}
        </Text>
      </TextWrapper>
    </Link>
  </>
)

type StyledFoterStyleType = { justify: string }

const StyledFooter = styled.footer<StyledFoterStyleType>(
  (style) => `
    margin: 0 8px;
    display: flex;
    justify-content: ${style.justify};
    height: ${footerHeight};
  `
)

export default Footer
