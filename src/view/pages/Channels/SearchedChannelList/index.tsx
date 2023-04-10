import { useLiveQuery } from 'dexie-react-hooks'
import { useContext } from 'react'
import { subscription } from 'src/common/utils/db/subscription'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import SkeletonChannelList from 'src/view/components/atoms/SkeletonBox/SkeletonChannelList'
import ChannelList from 'src/view/components/organisms/ChannelList'
import EngageAddHistory from 'src/view/components/organisms/EngageAddHistory'
import styled from 'styled-components'
import { SearchContext } from '..'

let cachedLiveQuery: any

const SearchedChannelList: React.FC = () => {
  const { filter, sortBy } = useContext(SearchContext)
  const liveQuery =
    useLiveQuery(async () => {
      return {
        channels: await subscription.channels.toArray(),
        historyCount: await watchHistory.histories.count(),
      }
    }) || cachedLiveQuery

  if (liveQuery) {
    cachedLiveQuery = liveQuery

    if (sortBy == 'playCount' && !liveQuery.historyCount)
      return (
        <Wrapper>
          <EngageAddHistory />
        </Wrapper>
      )
    return (
      <Wrapper>
        <ChannelList channels={liveQuery.channels} {...{ filter, sortBy }} />
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <SkeletonChannelList />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 80px 0 8px;
`

export default SearchedChannelList
