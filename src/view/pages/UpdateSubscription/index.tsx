import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import InitPage from '../../components/utils/InitPage'
import Abstract from './Abstract'
import { mlString } from 'src/common/utils/switchLanguages'

const UpdateSubscription: React.FC = () => {
  return (
    <ColumnContent>
      <InitPage
        pageTitle={`${mlString({
          ja: '登録チャンネルを更新',
          en: 'Update subscriptions',
        })} | Chronotube`}
      />
      <Abstract />
      <a href="/api/redirect.php">
        <PrimaryButton
          text={mlString({
            ja: '登録チャンネルを更新',
            en: 'Update subscriptions',
          })}
        />
      </a>
    </ColumnContent>
  )
}

export default UpdateSubscription
