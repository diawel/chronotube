import { SortByType } from 'src/view/components/organisms/ChannelList'
import { createContext, useContext, useEffect, useState } from 'react'
import TopBox from './TopBox'
import SearchedChannelList from './SearchedChannelList'
import styled from 'styled-components'
import { DeviceContext } from 'src/index'
import { sessionStorageKey } from 'src/common/utils/sessionStorage'

type searchType = {
  filter: string
  setFilter: (filter: string) => void
  sortBy: SortByType
  setSortBy: (sortBy: SortByType) => void
}
export const SearchContext = createContext<searchType>({
  filter: '',
  setFilter: () => {},
  sortBy: 'subscribeDate',
  setSortBy: () => {},
})

const Channels: React.FC = () => {
  const [filter, setFilter] = useState(
    sessionStorage.getItem(sessionStorageKey.filter) || ''
  )
  const [sortBy, setSortBy] = useState<SortByType>(
    (sessionStorage.getItem(sessionStorageKey.sortBy) as SortByType) ||
      'subscribeDate'
  )
  const deviceType = useContext(DeviceContext)

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey.filter, filter)
  }, [filter])
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey.sortBy, sortBy)
    window.scroll(0, 0)
  }, [sortBy])

  return (
    <SearchContext.Provider
      value={{ ...{ filter, setFilter, sortBy, setSortBy } }}
    >
      <TopBox />
      <ListWrapper bottomMargin={deviceType == 'mobile' ? '80px' : '0'}>
        <SearchedChannelList />
      </ListWrapper>
    </SearchContext.Provider>
  )
}

type ListWrapperStyleType = {
  bottomMargin: string
}

const ListWrapper = styled.div<ListWrapperStyleType>(
  (style) => `
    margin-bottom: ${style.bottomMargin};
  `
)

export default Channels
