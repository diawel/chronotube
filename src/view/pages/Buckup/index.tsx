import { useState } from 'react'
import {
  exportWatchHistories,
  ExportWatchHistoryProgressType,
} from 'src/common/utils/db/watchHistory'
import Button from 'src/view/components/atoms/Button'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import styled from 'styled-components'
import Abstract from './Abstract'

const Backup: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const backup = async () => {
    setLoading(true)
    await exportWatchHistories()
    setLoading(false)
  }

  return (
    <ColumnContent>
      <Abstract />
      {loading ? (
        <LoadingButtonWrapper>
          <PrimaryButton text="読み込み中" />
        </LoadingButtonWrapper>
      ) : (
        <Button onClick={backup}>
          <PrimaryButton text="再生履歴をバックアップ" />
        </Button>
      )}
    </ColumnContent>
  )
}

const LoadingButtonWrapper = styled.div`
  opacity: 0.5;
`

export default Backup
