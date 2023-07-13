import ColumnContent from 'src/view/components/templates/ColumnContent'
import LogoBox from './LogoBox'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'
import Ad from 'src/view/components/atoms/Ad'
import Text from 'src/view/components/atoms/Text'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'

const NoData: React.FC = () => {
  return (
    <ColumnContent>
      <LogoBox />
      <a href="/api/redirect.php">
        <PrimaryButton text="ログインしてデータを取得" />
      </a>
      <p>
        <Text color={color.black} size={fontSize.regular}>
          現在、急激なユーザー数の増加により、時間帯によっては登録チャンネルの取得に失敗することがあります。その場合には、時間をおいて再度お試しいただきますようお願いいたします。
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
