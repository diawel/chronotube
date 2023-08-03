import ColumnContent from 'src/view/components/templates/ColumnContent'
import LogoBox from './LogoBox'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'
import Ad from 'src/view/components/atoms/Ad'
import { mlString } from 'src/common/utils/switchLanguages'

const NoData: React.FC = () => {
  return (
    <ColumnContent>
      <LogoBox />
      <a href="/api/redirect.php">
        <PrimaryButton
          text={mlString({
            ja: 'ログインしてデータを取得',
            en: 'Login and fetch your subscriptions',
          })}
        />
      </a>
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
