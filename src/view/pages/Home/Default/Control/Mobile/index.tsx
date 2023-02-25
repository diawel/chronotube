import { useState } from 'react'
import styled from 'styled-components'
import PulldownBox from 'src/view/components/molecules/PulldownBox'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import PulldownButton from './PulldownButton'
import { Link } from 'react-router-dom'
import PulldownOption from './PulldownOption'

const Mobile: React.FC = () => {
  const [isPulldownOpen, setIsPulldownOpen] = useState(false)
  return (
    <Wrapper>
      <StableButtons>
        <PrimaryButtonWrapper>
          <Link to="/login">
            <PrimaryButton text="登録チャンネルを更新" />
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
        <PulldownOption linkTo="/addhistory" text="再生履歴を追加" />
        <PulldownOption linkTo="/backup" text="再生履歴をバックアップ" />
      </PulldownBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 16px;
  max-width: 440px;
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
