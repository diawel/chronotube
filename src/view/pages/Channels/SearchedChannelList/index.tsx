import { useLiveQuery } from 'dexie-react-hooks'
import { useContext } from 'react'
import { subscription } from 'src/common/utils/db/subscription'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import SkeletonChannelList from 'src/view/components/atoms/SkeletonBox/SkeletonChannelList'
import ChannelList from 'src/view/components/organisms/ChannelList'
import EngageAddHistory from 'src/view/components/organisms/EngageAddHistory'
import styled, { keyframes } from 'styled-components'
import { SearchContext } from '..'

const SearchedChannelList: React.FC = () => {
  const { filter, sortBy } = useContext(SearchContext)
  const liveQuery = useLiveQuery(async () => {
    return {
      channels: await subscription.channels.toArray(),
      historyCount: await watchHistory.histories.count(),
    }
  })

  if (liveQuery) {
    if (sortBy == 'playCount' && !liveQuery.historyCount)
      return <EngageAddHistory />
    return (
      <Wrapper>
        <ChannelList channels={liveQuery.channels} {...{ filter, sortBy }} />
      </Wrapper>
    )
  }
  return <SkeletonChannelList />
}

const show = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const Wrapper = styled.div`
  animation: ${show} 0.3s ease-out 0.2s both;
  margin-bottom: 8px;
`

export default SearchedChannelList
