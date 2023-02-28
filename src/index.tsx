import React, { createContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { cacheList } from 'src/common/utils/db/CacheList'
import { storeSubscription } from 'src/common/utils/db/Subscription'
import App from './view/App'
import './index.css'

const getDeviceType = (): DeviceType => {
  const width = window.innerWidth
  if (width < 680) return 'mobile'
  else return 'pc'
}

export type DeviceType = 'mobile' | 'pc'
export const DeviceTypeContext = createContext<DeviceType>(getDeviceType())

const Index: React.FC = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType())

  useEffect(() => {
    const onResize = (): void => {
      setDeviceType(getDeviceType())
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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
    <DeviceTypeContext.Provider value={deviceType}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DeviceTypeContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
)
