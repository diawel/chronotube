import { color } from 'src/common/styles/color'
import ArrowCircle from 'src/view/components/atoms/ArrowCircle'
import Button from 'src/view/components/atoms/Button'
import styled from 'styled-components'
import { cardOuterWidth } from '../CardContainer'

export type SliderControlPropsType = {
  scroller?: HTMLElement
}

const SliderControl: React.FC<SliderControlPropsType> = (props) => {
  const { scroller } = props

  const scrollBy = (amount: number) => {
    if (scroller) {
      scroller.scrollBy({
        left: amount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Container>
      <ButtonWrapper>
        <Button
          onClick={() => {
            scrollBy(-cardOuterWidth)
          }}
        >
          <ArrowCircle direction="LEFT" />
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => {
            scrollBy(cardOuterWidth)
          }}
        >
          <ArrowCircle direction="RIGHT" />
        </Button>
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 60px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ButtonWrapper = styled.div`
  border-radius: 50%;
  box-shadow: 0px 16px 32px ${color.shadow};
  z-index: 20;
  opacity: 0;
  transition: opacity 0.3s 0.3s;
  *:hover > ${Container} > & {
    opacity: 1;
  }
`

export default SliderControl
