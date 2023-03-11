import { useLiveQuery } from 'dexie-react-hooks'
import { useContext } from 'react'
import { subscription } from 'src/common/utils/db/subscription'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import ChannelList from 'src/view/components/organisms/ChannelList'
import EngageAddHistory from 'src/view/components/organisms/EngageAddHistory'
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
    return <ChannelList channels={liveQuery.channels} {...{ filter, sortBy }} />
  }
  return <></>
}

export default SearchedChannelList
