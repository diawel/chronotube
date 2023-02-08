import { useContext } from 'react'
import { DeviceTypeContext } from 'src/index'
import styled from 'styled-components'
import Text from 'src/view/components/atoms/Text'
import Logo from 'src/view/components/atoms/Logo'
import LoginButton from './LoginButton'
import { color } from 'src/styles/color.ts'

const Content: React.FC = () => {
  const DeviceType = useContext(DeviceTypeContext)
  return (
    <Wrapper>
      <LogoBox>
        <Logo width={DeviceType === 'mobile' ? '220px' : '280px'} />
        <div>
          <Text style={{ color: color.black, size: '12px' }}>
            YouTubeのチャンネル登録日を検索
          </Text>
        </div>
      </LogoBox>
      <LoginButton />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const LogoBox = styled.div`
  text-align: center;
`

export default Content
