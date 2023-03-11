import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ChannelCard from 'src/view/components/molecules/ChannelCard'
import CardContainer, { cardOuterWidth } from './CardContainer'
import { Channel } from 'src/common/utils/db/subscription'
import { Link } from 'react-router-dom'
import { dateToString } from 'src/common/utils/dateToString'
import { DeviceContext } from 'src/index'
import SliderControl from './SliderControl'
import Text from 'src/view/components/atoms/Text'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'

export type SliderPropsType = {
  channels: Channel[]
  filter: string
}

const Slider: React.FC<SliderPropsType> = (props) => {
  const { channels, filter } = props
  const scrollerRef = useRef(null)
  const deviceType = useContext(DeviceContext)
  const [scroller, setScroller] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const checkScrollerRendered = () => {
      if (scrollerRef.current) setScroller(scrollerRef.current)
      else window.requestAnimationFrame(checkScrollerRendered)
    }
    checkScrollerRendered()
  }, [scrollerRef.current])

  let cardIndex = 0
  const cardList = channels.map((channel) => {
    const { id, name, subscribeDate, thumbnail } = channel
    if (!filter || name.toLowerCase().includes(filter.toLowerCase())) {
      return (
        <Link to={`/channel/${id}`} key={id}>
          <CardContainer {...{ scroller, id, filter }} index={cardIndex++}>
            <ChannelCard
              thumbnail={thumbnail.high}
              name={name}
              snippet={`${dateToString(subscribeDate)}に登録`}
            />
          </CardContainer>
        </Link>
      )
    }
  })

  return (
    <Wrapper>
      <Scroller ref={scrollerRef}>
        {cardIndex ? (
          <InnerWrapper>{cardList}</InnerWrapper>
        ) : (
          <EmptyResult>
            <Text color={color.black} size={fontSize.medium} weight="bold">
              「{filter}」に一致するチャンネルがありません。
            </Text>
          </EmptyResult>
        )}
      </Scroller>
      {cardIndex && deviceType == 'pc' && <SliderControl scroller={scroller} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const Scroller = styled.div`
  overflow: auto;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  padding: 16px 0 48px;
  margin: -16px 0 -48px;
  position: relative;
  z-index: 10;
`

const InnerWrapper = styled.div`
  display: flex;
  width: fit-content;
  padding: 0 calc(50% - ${cardOuterWidth / 2}px);
  height: 320px;
`

const EmptyResult = styled.div`
  margin: 0 auto;
  padding: 24px;
  display: flex;
  width: fit-content;
  max-width: 100%;
  height: 320px;
  align-items: center;
`

export default Slider
