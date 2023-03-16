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
      return (
        <Wrapper>
          <EngageAddHistory />
        </Wrapper>
      )
    return (
      <AnimatedWrapper>
        <ChannelList channels={liveQuery.channels} {...{ filter, sortBy }} />
      </AnimatedWrapper>
    )
  }
  return (
    <Wrapper>
      <SkeletonChannelList />
    </Wrapper>
  )
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

const AnimatedWrapper = styled.div`
  animation: ${show} 0.3s ease-out 0.2s both;
  margin: 80px 0 8px;
`

const Wrapper = styled.div`
  margin: 80px 0 8px;
`

export default SearchedChannelList
