import { fontSize } from 'src/common/styles/fontSize'
import styled from 'styled-components'
import SkeletonBox from '..'

const SkeletonVideoBox: React.FC = () => {
  return (
    <Container>
      <ThumbnailWrapper>
        <SkeletonBox height="100%" borderRadius="8px" aspectRatio="16 / 9" />
      </ThumbnailWrapper>
      <TextBox>
        <SkeletonBox width="100%" height={fontSize.regular} margin="0 0 10px" />
        <SkeletonBox width="80%" height={fontSize.regular} margin="0 0 10px" />
        <SkeletonBox width="80px" height={fontSize.small} />
      </TextBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 72px;
`

const ThumbnailWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 16px;
  height: 100%;
`

const TextBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
`

export default SkeletonVideoBox
