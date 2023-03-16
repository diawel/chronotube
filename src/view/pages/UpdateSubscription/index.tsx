import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import InitPage from '../util/InitPage'
import Abstract from './Abstract'
import Description from './Description'

const UpdateSubscription: React.FC = () => {
  return (
    <ColumnContent>
      <InitPage />
      <Abstract />
      <a href="/api/redirect.php">
        <PrimaryButton text="登録チャンネルを更新" />
      </a>
      {Description}
    </ColumnContent>
  )
}

export default UpdateSubscription
