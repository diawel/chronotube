import { ReactNode, useEffect, useRef } from 'react'
import { sessionStorageKey } from 'src/common/utils/sessionStorage'
import Button from 'src/view/components/atoms/Button'
import styled from 'styled-components'

export type CardWrapperPropsType = {
  id: string
  gap: string
  children: ReactNode
}

const CardWrapper: React.FC<CardWrapperPropsType> = (props) => {
  const { id, gap, children } = props
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem(sessionStorageKey.scrollAtList) == id) {
      const checkWrapperRendered = () => {
        if (wrapperRef.current)
          wrapperRef.current.scrollIntoView({ block: 'center' })
        else window.requestAnimationFrame(checkWrapperRendered)
      }
      checkWrapperRendered()
    }
  }, [])

  return (
    <Wrapper gap={gap} ref={wrapperRef}>
      <Button
        onClick={() => {
          sessionStorage.setItem(sessionStorageKey.scrollAtList, id)
        }}
      >
        {children}
      </Button>
    </Wrapper>
  )
}

type WrapperStyleType = {
  gap: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    width: 200px;
    max-width: calc(50% - ${style.gap});
    margin: 0 calc(${style.gap} / 2) ${style.gap};
    contain: layout;
  `
)

export default CardWrapper
