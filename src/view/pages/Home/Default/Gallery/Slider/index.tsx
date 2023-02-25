import styled from 'styled-components'
import RoundBox from 'src/view/components/atoms/RoundBox'
import { color } from 'src/common/styles/color'

const Slider: React.FC = () => {
  return (
    <OuterWrapper>
      <InnerWrapper>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </InnerWrapper>
    </OuterWrapper>
  )
}

const OuterWrapper = styled.div`
  overflow: auto;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  padding: 0 50%;
`

const InnerWrapper = styled.div`
  display: flex;
  width: fit-content;
`

const Card = styled.div`
  width: calc(100vw - 128px);
  max-width: calc(440px - 128px);
  height: 300px;
  background: ${color.white};
  margin: 0 8px;
  scroll-snap-align: center;
`

export default Slider
