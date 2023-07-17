import ColumnContent from 'src/view/components/templates/ColumnContent'
import LogoBox from './LogoBox'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'
import Ad from 'src/view/components/atoms/Ad'
import Text from 'src/view/components/atoms/Text'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import { ml, mlString } from 'src/common/utils/switchLanguages'

const NoData: React.FC = () => {
  return (
    <ColumnContent>
      <LogoBox />
      <a href="/api/redirect.php">
        <PrimaryButton
          text={mlString({
            ja: 'ログインしてデータを取得',
            en: 'Login and fetch your subscriptions',
          })}
        />
      </a>
      <p>
        <Text color={color.black} size={fontSize.regular}>
          {ml({
            ja: '現在、急激なユーザー数の増加により、時間帯によっては登録チャンネルの取得に失敗することがあります。その場合には、時間をおいて再度お試しいただきますようお願いいたします。',
            en: 'Currently, due to the rapid increase in the number of users, you may not be able to fetch subscriptions at certain times of the day. If this happens, please wait a few hours and try again.',
          })}
        </Text>
      </p>
      <AdWrapper>
        <Ad />
      </AdWrapper>
    </ColumnContent>
  )
}

const AdWrapper = styled.div`
  margin-top: 80px;
`

export default NoData
