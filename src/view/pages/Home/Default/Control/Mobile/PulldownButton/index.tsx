import styled from 'styled-components'
import Button from 'src/view/components/atoms/Button'
import ArrowCircle from 'src/view/components/atoms/ArrowCircle'

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
    <Wrapper>
      <Button onClick={onClick}>
        <ArrowCircle direction={isOpen ? 'UP' : 'DOWN'} />
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-srink: 0;
`

export default PulldownButton
