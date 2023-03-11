import { useContext } from 'react'
import { DeviceContext } from 'src/index'
import Pc from './Pc'
import Mobile from './Mobile'

const Control: React.FC = () => {
  const deviceType = useContext(DeviceContext)
  switch (deviceType) {
    case 'mobile':
      return <Mobile />
    case 'pc':
      return <Pc />
  }
}

export default Control
