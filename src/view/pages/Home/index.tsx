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
import { mlString } from 'src/common/utils/switchLanguages'

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
          init: mlString({
            ja: '初期化中',
            en: 'Initializing',
          }),
          parse: mlString({
            ja: 'JSONデータを解析中',
            en: 'Parsing JSON data',
          }),
          store: mlString({
            ja: 'データベースに格納中',
            en: 'Storing data to database',
          }),
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
