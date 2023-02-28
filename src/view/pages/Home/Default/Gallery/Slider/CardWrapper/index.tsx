import { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export type CardWrapperPropsType = {
  scroller: HTMLElement | null
  filter: string
  children: ReactNode
}

const CardWrapper: React.FC<CardWrapperPropsType> = (props) => {
  const { scroller, filter, children } = props
  const [scale, setScale] = useState(0.9)
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef(null)

  const adjustSize = () => {
    if (containerRef.current) {
      const wrapper = containerRef.current as HTMLElement
      const width = document.body.clientWidth
      const { left, right } = wrapper.getBoundingClientRect()
      if (-width < right && left < 2 * width) {
        setIsVisible(true)
        const distanceToCenter = Math.abs(width - left - right)
        if (distanceToCenter < wrapper.clientWidth) {
          setScale(1 - (distanceToCenter * 0.1) / wrapper.clientWidth)
        } else {
          setScale(0.9)
        }
      } else {
        setIsVisible(false)
      }
    }
  }

  useEffect(() => {
    scroller?.addEventListener('scroll', adjustSize)
    return () => scroller?.removeEventListener('scroll', adjustSize)
  }, [scroller])
  useEffect(adjustSize, [filter])

  return (
    <Container ref={containerRef}>
      {isVisible ? <Wrapper scale={scale}>{children}</Wrapper> : ''}
    </Container>
  )
}

const Container = styled.div`
  width: calc(380px - 128px);
  height: 320px;
  scroll-snap-align: center;
  margin: 0 4px;
`

type WrapperStyleType = {
  scale: number
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    & > * {
      transform: scale(${style.scale});
    }
    display: content;
  `
)

export default CardWrapper
