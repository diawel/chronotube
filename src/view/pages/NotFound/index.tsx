import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import InitPage from '../../components/utils/InitPage'
import Abstract from './Abstract'
import { mlString } from 'src/common/utils/switchLanguages'

const NotFound: React.FC = () => {
  return (
    <ColumnContent>
      <InitPage notFound={true} pageTitle="404 Not Found | Chronotube" />
      <Abstract />
      <a href="/">
        <PrimaryButton
          text={mlString({
            ja: 'ホームに戻る',
            en: 'Return to home',
          })}
        />
      </a>
    </ColumnContent>
  )
}

export default NotFound
