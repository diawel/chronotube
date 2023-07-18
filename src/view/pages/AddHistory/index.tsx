import { useState } from 'react'
import { StoreWatchHistoryProgressType } from 'src/common/utils/db/watchHistory'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import InitPage from '../../components/utils/InitPage'
import Abstract from './Abstract'
import CompleteButton from './CompleteButton'
import Description from './Description'
import UploadButton from './UploadButton'
import Loading from 'src/view/components/organisms/Loading'
import { mlString } from 'src/common/utils/switchLanguages'

export type ProgressType = StoreWatchHistoryProgressType | 'ready' | 'init'

const progressSnippet: { [index in ProgressType]: string } = {
  ready: '',
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
}

const AddHistory: React.FC = () => {
  const [progress, setProgress] = useState<ProgressType>('ready')

  return (
    <ColumnContent hideFooter={progressSnippet[progress] != ''}>
      <InitPage
        pageTitle={`${mlString({
          ja: '再生履歴を追加',
          en: 'Add watch history',
        })} | Chronotube`}
      />
      {progress == 'ready' || progress == 'finished' ? (
        <Abstract />
      ) : (
        <Loading loadingSnippet={progressSnippet[progress]} />
      )}
      {progress == 'ready' ? (
        <UploadButton progressSetter={setProgress} />
      ) : (
        <CompleteButton progress={progress} />
      )}
      {progress == 'ready' && <Description />}
    </ColumnContent>
  )
}

export default AddHistory
