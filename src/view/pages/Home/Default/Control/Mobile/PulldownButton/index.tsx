import styled from 'styled-components'
import { color } from 'src/common/styles/color'
import RoundBox from 'src/view/components/atoms/RoundBox'
import Button from 'src/view/components/atoms/Button'

export type PulldownButtonType = {
  isOpen: boolean
  isOpenSetter: (isOpen: boolean) => void
}

const PulldownButton: React.FC<PulldownButtonType> = (props) => {
  const { isOpen, isOpenSetter } = props

  const onClick = (): void => {
    isOpenSetter(!isOpen)
  }

  return (
    <Button onClick={onClick}>
      <RoundBox background={color.white}>
        <InnerWrapper>
          <StyledImage
            src="/image/chevron-down.svg"
            rotate={isOpen ? '180deg' : '0'}
          />
        </InnerWrapper>
      </RoundBox>
    </Button>
  )
}

const InnerWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`

type ImageStyleType = {
  rotate: string
}

const StyledImage = styled.img<ImageStyleType>(
  (style) => `
    width: 12px;
    transform: rotate(${style.rotate});
  `
)

export default PulldownButton
