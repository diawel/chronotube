import styled from 'styled-components'
import Footer, { footerHeight } from 'src/view/components/molecules/Footer'

export type FixedFooterPropsType = FooterBoxStyleType

type FooterBoxStyleType = {
  background: string
}

const FixedFooter: React.FC<FixedFooterPropsType> = (props) => {
  const { background } = props
  return (
    <FooterBox background={background}>
      <Footer />
    </FooterBox>
  )
}

const FooterBox = styled.div<FooterBoxStyleType>(
  (style) => `
    position: fixed;
    bottom: 0;
    width: 100%;
    background: ${style.background};
    box-shadow: 0 0 ${footerHeight} ${footerHeight} ${style.background};
  `
)

export default FixedFooter
