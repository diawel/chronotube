import { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { fontSize } from 'src/common/styles/fontSize'
import { dateToString } from 'src/common/utils/dateToString'
import { Channel } from 'src/common/utils/db/subscription'
import { DeviceContext } from 'src/index'
import styled from 'styled-components'
import ChannelCard from '../../molecules/ChannelCard'
import CardWrapper from './CardWrapper'
import Text from '../../atoms/Text'
import { color } from 'src/common/styles/color'

export type ChannelListPropsType = {
  channels: Channel[]
  filter: string
  sortBy: SortByType
}

export type SortByType = 'subscribeDate' | 'playCount'

const sortByShouldReversed = {
  subscribeDate: false,
  playCount: true,
}
const sortByKey = (channels: Channel[], key: SortByType) => {
  if (sortByShouldReversed[key]) {
    return [...channels].sort((a, b) => {
      if (a[key] > b[key]) return -1
      if (a[key] < b[key]) return 1
      return 0
    })
  }
  return [...channels].sort((a, b) => {
    if (a[key] > b[key]) return 1
    if (a[key] < b[key]) return -1
    return 0
  })
}

const ChannelList: React.FC<ChannelListPropsType> = (props) => {
  const { channels, filter, sortBy } = props
  const deviceType = useContext(DeviceContext)

  const sortedChannels = useMemo(() => {
    return sortByKey(channels, sortBy)
  }, [channels, sortBy])

  const gap = deviceType == 'mobile' ? '16px' : '24px'

  let cardIndex = 0
  return (
    <Wrapper gap={gap}>
      {sortedChannels.map((channel) => {
        const { id, name, subscribeDate, thumbnail, playCount } = channel
        if (!filter || name.toLowerCase().includes(filter.toLowerCase())) {
          cardIndex++
          return (
            <Link to={`/channel/${id}`} key={id}>
              <CardWrapper {...{ id, gap }}>
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
      {cardIndex > 0 &&
        [...Array(sortedChannels.length)].map((element, ei) => {
          return <FillBox key={ei} gap={gap} />
        })}
      {!cardIndex && (
        <EmptyResult>
          <Text color={color.black} size={fontSize.medium} weight="bold">
            「{filter}」に一致する結果はありません。
          </Text>
        </EmptyResult>
      )}
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
    padding: 0 calc(${style.gap} / 2);
    width: 100%;
    box-sizing: border-box;
  `
)

type FillBoxStyleType = {
  gap: string
}

const FillBox = styled.div<FillBoxStyleType>(
  (style) => `
    width: 200px;
    max-width: calc(50% - ${style.gap});
    margin: 0 calc(${style.gap} / 2);
    content-visibility: hidden;
  `
)

const EmptyResult = styled.div`
  margin: 240px auto;
  padding: 24px;
`

export default ChannelList
