import { useContext } from 'react'
import Input from 'src/view/components/atoms/Input'
import { SearchContext } from '..'

const FilterInput: React.FC = () => {
  const { filter, setFilter } = useContext(SearchContext)

  return (
    <Input
      type="text"
      value={filter}
      valueSetter={setFilter}
      placeholder="チャンネルを検索"
    />
  )
}

export default FilterInput
