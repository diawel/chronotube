import styled, { keyframes } from 'styled-components'
import { ReactNode } from 'react'
import RoundBox from 'src/view/components/atoms/RoundBox'
import { color } from 'src/common/styles/color'

export type PulldownListPropsType = {
  width: string
  isOpen: boolean
  isOpenSetter: (isOpen: boolean) => void
  children: ReactNode
}

const PulldownBox: React.FC<PulldownListPropsType> = (props) => {
  const { width, isOpen, isOpenSetter, children } = props

  const onClose = (): void => {
    isOpenSetter(false)
  }

  if (isOpen) {
    return (
      <Base>
        <Background onClick={onClose} />
        <Wrapper>
          <Container width={width}>
            <RoundBox
              shadow={`0px 16px 32px ${color.shadow}`}
              background={color.white}
            >
              <InnerWrapper>{children}</InnerWrapper>
            </RoundBox>
          </Container>
        </Wrapper>
      </Base>
    )
  } else {
    return <Base />
  }
}

const Base = styled.div`
  position: relative;
  z-index: 100;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const show = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const Wrapper = styled.div`
  animation: ${show} 0.15s ease-out both;
`

type ContainerStyleType = {
  width: string
}

const Container = styled.div<ContainerStyleType>(
  (style) => `
    width: ${style.width};
    position: absolute;
    top: 0;
    left: 0;
  `
)

const InnerWrapper = styled.div`
  padding: 12px 0;
`

export default PulldownBox
