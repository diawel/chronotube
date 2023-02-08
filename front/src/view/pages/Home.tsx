import { useContext } from 'react'
import { DeviceTypeContext } from 'src/index'

const Home: React.FC = () => {
  const DeviceType = useContext(DeviceTypeContext)
  console.log('render')
  return <div>{DeviceType}</div>
}

export default Home
