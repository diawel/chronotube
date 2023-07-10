import ColumnContent from 'src/view/components/templates/ColumnContent'
import LogoBox from './LogoBox'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'
import Ad from 'src/view/components/atoms/Ad'

const NoData: React.FC = () => {
  return (
    <ColumnContent>
      <LogoBox />
      <a href="/api/redirect.php">
        <PrimaryButton text="ログインしてデータを取得" />
      </a>
      <p>
        現在、急激なユーザー数の増加に対応できておらず、いわゆる「API制限」の状態になっています。可能な限り早く対応を行いますが、登録チャンネルの取得に失敗する場合には、時間をおいて再度お試しいただきますようお願いいたします。
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
