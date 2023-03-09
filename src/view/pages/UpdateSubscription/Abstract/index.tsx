import { useLiveQuery } from 'dexie-react-hooks'
import { color } from 'src/common/styles/color'
import { dateToString } from 'src/common/utils/dateToString'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import TitledRange from 'src/view/components/molecules/TitledRange'
import TitledValue from 'src/view/components/molecules/TitledValue'
import styled from 'styled-components'
import TextBlock from 'src/view/components/atoms/TextBlock'
import { fontSize } from 'src/common/styles/fontSize'
import { subscription } from 'src/common/utils/db/subscription'

const Abstract: React.FC = () => {
  const liveQuery = useLiveQuery(async () => {
    const channelsFetched = await subscription.meta.get('fetched')
    return {
      channelCount: await subscription.channels.count(),
      channelsFetchedAt: channelsFetched?.value as Date | undefined,
    }
  })

  if (liveQuery) {
    return (
      <Wrapper>
        <TitledValue
          title="登録チャンネル数"
          value={
            liveQuery.channelCount ? liveQuery.channelCount.toString() : 'なし'
          }
        />
        <TitledValue
          title="登録チャンネル最終更新"
          value={
            liveQuery.channelsFetchedAt
              ? dateToString(liveQuery.channelsFetchedAt)
              : 'なし'
          }
        />
      </Wrapper>
    )
  }
  return <Wrapper></Wrapper>
}

const Wrapper = styled.div`
  margin: 64px 0;
`

export default Abstract
