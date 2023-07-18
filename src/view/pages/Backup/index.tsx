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
import InitPage from '../../components/utils/InitPage'
import Abstract from './Abstract'
import Clear from './Clear'
import { mlString } from 'src/common/utils/switchLanguages'

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
      <InitPage
        pageTitle={`${mlString({
          ja: '再生履歴をバックアップ',
          en: 'Backup watch history',
        })} | Chronotube`}
      />
      <Abstract />
      {!liveQuery || loading ? (
        <DisabledButtonWrapper>
          <PrimaryButton
            text={mlString({
              ja: '読み込み中',
              en: 'Loading',
            })}
          />
        </DisabledButtonWrapper>
      ) : liveQuery.historyCount ? (
        <Button onClick={backup}>
          <PrimaryButton
            text={mlString({
              ja: '再生履歴をバックアップ',
              en: 'Backup watch history',
            })}
          />
        </Button>
      ) : (
        <DisabledButtonWrapper>
          <PrimaryButton
            text={mlString({
              ja: '再生履歴がありません',
              en: 'No watch history',
            })}
          />
        </DisabledButtonWrapper>
      )}
      <Clear />
    </ColumnContent>
  )
}

const DisabledButtonWrapper = styled.div`
  opacity: 0.5;
`

export default Backup
