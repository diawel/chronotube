import { useState } from 'react'
import { StoreWatchHistoryProgressType } from 'src/common/utils/db/watchHistory'
import Ad from 'src/view/components/atoms/Ad'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import styled from 'styled-components'
import InitPage from '../util/InitPage'
import Abstract from './Abstract'
import CompleteButton from './CompleteButton'
import Description from './Description'
import Loading from './Loading'
import UploadButton from './UploadButton'

export type ProgressType = StoreWatchHistoryProgressType | 'ready' | 'init'

const AddHistory: React.FC = () => {
  const [progress, setProgress] = useState<ProgressType>('ready')

  return (
    <ColumnContent>
      <InitPage pageTitle="再生履歴を追加 | Chronotube" />
      {progress == 'ready' || progress == 'finished' ? (
        <Abstract />
      ) : (
        <Loading progress={progress} />
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
