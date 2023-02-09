import { useContext } from 'react'
import { DeviceTypeContext } from 'src/index'
import NoData from './NoData'

const Home: React.FC = () => {
  const DeviceType = useContext(DeviceTypeContext)
  console.log(DeviceType)
  return <NoData />
}

export default Home
