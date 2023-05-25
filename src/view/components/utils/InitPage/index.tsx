import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { color } from 'src/common/styles/color'

export type InitPagePropsType = {
  notFound?: boolean
  themeColor?: string
  pageTitle: string
}

const InitPage: React.FC<InitPagePropsType> = (props) => {
  const { notFound, themeColor, pageTitle } = props
  const location = useLocation()

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', themeColor || color.lightGray)
  }, [themeColor])

  useEffect(() => {
    const title = document.querySelector('head title')
    if (title) title.textContent = pageTitle
  }, [pageTitle])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    if (!notFound && searchParams.get('not_found')) {
      searchParams.delete('not_found')

      window.location.replace(
        buildRelativeUrl(
          location.pathname,
          searchParams.toString(),
          location.hash
        )
      )
    } else if (notFound && searchParams.get('not_found') != '1') {
      searchParams.append('not_found', '1')

      window.location.replace(
        buildRelativeUrl(
          location.pathname,
          searchParams.toString(),
          location.hash
        )
      )
    }
  }, [notFound, location])

  return <></>
}

const buildRelativeUrl = (
  pathname: string,
  searchParams: string,
  hash: string
) => {
  return pathname + (searchParams ? '?' + searchParams : '') + hash
}

export default InitPage
