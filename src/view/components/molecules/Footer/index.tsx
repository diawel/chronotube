import { useContext } from 'react'
import { color } from 'src/common/styles/color'
import Text from '../../atoms/Text'
import styled from 'styled-components'
import { DeviceTypeContext } from 'src/index'
import Wrap from '../../atoms/Wrap'
import { Link } from 'react-router-dom'

export const footerHeight = '40px'

const Footer: React.FC = () => {
  const deviceType = useContext(DeviceTypeContext)
  switch (deviceType) {
    case 'mobile':
      return (
        <StyledFooter justify="space-between">{FooterContent}</StyledFooter>
      )
    case 'pc':
      return <StyledFooter justify="flex-end">{FooterContent}</StyledFooter>
  }
}

const textStyle = { color: color.darkGray, size: '12px' }

const TextWrapper = styled.div`
  margin: 8px;
`

const FooterContent = (
  <Wrap>
    <a href="https://diawel.me/">
      <TextWrapper>
        <Text {...textStyle}>diawel.me</Text>
      </TextWrapper>
    </a>
    <Link to="/privacy">
      <TextWrapper>
        <Text {...textStyle}>プライバシーポリシー</Text>
      </TextWrapper>
    </Link>
  </Wrap>
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
