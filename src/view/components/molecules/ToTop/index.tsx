import { useContext, useEffect, useState } from 'react'
import { color } from 'src/common/styles/color'
import { DeviceContext } from 'src/index'
import ArrowCircle from 'src/view/components/atoms/ArrowCircle'
import styled, { keyframes } from 'styled-components'
import Button from '../../atoms/Button'

let hideDate: Date

const ToTop: React.FC = () => {
  const deviceType = useContext(DeviceContext)
  const [isVisible, setIsVisible] = useState(false)

  const checkHideDate = () => {
    const nowDate = new Date()

    if (nowDate >= hideDate) setIsVisible(false)
    else
      window.setTimeout(() => {
        checkHideDate()
      }, hideDate.getTime() - nowDate.getTime())
  }

  useEffect(() => {
    const onBodyScroll = () => {
      const date = new Date()
      if (window.scrollY > 0) {
        date.setSeconds(date.getSeconds() + 3)
        hideDate = date
        setIsVisible(true)
        window.setTimeout(() => {
          checkHideDate()
        }, 3000)
      } else {
        hideDate = date
        checkHideDate()
      }
    }
    document.addEventListener('scroll', onBodyScroll)
    return () => document.removeEventListener('scroll', onBodyScroll)
  }, [])

  const node = (
    <Wrapper margin={deviceType == 'mobile' ? '16px' : '24px'}>
      <Button
        onClick={() => {
          window.scroll({
            top: 0,
            behavior: 'smooth',
          })
        }}
      >
        <ArrowCircle direction="UP" />
      </Button>
    </Wrapper>
  )

  if (isVisible) return <ShowAnimatedWrapper>{node}</ShowAnimatedWrapper>
  return <HideAnimatedWrapper>{node}</HideAnimatedWrapper>
}

const show = keyframes`
  0% {
    display: block;
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
`

const hide = keyframes`
  0% {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    display: block;
    opacity: 0;
    transform: translateY(8px);
  }
`

const ShowAnimatedWrapper = styled.div`
  & > div {
    animation: ${show} 0.3s ease-out 0.3s backwards;
  }
`

const HideAnimatedWrapper = styled.div`
  & > div {
    animation: ${hide} 0.3s ease-in 0.3s forwards;
  }
`

type WrapperStyleType = {
  margin: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    display: block;
    position: fixed;
    bottom: 24px;
    right: ${style.margin};
    border-radius: 50%;
    box-shadow: 0px 16px 32px ${color.shadow};
    z-index: 100;
  `
)

export default ToTop
