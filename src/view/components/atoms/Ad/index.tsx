import { useEffect } from 'react'

const Ad: React.FC = () => {
  useEffect(() => {
    let adsbygoogle = (window as any).adsbygoogle
    adsbygoogle = adsbygoogle || []
    adsbygoogle.push({})
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-1491068566472383"
      data-ad-slot="9540915657"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

export default Ad
