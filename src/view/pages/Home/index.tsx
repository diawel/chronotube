import NoData from './NoData'
import Default from './Default'
import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'

const Home: React.FC = () => {
  const channelCount = useLiveQuery(
    async () => await subscription.channels.count()
  )

  if (channelCount) return <Default />
  else return <NoData />
}

export default Home
