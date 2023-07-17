import { useLiveQuery } from 'dexie-react-hooks'
import { color } from 'src/common/styles/color'
import { dateToString } from 'src/common/utils/dateToString'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import TitledRange from 'src/view/components/molecules/TitledRange'
import TitledValue from 'src/view/components/molecules/TitledValue'
import styled from 'styled-components'
import TextBlock from 'src/view/components/atoms/TextBlock'
import { fontSize } from 'src/common/styles/fontSize'
import SkeletonTitledValue from 'src/view/components/atoms/SkeletonBox/SkeletonTitledValue'
import SkeletonTitledRange from 'src/view/components/atoms/SkeletonBox/SkeletonTitledRange'
import { mlString } from 'src/common/utils/switchLanguages'

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
            title={mlString({
              ja: '総再生数',
              en: 'Total views',
            })}
            value={liveQuery.historyCount.toString()}
          />
          <TitledRange
            title={mlString({
              ja: '再生履歴の期間',
              en: 'Watch history period',
            })}
            start={
              liveQuery.historyDuration[0]
                ? dateToString(liveQuery.historyDuration[0])
                : ''
            }
            end={
              liveQuery.historyDuration[1]
                ? dateToString(liveQuery.historyDuration[1])
                : ''
            }
          />
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <TitleWrapper>
          <TextBlock color={color.black} size={fontSize.title} weight="bold">
            再生履歴を追加
          </TextBlock>
        </TitleWrapper>
        <TextBlock color={color.black} size={fontSize.regular}>
          再生履歴を追加すると、より詳しい情報が確認できます。
        </TextBlock>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <SkeletonTitledValue />
      <SkeletonTitledRange />
    </Wrapper>
  )
}

const TitleWrapper = styled.div`
  margin-bottom: 8px;
`

const Wrapper = styled.div`
  padding: 64px 0;
`

export default Abstract
