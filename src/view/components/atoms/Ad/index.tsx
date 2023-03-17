import styled from 'styled-components'

const Ad: React.FC = () => {
  return (
    <Wrapper>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1491068566472383"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1491068566472383"
        data-ad-slot="9540915657"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow: auto;
`

export default Ad
