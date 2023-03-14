import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { color } from 'src/common/styles/color'
import { DeviceContext } from 'src/index'
import Logo from 'src/view/components/atoms/Logo'
import styled from 'styled-components'
import FilterInput from '../FilterInput'
import SortBySelect from '../SortBySelect'

const TopBox: React.FC = () => {
  const deviceType = useContext(DeviceContext)
  const [isFloating, setIsFloating] = useState(false)
  useEffect(() => {
    const onBodyScroll = () => {
      setIsFloating(window.scrollY != 0)
    }
    document.addEventListener('scroll', onBodyScroll)
    return () => document.removeEventListener('scroll', onBodyScroll)
  }, [])

  return (
    <Wrapper
      padding={
        deviceType == 'mobile'
          ? isFloating
            ? '8px 16px'
            : '16px'
          : '12px 24px'
      }
      background={isFloating ? color.lightGray : 'transparent'}
      shadow={isFloating ? `0px 16px 32px ${color.shadow}` : 'none'}
    >
      {deviceType == 'pc' && (
        <LogoWrapper>
          <Link to="/">
            <Logo height="36px" />
          </Link>
        </LogoWrapper>
      )}
      <InputWrapper>
        <FilterInput />
      </InputWrapper>
      <SortBySelect />
    </Wrapper>
  )
}

const LogoWrapper = styled.div`
  margin-right: 24px;
`

type WrapperStyleType = {
  padding: string
  background: string
  shadow: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    padding: ${style.padding};
    background: ${style.background};
    box-shadow: ${style.shadow};
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    height: 48px;
    transition: box-shadow 0.3s, padding 0.3s, background 0.15s;
  `
)

const InputWrapper = styled.div`
  width: 320px;
  margin-right: 16px;
`

export default TopBox
