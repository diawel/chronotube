import NoData from './NoData'
import Default from './Default'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  StoreSubscriptionProgressType,
  subscription,
} from 'src/common/utils/db/subscription'
import InitPage from '../../components/utils/InitPage'
import { useEffect, useState } from 'react'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import Loading from 'src/view/components/organisms/Loading'
import { checkCachedSubscription } from 'src/common/utils/db/cacheList'

const Home: React.FC = () => {
  const [isCacheCecked, setIsCacheCecked] = useState(false)
  const [loadingSnippet, setLoadingSnippet] = useState('')
  const liveQuery = useLiveQuery(async () => {
    return { channelCount: await subscription.channels.count() }
  })

  useEffect(() => {
    checkCachedSubscription((progress: StoreSubscriptionProgressType) => {
      setLoadingSnippet(
        {
          init: '初期化中',
          parse: 'JSONデータを解析中',
          store: 'データベースに格納中',
          finished: '',
        }[progress]
      )
    }).then(() => {
      setIsCacheCecked && setIsCacheCecked(true)
    })
  }, [])

  let node
  if (loadingSnippet) {
    node = (
      <ColumnContent hideFooter={true}>
        <Loading loadingSnippet={loadingSnippet} />
      </ColumnContent>
    )
  } else if (isCacheCecked && liveQuery) {
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
