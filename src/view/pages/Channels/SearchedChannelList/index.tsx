import { useLiveQuery } from 'dexie-react-hooks'
import { useContext } from 'react'
import { subscription } from 'src/common/utils/db/subscription'
import ChannelList from 'src/view/components/organisms/ChannelList'
import styled from 'styled-components'
import { SearchContext } from '..'

const SearchedChannelList: React.FC = () => {
  const { filter, sortBy } = useContext(SearchContext)
  const liveQuery = useLiveQuery(async () => {
    return {
      channels: await subscription.channels.toArray(),
    }
  })

  if (liveQuery)
    return <ChannelList channels={liveQuery.channels} {...{ filter, sortBy }} />
  return <></>
}

const Wrapper = styled.div`
  margin: 16px 0;
`

export default SearchedChannelList
