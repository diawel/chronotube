import { useLiveQuery } from 'dexie-react-hooks'
import { dateToString } from 'src/common/utils/dateToString'
import TitledValue from 'src/view/components/molecules/TitledValue'
import styled from 'styled-components'
import { subscription } from 'src/common/utils/db/subscription'
import SkeletonTitledValue from 'src/view/components/atoms/SkeletonBox/SkeletonTitledValue'

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
  return (
    <Wrapper>
      <SkeletonTitledValue />
      <SkeletonTitledValue />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 64px 0;
`

export default Abstract
