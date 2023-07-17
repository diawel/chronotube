import { useState } from 'react'
import styled from 'styled-components'
import PulldownBox from 'src/view/components/molecules/PulldownBox'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import PulldownButton from './PulldownButton'
import { Link } from 'react-router-dom'
import Pulldown from 'src/view/pages/Home/Default/Control/Mobile/PulldownOption'
import { mlString } from 'src/common/utils/switchLanguages'

const Mobile: React.FC = () => {
  const [isPulldownOpen, setIsPulldownOpen] = useState(false)
  return (
    <Wrapper>
      <StableButtons>
        <PrimaryButtonWrapper>
          <Link to="/updatesubscription">
            <PrimaryButton
              text={mlString({
                ja: '登録チャンネルを更新',
                en: 'Update subscriptions',
              })}
            />
          </Link>
        </PrimaryButtonWrapper>
        <PulldownButton
          isOpen={isPulldownOpen}
          isOpenSetter={setIsPulldownOpen}
        />
      </StableButtons>
      <PulldownBox
        width="100%"
        isOpen={isPulldownOpen}
        isOpenSetter={setIsPulldownOpen}
      >
        <Pulldown
          linkTo="/addhistory"
          text={mlString({
            ja: '再生履歴を追加',
            en: 'Add watch history',
          })}
        />
        <Pulldown
          linkTo="/backup"
          text={mlString({
            ja: '再生履歴をバックアップ',
            en: 'Backup watch history',
          })}
        />
      </PulldownBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 16px;
  max-width: 384px;
  margin: auto;
`

const PrimaryButtonWrapper = styled.div`
  width: 100%;
  margin-right: 16px;
`

const StableButtons = styled.div`
  display: flex;
  margin-bottom: 16px;
`

export default Mobile
