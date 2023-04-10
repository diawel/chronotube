import NoData from './NoData'
import Default from './Default'
import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'
import InitPage from '../util/InitPage'

let cachedLiveQuery: any

const Home: React.FC = () => {
  const liveQuery =
    useLiveQuery(async () => {
      return { channelCount: await subscription.channels.count() }
    }) || cachedLiveQuery

  let node

  if (liveQuery) {
    cachedLiveQuery = liveQuery

    if (liveQuery.channelCount) node = <Default />
    else node = <NoData />
  }
  return (
    <>
      <InitPage pageTitle="Chronotube" />
      {node}
    </>
  )
}

export default Home
