import { useContext, useRef } from 'react'
import styled from 'styled-components'
import ChannelCard from 'src/view/components/molecules/ChannelCard'
import CardWrapper from './CardWrapper'
import { ChannelType } from 'src/common/utils/types/youtube'
import { Link } from 'react-router-dom'
import { dateToString } from 'src/common/utils/dateToString'
import { DeviceTypeContext } from 'src/index'
import SliderControl from './SliderControl'

export type SliderPropsType = {
  channels: ChannelType[]
  filter: string
}

const Slider: React.FC<SliderPropsType> = (props) => {
  const { channels, filter } = props
  const scrollerRef = useRef(null)
  const deviceType = useContext(DeviceTypeContext)

  return (
    <Wrapper>
      <Scroller ref={scrollerRef}>
        <InnerWrapper>
          {channels.map((channel) => {
            const { id, name, subscribeDate, thumbnail } = channel
            if (!filter || name.toLowerCase().includes(filter.toLowerCase())) {
              return (
                <Link to={`/channel/${id}`} key={id}>
                  <CardWrapper scroller={scrollerRef.current}>
                    <ChannelCard
                      thumbnail={thumbnail.high}
                      name={name}
                      snippet={`${dateToString(subscribeDate)}に登録`}
                    />
                  </CardWrapper>
                </Link>
              )
            }
          })}
        </InnerWrapper>
      </Scroller>
      {deviceType == 'pc' ? (
        <SliderControl scroller={scrollerRef.current} />
      ) : (
        ''
      )}
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
  padding-bottom: 48px;
  margin-bottom: -48px;
  position: relative;
  z-index: 10;
`

const InnerWrapper = styled.div`
  display: flex;
  width: fit-content;
  padding: 0 50%;
  height: 320px;
  &:has(*) {
    height: auto;
  }
`

export default Slider
