import styled from 'styled-components'
import Text from 'src/view/components/atoms/Text'
import { color } from 'src/styles/color'
import RoundBox from 'src/view/components/atoms/RoundBox'

const LoginButton: React.FC = () => {
  return (
    <a href="/api/redirect.php">
      <RoundBox style={{ background: color.white }}>
        <InnerBox>
          <Text style={{ color: color.black, size: '12px' }}>
            ログインしてデータを取得
          </Text>
        </InnerBox>
      </RoundBox>
    </a>
  )
}

const InnerBox = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default LoginButton
