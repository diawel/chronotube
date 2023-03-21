import Footer, { footerHeight } from 'src/view/components/molecules/Footer'
import styled from 'styled-components'
import Abstract from './Abstract'
import Control from './Control'
import Gallery from './Gallery'

const Default: React.FC = () => {
  return (
    <>
      <BodyWrapper>
        <Abstract />
        <Control />
        <Gallery />
      </BodyWrapper>
      <Footer />
    </>
  )
}

const BodyWrapper = styled.div`
  min-height: calc(100svh - ${footerHeight});
`

export default Default
