import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { color } from 'src/common/styles/color'
import chevronDown from 'src/common/svg/chevronDown'
import { subscription } from 'src/common/utils/db/Subscription'
import { sessionStorageKey } from 'src/common/utils/sessionStorage'
import Icon from 'src/view/components/atoms/Icon'
import Input from 'src/view/components/atoms/Input'
import Text from 'src/view/components/atoms/Text'
import styled from 'styled-components'
import Slider from './Slider'

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState(
    sessionStorage.getItem(sessionStorageKey.filter) || ''
  )
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey.filter, filter)
  }, [filter])

  const channels = useLiveQuery(
    async () => await subscription.channels.toArray()
  )

  return (
    <div>
      <TextWrapper>
        <Text color={color.darkGray} size="12px">
          登録済みのチャンネル
        </Text>
      </TextWrapper>
      <Slider channels={channels ? channels : []} filter={filter} />
      <BottomNav>
        <Link to="/channels">
          <LinkContent>
            <Text color={color.black} size="12px">
              すべて表示
              <Icon svg={chevronDown} size="16px" rotate="270deg" />
            </Text>
          </LinkContent>
        </Link>
        <Input
          type="text"
          value={filter}
          valueSetter={setFilter}
          placeholder="チャンネルを検索"
        />
      </BottomNav>
    </div>
  )
}

const TextWrapper = styled.div`
  text-align: center;
  padding: 16px;
`

const BottomNav = styled.div`
  max-width: 384px;
  margin: auto;
  padding: 16px;
  position: relative;
  z-index: 10;
`

const LinkContent = styled.div`
  & > * {
    display: flex;
    align-items: end;
    justify-content: right;
    margin-bottom: 16px;
  }
`

export default Gallery
