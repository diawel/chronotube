import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'
import ChannelList from 'src/view/components/organisms/ChannelList'

const Channels: React.FC = () => {
  const liveQuery = useLiveQuery(async () => {
    return {
      channels: await subscription.channels.toArray(),
    }
  })

  if (liveQuery)
    return (
      <ChannelList
        channels={liveQuery.channels}
        filter=""
        sortBy="subscribeDate"
      />
    )
  return <></>
}

export default Channels
