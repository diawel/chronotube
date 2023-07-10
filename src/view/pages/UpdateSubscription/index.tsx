import Ad from 'src/view/components/atoms/Ad'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import styled from 'styled-components'
import InitPage from '../../components/utils/InitPage'
import Abstract from './Abstract'
import Description from './Description'

const UpdateSubscription: React.FC = () => {
  return (
    <ColumnContent>
      <InitPage pageTitle="登録チャンネルを更新 | Chronotube" />
      <Abstract />
      <a href="/api/redirect.php">
        <PrimaryButton text="登録チャンネルを更新" />
      </a>
      <p>
        現在、急激なユーザー数の増加に対応できておらず、いわゆる「API制限」の状態になっています。可能な限り早く対応を行いますが、登録チャンネルの取得に失敗する場合には、時間をおいて再度お試しいただきますようお願いいたします。
      </p>
      {Description}
    </ColumnContent>
  )
}

export default UpdateSubscription
