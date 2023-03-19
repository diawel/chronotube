import styled from 'styled-components'

const Ad: React.FC = () => {
  return (
    <Wrapper>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1491068566472383"
        data-ad-slot="9540915657"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow: auto;
`

export default Ad
