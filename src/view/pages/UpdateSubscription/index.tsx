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
      {Description}
    </ColumnContent>
  )
}

export default UpdateSubscription
