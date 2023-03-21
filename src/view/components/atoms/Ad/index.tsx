import { useEffect, useState } from 'react'

let fetchDate: Date
let lastWidth: number

const Ad: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (isVisible) {
      let adsbygoogle = (window as any).adsbygoogle
      adsbygoogle = adsbygoogle || []
      adsbygoogle.push({})
    }
  }, [isVisible])

  const checkFetchDate = () => {
    const nowDate = new Date()

    if (nowDate >= fetchDate) setIsVisible(true)
    else
      window.setTimeout(() => {
        checkFetchDate()
      }, fetchDate.getTime() - nowDate.getTime())
  }

  useEffect(() => {
    const onResize = (): void => {
      const width = window.innerWidth
      if (width == lastWidth) return

      setIsVisible(false)

      const date = new Date()
      date.setSeconds(date.getSeconds() + 1)
      fetchDate = date
      window.setTimeout(() => {
        checkFetchDate()
      }, 1000)
      lastWidth = width
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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
