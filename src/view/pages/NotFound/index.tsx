import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import InitPage from '../util/InitPage'
import Abstract from './Abstract'

const NotFound: React.FC = () => {
  return (
    <ColumnContent>
      <InitPage notFound={true} pageTitle="404 Not Found | Chronotube" />
      <Abstract />
      <a href="/">
        <PrimaryButton text="ホームに戻る" />
      </a>
    </ColumnContent>
  )
}

export default NotFound
