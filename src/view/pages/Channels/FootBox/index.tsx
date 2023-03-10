import { useContext } from 'react'
import { color } from 'src/common/styles/color'
import { DeviceContext } from 'src/index'
import styled from 'styled-components'
import FilterInput from '../FilterInput'

const FootBox: React.FC = () => {
  const deviceType = useContext(DeviceContext)

  if (deviceType == 'mobile')
    return (
      <Wrapper>
        <FilterInput />
      </Wrapper>
    )
  return <></>
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  padding 16px;
  width: 100%;
  box-sizing: border-box;
  & > * {
    box-shadow: 0px 16px 32px ${color.shadow};
  }
`

export default FootBox
