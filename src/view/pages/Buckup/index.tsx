import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import {
  exportWatchHistories,
  watchHistory,
} from 'src/common/utils/db/watchHistory'
import Button from 'src/view/components/atoms/Button'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import styled from 'styled-components'
import InitPage from '../util/InitPage'
import Abstract from './Abstract'

const Backup: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const liveQuery = useLiveQuery(async () => {
    return {
      historyCount: await watchHistory.histories.count(),
    }
  })

  const backup = async () => {
    setLoading(true)
    await exportWatchHistories()
    setLoading(false)
  }

  return (
    <ColumnContent>
      <InitPage />
      <Abstract />
      {!liveQuery || loading ? (
        <DisabledButtonWrapper>
          <PrimaryButton text="読み込み中" />
        </DisabledButtonWrapper>
      ) : liveQuery.historyCount ? (
        <Button onClick={backup}>
          <PrimaryButton text="再生履歴をバックアップ" />
        </Button>
      ) : (
        <DisabledButtonWrapper>
          <PrimaryButton text="再生履歴がありません" />
        </DisabledButtonWrapper>
      )}
    </ColumnContent>
  )
}

const DisabledButtonWrapper = styled.div`
  opacity: 0.5;
`

export default Backup
