import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import AddHistory from './pages/AddHistory'
import UpdateSubscription from './pages/UpdateSubscription'
import Backup from './pages/Backup'
import Channels from './pages/Channels'
import Channel from './pages/Channel'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Share from './pages/Share'

const App: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
