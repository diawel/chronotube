import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import InitPage from '../../components/utils/InitPage'
import Abstract from './Abstract'
import { useLiveQuery } from 'dexie-react-hooks'
import { subscription } from 'src/common/utils/db/subscription'
import styled from 'styled-components'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import Text from 'src/view/components/atoms/Text'
import { ml, mlString } from 'src/common/utils/switchLanguages'

const UpdateSubscription: React.FC = () => {
  const liveQuery = useLiveQuery(async () => {
    const channelsFetched = await subscription.meta.get('fetched')
    return {
      channelsFetchedAt: channelsFetched?.value as Date | undefined,
    }
  })
  return (
    <ColumnContent>
      <InitPage
        pageTitle={`${mlString({
          ja: '登録チャンネルを更新',
          en: 'Update subscriptions',
        })} | Chronotube`}
      />
      <Abstract />
      {!liveQuery ? (
        <DisabledButtonWrapper>
          <PrimaryButton
            text={mlString({
              ja: '読み込み中',
              en: 'Loading',
            })}
          />
        </DisabledButtonWrapper>
      ) : !liveQuery.channelsFetchedAt ||
        Date.now() - liveQuery.channelsFetchedAt.getTime() >
          1000 * 60 * 60 * 24 ? (
        <a href="/api/redirect.php">
          <PrimaryButton
            text={mlString({
              ja: '登録チャンネルを更新',
              en: 'Update subscriptions',
            })}
          />
        </a>
      ) : (
        <DisabledButtonWrapper>
          <PrimaryButton
            text={mlString({
              ja: '過去24時間以内に更新済み',
              en: 'Updated within the past 24 hours',
            })}
          />
        </DisabledButtonWrapper>
      )}
      <p>
        <Text color={color.black} size={fontSize.regular}>
          {ml({
            ja: '現在、急激なユーザー数の増加に伴い、登録チャンネルの更新頻度を制限しています。また、時間帯によっては登録チャンネルの更新に失敗することがあります。その場合には、時間をおいて再度お試しいただきますようお願いいたします。',
            en: 'Currently, due to the rapid increase in the number of users, the frequency of updating subscriptions is limited. Also, you may not be able to fetch subscriptions at certain times of the day. If this happens, please wait a few hours and try again.',
          })}
        </Text>
      </p>
    </ColumnContent>
  )
}

const DisabledButtonWrapper = styled.div`
  opacity: 0.5;
`

export default UpdateSubscription
