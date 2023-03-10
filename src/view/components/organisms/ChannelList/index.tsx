import { ReactNode, useContext } from 'react'
import { Link } from 'react-router-dom'
import { dateToString } from 'src/common/utils/dateToString'
import { Channel } from 'src/common/utils/db/subscription'
import { DeviceTypeContext } from 'src/index'
import styled from 'styled-components'
import ChannelCard from '../../molecules/ChannelCard'

export type ChannelListPropsType = {
  channels: Channel[]
  filter: string
  sortBy: sortByType
}

export type sortByType = 'subscribeDate' | 'playCount'

const ChannelList: React.FC<ChannelListPropsType> = (props) => {
  const { channels, filter, sortBy } = props
  const deviceType = useContext(DeviceTypeContext)

  const gap = deviceType == 'mobile' ? '16px' : '24px'

  return (
    <Wrapper gap={gap}>
      {channels.map((channel) => {
        const { id, name, subscribeDate, thumbnail, playCount } = channel
        if (!filter || name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <Link to={`/channel/${id}`} key={id}>
              <CardWrapper gap={gap}>
                <ChannelCard
                  thumbnail={thumbnail.high}
                  name={name}
                  snippet={
                    sortBy == 'subscribeDate'
                      ? `${dateToString(subscribeDate)}に登録`
                      : `${playCount}回再生`
                  }
                  listed={true}
                />
              </CardWrapper>
            </Link>
          )
        }
      })}
      {new Array<ReactNode>(channels.length).fill(<FillBox gap={gap} />)}
    </Wrapper>
  )
}

type WrapperStyleType = {
  gap: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: calc(${style.gap} / 2);
  `
)

type CardWrapperStyleType = {
  gap: string
}

const CardWrapper = styled.div<CardWrapperStyleType>(
  (style) => `
    width: 200px;
    max-width: calc(50% - ${style.gap});
    margin: calc(${style.gap} / 2);
  `
)

type FillBoxStyleType = CardWrapperStyleType

const FillBox = styled.div<FillBoxStyleType>(
  (style) => `
    width: 200px;
    max-width: calc(50% - ${style.gap});
    margin: 0 calc(${style.gap} / 2);
  `
)

export default ChannelList
