import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import { DeviceContext } from 'src/index'
import styled from 'styled-components'
import TextBlock from '../../atoms/TextBlock'
import PrimaryButton from '../../molecules/PrimaryButton'
import { ml, mlString } from 'src/common/utils/switchLanguages'

const EngageAddHistory: React.FC = () => {
  const deviceType = useContext(DeviceContext)

  return (
    <Wrapper padding={deviceType == 'mobile' ? '16px' : '24px'}>
      <TextWrapper>
        <TextBlock color={color.black} size={fontSize.large} weight="bold">
          {ml({
            ja: '再生履歴を追加すると、より詳しい情報が確認できます。',
            en: 'Add your watch history to see more information.',
          })}
        </TextBlock>
      </TextWrapper>
      <Link to="/addhistory">
        <PrimaryButton
          text={mlString({ ja: '再生履歴を追加', en: 'Add watch history' })}
        />
      </Link>
    </Wrapper>
  )
}

type WrapperStyleType = {
  padding: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    padding: ${style.padding};
    max-width: 384px;
    border-radius: 24px;
    background: ${color.lightGray};
    margin: 48px auto;
  `
)

const TextWrapper = styled.div`
  margin-bottom: 48px;
`

export default EngageAddHistory
