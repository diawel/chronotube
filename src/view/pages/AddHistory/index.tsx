import { useState } from 'react'
import { StoreWatchHistoryProgressType } from 'src/common/utils/db/watchHistory'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import InitPage from '../../components/utils/InitPage'
import Abstract from './Abstract'
import CompleteButton from './CompleteButton'
import Description from './Description'
import UploadButton from './UploadButton'
import Loading from 'src/view/components/organisms/Loading'

export type ProgressType = StoreWatchHistoryProgressType | 'ready' | 'init'

const progressSnippet: { [index in ProgressType]: string } = {
  ready: '',
  init: '初期化中',
  parse: 'JSONデータを解析中',
  store: 'データベースに格納中',
  finished: '',
}

const AddHistory: React.FC = () => {
  const [progress, setProgress] = useState<ProgressType>('ready')

  return (
    <ColumnContent>
      <InitPage pageTitle="再生履歴を追加 | Chronotube" />
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
      {progress == 'ready' && Description}
    </ColumnContent>
  )
}

export default AddHistory
