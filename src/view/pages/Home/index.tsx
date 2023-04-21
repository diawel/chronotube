import NoData from './NoData'
import Default from './Default'
import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'
import InitPage from '../util/InitPage'
import { color } from 'src/common/styles/color'

const Home: React.FC = () => {
  const liveQuery = useLiveQuery(async () => {
    return { channelCount: await subscription.channels.count() }
  })

  let node

  if (liveQuery) {
    if (liveQuery.channelCount) node = <Default />
    else node = <NoData />
  }
  return (
    <>
      <InitPage pageTitle="Chronotube" background={color.lightGray} />
      {node}
    </>
  )
}

export default Home
