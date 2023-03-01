import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { cacheList } from 'src/common/utils/db/cacheList'
import Wrap from './components/atoms/Wrap'
import { useEffect } from 'react'
import { storeSubscription } from 'src/common/utils/db/subscription'

const App: React.FC = () => {
  useEffect(() => {
    cacheList.files
      .each(async (file) => {
        switch (file.purpose) {
          case 'subscription':
            await storeSubscription(file.blob)
            break
          default:
            console.error('Unknown cache')
        }
      })
      .then(async () => {
        await cacheList.files.clear()
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <Wrap>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Wrap>
  )
}

export default App
