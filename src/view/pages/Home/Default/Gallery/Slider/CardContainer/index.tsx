import { ReactNode, useEffect, useRef, useState } from 'react'
import { sessionStorageKey } from 'src/common/utils/sessionStorage'
import styled, { keyframes } from 'styled-components'

export type CardContainerPropsType = {
  scroller: HTMLElement | null
  filter: string
  id: string
  index: number
  children: ReactNode
}

export const cardWidth = 380 - 128
const sideMargin = 4
export const cardOuterWidth = cardWidth + sideMargin * 2

const CardContainer: React.FC<CardContainerPropsType> = (props) => {
  const { scroller, filter, id, index, children } = props
  const [scale, setScale] = useState(0.9)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)
  const [inited, setInited] = useState(false)

  useEffect(() => {
    if (scroller) {
      if (sessionStorage.getItem(sessionStorageKey.scrollAtGallery) == id)
        scroller.scroll(cardOuterWidth * index + cardWidth / 2, 0)
      setInited(true)
    }
  }, [scroller, filter])

  const adjustStyle = () => {
    if (containerRef.current) {
      const wrapper = containerRef.current as HTMLElement
      const width = document.body.clientWidth
      const { left, right } = wrapper.getBoundingClientRect()
      if (-width < right && left < 2 * width) {
        setIsVisible(true)
        const distanceToCenter = Math.abs(width - left - right)
        if (distanceToCenter < wrapper.clientWidth) {
          sessionStorage.setItem(sessionStorageKey.scrollAtGallery, id)
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
    if (inited) {
      scroller?.addEventListener('scroll', adjustStyle)
      return () => scroller?.removeEventListener('scroll', adjustStyle)
    }
  }, [inited])
  useEffect(() => {
    if (inited) adjustStyle()
  }, [inited, filter])

  return (
    <Container ref={containerRef}>
      {isVisible ? (
        <Wrapper style={{ transform: `scale(${scale})` }}>{children}</Wrapper>
      ) : (
        <></>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: ${cardWidth}px;
  height: 320px;
  scroll-snap-align: center;
  margin: 0 ${sideMargin}px;
`

const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  animation: ${show} 0.3s ease-out both;
`

export default CardContainer
