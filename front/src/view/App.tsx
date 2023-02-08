import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
