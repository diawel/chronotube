import { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export type CardWrapperPropsType = {
  scroller: HTMLElement | null
  children: ReactNode
}

const CardWrapper: React.FC<CardWrapperPropsType> = (props) => {
  const { scroller, children } = props
  const [scale, setScale] = useState(0.9)
  const wrapperRef = useRef(null)

  const adjustSize = () => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current as HTMLElement
      const distanceToCenter = Math.abs(
        document.body.clientWidth -
          wrapper.getBoundingClientRect().left -
          wrapper.getBoundingClientRect().right
      )
      if (distanceToCenter < wrapper.clientWidth)
        setScale(1 - (distanceToCenter * 0.1) / wrapper.clientWidth)
      else setScale(0.9)
    }
  }

  useEffect(() => {
    scroller?.addEventListener('scroll', adjustSize)
    return () => scroller?.removeEventListener('scroll', adjustSize)
  }, [scroller])
  useEffect(adjustSize, [])

  return (
    <Wrapper scale={scale} ref={wrapperRef}>
      {children}
    </Wrapper>
  )
}

type WrapperStyleType = {
  scale: number
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    & > * {
      transform: scale(${style.scale});
    }
    width: calc(100vw - 128px);
    max-width: calc(380px - 128px);
    scroll-snap-align: center;
    margin: 0 4px;
  `
)

export default CardWrapper
