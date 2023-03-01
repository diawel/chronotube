import { ReactNode, useEffect, useRef, useState } from 'react'
import { sessionStorageKey } from 'src/common/utils/sessionStorage'
import styled from 'styled-components'

export type CardContainerPropsType = {
  scroller?: HTMLElement
  filter: string
  id: string
  index: number
  children: ReactNode
}

const cardWidth = 380 - 128
const sideMargin = 4
export const cardOuterWidth = cardWidth + sideMargin * 2

const CardContainer: React.FC<CardContainerPropsType> = (props) => {
  const { scroller, filter, id, index, children } = props
  const [scale, setScale] = useState(0.9)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)
  const [inited, setInited] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(sessionStorageKey.scrollAt) == id && scroller) {
      scroller.scroll(cardOuterWidth * index + cardWidth / 2, 0)
    }
    setInited(true)
  }, [])

  const adjustStyle = () => {
    if (containerRef.current) {
      const wrapper = containerRef.current as HTMLElement
      const width = document.body.clientWidth
      const { left, right } = wrapper.getBoundingClientRect()
      if (-width < right && left < 2 * width) {
        setIsVisible(true)
        const distanceToCenter = Math.abs(width - left - right)
        if (distanceToCenter < wrapper.clientWidth) {
          sessionStorage.setItem(sessionStorageKey.scrollAt, id)
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
  }, [inited, scroller])
  useEffect(() => {
    if (inited) adjustStyle()
  }, [inited, filter])

  return (
    <Container ref={containerRef}>
      {isVisible ? (
        <div style={{ transform: `scale(${scale})` }}>{children}</div>
      ) : (
        ''
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

export default CardContainer
