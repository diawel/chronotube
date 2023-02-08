import styled from 'styled-components'
import Wrap from 'src/view/components/atoms/Wrap'
import Footer from 'src/view/components/molecules/Footer'
import Content from './Content'

const NoData: React.FC = () => {
  return (
    <Wrap>
      <ContentWrapper>
        <Content />
      </ContentWrapper>
      <FooterBox>
        <Footer />
      </FooterBox>
    </Wrap>
  )
}

const ContentWrapper = styled.div`
  max-width: 320px;
  height: 100svh;
  margin: auto;
  display: flex;
  align-items: center;
`

const FooterBox = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`
export default NoData
