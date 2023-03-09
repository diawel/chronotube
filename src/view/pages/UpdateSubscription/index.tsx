import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import Abstract from './Abstract'

const UpdateSubscription: React.FC = () => {
  return (
    <ColumnContent>
      <Abstract />
      <a href="/api/redirect.php">
        <PrimaryButton text="登録チャンネルを更新" />
      </a>
    </ColumnContent>
  )
}

export default UpdateSubscription
