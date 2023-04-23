import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { cacheList } from 'src/common/utils/db/cacheList'
import { useEffect } from 'react'
import {
  storeChannels,
  validateChannels,
} from 'src/common/utils/db/subscription'
import AddHistory from './pages/AddHistory'
import UpdateSubscription from './pages/UpdateSubscription'
import Backup from './pages/Backup'
import Channels from './pages/Channels'
import Channel from './pages/Channel'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Share from './pages/Share'

const App: React.FC = () => {
  useEffect(() => {
    cacheList.files
      .each(async (file) => {
        switch (file.purpose) {
          case 'subscription':
            let parsed
            try {
              parsed = JSON.parse(await file.blob.text())
            } catch {}
            await storeChannels(validateChannels(parsed))
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/addhistory" element={<AddHistory />} />
      <Route path="/updatesubscription" element={<UpdateSubscription />} />
      <Route path="/backup" element={<Backup />} />
      <Route path="/channels" element={<Channels />} />
      <Route path="/channel/:id" element={<Channel />} />
      <Route path="/share" element={<Share />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
