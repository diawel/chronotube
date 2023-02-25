import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { useLiveQuery } from 'dexie-react-hooks'
import { cacheList } from 'src/common/utils/db/CacheList'
import Wrap from './components/atoms/Wrap'

const App: React.FC = () => {
  const cachedFiles = useLiveQuery(async () => await cacheList.files.toArray())

  return (
    <Wrap>
      <div>
        {cachedFiles?.map((file) => (
          <div key={file.purpose}>{file.purpose}</div>
        ))}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Wrap>
  )
}

export default App
