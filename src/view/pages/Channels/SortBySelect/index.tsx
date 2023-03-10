import { useContext, useEffect, useState } from 'react'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import chevronDown from 'src/common/svg/chevronDown'
import { DeviceContext } from 'src/index'
import Button from 'src/view/components/atoms/Button'
import Icon from 'src/view/components/atoms/Icon'
import Text from 'src/view/components/atoms/Text'
import TextBlock from 'src/view/components/atoms/TextBlock'
import PulldownBox from 'src/view/components/molecules/PulldownBox'
import { SortByType } from 'src/view/components/organisms/ChannelList'
import styled from 'styled-components'
import { SearchContext } from '..'

export type KeyValuePairType = { key: string; value: SortByType }

const keyValuePair: KeyValuePairType[] = [
  { key: '登録日順', value: 'subscribeDate' },
  { key: '再生数順', value: 'playCount' },
]

const SortBySelect: React.FC = () => {
  const { sortBy, setSortBy } = useContext(SearchContext)
  const deviceType = useContext(DeviceContext)
  const [isFloating, setIsFloating] = useState(false)
  const [isPulldownOpen, setIsPulldownOpen] = useState(false)

  useEffect(() => {
    const onBodyScroll = () => {
      setIsFloating(window.scrollY != 0)
    }
    document.addEventListener('scroll', onBodyScroll)
    return () => document.removeEventListener('scroll', onBodyScroll)
  }, [])

  return (
    <Wrapper
      fixed={deviceType == 'mobile'}
      top={isFloating || isPulldownOpen ? '16px' : '12px'}
    >
      <Button
        onClick={() => {
          setIsPulldownOpen(!isPulldownOpen)
        }}
      >
        <SelectBox
          background={
            deviceType == 'pc' || isFloating || isPulldownOpen
              ? color.white
              : 'transparent'
          }
          shadow={
            deviceType == 'mobile' && (isFloating || isPulldownOpen)
              ? `0px 16px 32px ${color.shadow}`
              : 'none'
          }
        >
          <TextBlock>
            {
              keyValuePair.find((pair) => {
                return pair.value == sortBy
              })?.key
            }
          </TextBlock>
          <Icon svg={chevronDown} size="18px" />
        </SelectBox>
      </Button>
      <PulldownBoxWrapper>
        <PulldownBox
          width="fit-content"
          isOpen={isPulldownOpen}
          isOpenSetter={setIsPulldownOpen}
        >
          {keyValuePair.map((pair, pi) => {
            return (
              <Button
                key={pi}
                onClick={() => {
                  setSortBy(pair.value)
                  setIsPulldownOpen(false)
                }}
              >
                <Option>
                  <Text color={color.black} size={fontSize.small}>
                    {pair.key}
                  </Text>
                </Option>
              </Button>
            )
          })}
        </PulldownBox>
      </PulldownBoxWrapper>
    </Wrapper>
  )
}

type WrapperStyleType = {
  fixed: boolean
  top: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    ${
      style.fixed
        ? `
          position: fixed;
          top: ${style.top};
          right: 16px;
          transition: top 0.3s;
        `
        : ''
    }
    flex-shrink: 0;
    width: 112px;
  `
)

type SelectBoxStyleType = {
  background: string
  shadow: string
}

const SelectBox = styled.div<SelectBoxStyleType>(
  (style) => `
    box-shadow: ${style.shadow};
    background: ${style.background};
    border-radius: 24px;
    color: ${color.black};
    font-size: ${fontSize.small};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 0 24px;
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    transition: background 0.3s, box-shadow 0.3s;
  `
)

const PulldownBoxWrapper = styled.div`
  position: relative;
  top: 8px;
`

const Option = styled.div`
  padding: 8px 24px;
`

export default SortBySelect
