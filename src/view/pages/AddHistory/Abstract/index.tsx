import { useLiveQuery } from 'dexie-react-hooks'
import { dateToString } from 'src/common/utils/dateToString'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import TitledRange from 'src/view/components/molecules/TitledRange'
import TitledValue from 'src/view/components/molecules/TitledValue'
import styled from 'styled-components'

const Abstract: React.FC = () => {
  const historyCount = useLiveQuery(
    async () => await watchHistory.histories.count()
  )?.toString()
  const historyDuration = useLiveQuery(async () => [
    await watchHistory.histories.toCollection().first(),
    await watchHistory.histories.toCollection().last(),
  ])?.map((history) => {
    if (history?.playbackDate) return dateToString(history?.playbackDate)
  })

  if (
    historyCount &&
    historyDuration &&
    historyDuration[0] &&
    historyDuration[1]
  )
    return (
      <Wrapper>
        <TitledValue title="総再生数" value={historyCount} />
        <TitledRange
          title="再生履歴の期間"
          start={historyDuration[0]}
          end={historyDuration[1]}
        />
      </Wrapper>
    )
  return <Wrapper></Wrapper>
}

const Wrapper = styled.div`
  margin: 64px 0;
`

export default Abstract
