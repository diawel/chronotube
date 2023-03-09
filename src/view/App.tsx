import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { cacheList } from 'src/common/utils/db/cacheList'
import Wrap from './components/atoms/Wrap'
import { useEffect } from 'react'
import {
  storeChannels,
  validateChannels,
} from 'src/common/utils/db/subscription'
import AddHistory from './pages/AddHistory'
import UpdateSubscription from './pages/UpdateSubscription'

const App: React.FC = () => {
  useEffect(() => {
    cacheList.files
      .each(async (file) => {
        switch (file.purpose) {
          case 'subscription':
            await storeChannels(
              validateChannels(JSON.parse(await file.blob.text()))
            )
            console.log('done')
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
        <Route path="/addhistory" element={<AddHistory />} />
        <Route path="/updatesubscription" element={<UpdateSubscription />} />
      </Routes>
    </Wrap>
  )
}

export default App
