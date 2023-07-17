import { useContext } from 'react'
import Input from 'src/view/components/atoms/Input'
import { SearchContext } from '..'
import { mlString } from 'src/common/utils/switchLanguages'

const FilterInput: React.FC = () => {
  const { filter, setFilter } = useContext(SearchContext)

  return (
    <Input
      type="text"
      value={filter}
      valueSetter={setFilter}
      placeholder={mlString({
        ja: 'チャンネルを検索',
        en: 'Search channels',
      })}
    />
  )
}

export default FilterInput
