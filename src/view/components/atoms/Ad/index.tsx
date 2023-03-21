import styled from 'styled-components'

const Ad: React.FC = () => {
  return (
    <Wrapper>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-1491068566472383"
        data-ad-slot="4777250544"
      ></ins>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow: auto;
`

export default Ad
