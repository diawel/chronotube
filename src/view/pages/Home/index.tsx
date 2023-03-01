import NoData from './NoData'
import Default from './Default'
import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'

const Home: React.FC = () => {
  const channels = useLiveQuery(async () => await subscription.channels.count())

  if (channels) return <Default />
  else return <NoData />
}

export default Home
