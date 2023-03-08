import { useLiveQuery } from 'dexie-react-hooks'
import { color } from 'src/common/styles/color'
import { dateToString } from 'src/common/utils/dateToString'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import TitledRange from 'src/view/components/molecules/TitledRange'
import TitledValue from 'src/view/components/molecules/TitledValue'
import styled from 'styled-components'
import TextBlock from 'src/view/components/atoms/TextBlock'

const Abstract: React.FC = () => {
  const liveQuery = useLiveQuery(async () => {
    const first = await watchHistory.histories.toCollection().first()
    const last = await watchHistory.histories.toCollection().last()
    return {
      historyCount: await watchHistory.histories.count(),
      historyDuration: [first?.playbackDate, last?.playbackDate],
    }
  })

  if (liveQuery) {
    if (liveQuery.historyCount) {
      return (
        <Wrapper>
          <TitledValue
            title="総再生数"
            value={liveQuery.historyCount.toString()}
          />
          <TitledRange
            title="再生履歴の期間"
            start={
              liveQuery.historyDuration[0]
                ? dateToString(liveQuery.historyDuration[0])
                : 'なし'
            }
            end={
              liveQuery.historyDuration[1]
                ? dateToString(liveQuery.historyDuration[1])
                : 'なし'
            }
          />
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <TitleWrapper>
          <TextBlock color={color.black} size="36px" weight="bold">
            再生履歴を追加
          </TextBlock>
        </TitleWrapper>
        <TextBlock color={color.black} size="14px">
          再生履歴を追加すると、より詳しい情報が確認できます。
        </TextBlock>
      </Wrapper>
    )
  }
  return <Wrapper></Wrapper>
}

const TitleWrapper = styled.div`
  margin-bottom: 8px;
`

const Wrapper = styled.div`
  margin: 64px 0;
`

export default Abstract
