import { useContext, useState } from 'react'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import chevronDown from 'src/common/svg/chevronDown'
import Button from 'src/view/components/atoms/Button'
import Icon from 'src/view/components/atoms/Icon'
import Text from 'src/view/components/atoms/Text'
import TextBlock from 'src/view/components/atoms/TextBlock'
import PulldownBox from 'src/view/components/molecules/PulldownBox'
import { SortByType } from 'src/view/components/organisms/ChannelList'
import styled from 'styled-components'
import { SearchContext } from '..'
import { mlString } from 'src/common/utils/switchLanguages'

export type KeyValuePairType = { key: string; value: SortByType }

const keyValuePair: KeyValuePairType[] = [
  {
    key: mlString({
      ja: '登録日順',
      en: 'Subscribe date',
    }),
    value: 'subscribeDate',
  },
  {
    key: mlString({
      ja: '再生数順',
      en: 'Views',
    }),
    value: 'playCount',
  },
]

const SortBySelect: React.FC = () => {
  const { sortBy, setSortBy } = useContext(SearchContext)
  const [isPulldownOpen, setIsPulldownOpen] = useState(false)

  return (
    <Wrapper>
      <Button
        onClick={() => {
          setIsPulldownOpen(!isPulldownOpen)
        }}
      >
        <SelectBox>
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

const Wrapper = styled.div`
  flex-shrink: 0;
`

const SelectBox = styled.div`
  background: ${color.white};
  border-radius: 24px;
  color: ${color.black};
  font-size: ${fontSize.small};
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 24px;
  height: 48px;
  box-sizing: border-box;
`

const PulldownBoxWrapper = styled.div`
  position: relative;
  top: 8px;
`

const Option = styled.div`
  padding: 8px 24px;
`

export default SortBySelect
