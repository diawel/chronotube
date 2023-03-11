import { Link } from 'react-router-dom'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import styled from 'styled-components'
import TextBlock from '../../atoms/TextBlock'
import PrimaryButton from '../../molecules/PrimaryButton'

const EngageAddHistory: React.FC = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <TextBlock color={color.black} size={fontSize.large} weight="bold">
          再生履歴を追加すると、より詳しい情報が確認できます。
        </TextBlock>
      </TextWrapper>
      <Link to="/addhistory">
        <PrimaryButton text="再生履歴を追加" />
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 16px;
  max-width: 384px;
  margin: auto;
`

const TextWrapper = styled.div`
  margin: 48px 0;
`

export default EngageAddHistory
