import { useContext, useEffect, useState } from 'react'
import { DeviceContext } from 'src/index'

const Ad: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const deviceType = useContext(DeviceContext)

  useEffect(() => {
    if (isVisible) {
      let adsbygoogle = (window as any).adsbygoogle
      adsbygoogle = adsbygoogle || []
      adsbygoogle.push({})
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) setIsVisible(true)
  }, [isVisible])

  useEffect(() => {
    setIsVisible(false)
  }, [deviceType])

  if (isVisible)
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-1491068566472383"
        data-ad-slot="4777250544"
      />
    )
  return <></>
}

export default Ad
