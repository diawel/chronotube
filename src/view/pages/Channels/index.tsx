import { SortByType } from 'src/view/components/organisms/ChannelList'
import { createContext, useEffect, useState } from 'react'
import TopBox from './TopBox'
import SearchedChannelList from './SearchedChannelList'
import { sessionStorageKey } from 'src/common/utils/sessionStorage'
import InitPage from '../util/InitPage'
import ToTop from 'src/view/components/molecules/ToTop'
import { color } from 'src/common/styles/color'

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
      <InitPage
        pageTitle="登録チャンネル一覧 | Chronotube"
        background={color.lightGray}
      />
      <TopBox />
      <SearchedChannelList />
      <ToTop />
    </SearchContext.Provider>
  )
}

export default Channels
