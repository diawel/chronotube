import styled from 'styled-components'
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
        <Wrapper width={width}>
          <RoundBox
            shadow={`0px 16px 32px ${color.shadow}`}
            background={color.white}
          >
            <InnerWrapper>{children}</InnerWrapper>
          </RoundBox>
        </Wrapper>
      </Base>
    )
  } else {
    return <Base />
  }
}

const Base = styled.div`
  position: relative;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

type WrapperStyleType = {
  width: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    position: absolute;
    top: 0;
    left: 0;
    width: ${style.width}
  `
)

const InnerWrapper = styled.div`
  padding: 12px 0;
`

export default PulldownBox
