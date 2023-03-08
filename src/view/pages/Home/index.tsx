import NoData from './NoData'
import Default from './Default'
import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'

const Home: React.FC = () => {
  const liveQuery = useLiveQuery(async () => {
    return { channelCount: await subscription.channels.count() }
  })

  if (liveQuery) {
    if (liveQuery.channelCount) return <Default />
    return <NoData />
  }
  return <></>
}

export default Home
