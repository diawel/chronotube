import ColumnContent from 'src/view/components/templates/ColumnContent'
import LogoBox from './LogoBox'
import LoginButton from './LoginButton'

const NoData: React.FC = () => {
  return (
    <ColumnContent>
      <LogoBox />
      <LoginButton />
    </ColumnContent>
  )
}

export default NoData
