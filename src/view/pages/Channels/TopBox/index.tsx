import { useContext } from 'react'
import { color } from 'src/common/styles/color'
import { DeviceContext } from 'src/index'
import Logo from 'src/view/components/atoms/Logo'
import styled from 'styled-components'
import FilterInput from '../FilterInput'
import SortBySelect from '../SortBySelect'

const TopBox: React.FC = () => {
  const deviceType = useContext(DeviceContext)

  return (
    <Wrapper
      padding={deviceType == 'mobile' ? '8px 16px' : '12px 24px'}
      fixed={deviceType == 'pc'}
    >
      <Logo height="36px" />
      {deviceType == 'pc' && (
        <InputWrapper>
          <FilterInput />
        </InputWrapper>
      )}
      <SortBySelect />
    </Wrapper>
  )
}

type WrapperStyleType = {
  padding: string
  fixed: boolean
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    ${
      style.fixed
        ? `
          position: sticky;
          top: 0;
        `
        : ''
    }
    padding: ${style.padding};
    display: flex;
    align-items: center;
    height: 48px;
    background: ${color.lightGray};
  `
)

const InputWrapper = styled.div`
  width: 320px;
  margin: 0 16px;
`

export default TopBox
