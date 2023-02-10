import { useContext } from 'react'
import { DeviceTypeContext } from 'src/index'
import styled from 'styled-components'
import TextBlock from 'src/view/components/atoms/TextBlock'
import Logo from 'src/view/components/atoms/Logo'
import { color } from 'src/common/styles/color'

const LogoBox: React.FC = () => {
  const DeviceType = useContext(DeviceTypeContext)
  return (
    <Wrapper>
      <Logo width={DeviceType === 'mobile' ? '220px' : '280px'} />
      <TextBlock style={{ color: color.black, size: '12px' }}>
        YouTubeのチャンネル登録日を検索
      </TextBlock>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 120px;
`

export default LogoBox
