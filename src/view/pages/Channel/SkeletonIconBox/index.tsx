import { fontSize } from 'src/common/styles/fontSize'
import SkeletonBox from 'src/view/components/atoms/SkeletonBox'
import styled from 'styled-components'

const SkeletonIconBox: React.FC = () => {
  return (
    <Wrapper>
      <SkeletonBox
        width="160px"
        height="160px"
        margin="12px 12px 16px"
        borderRadius="24px"
      />
      <SkeletonBox width="220px" height={fontSize.medium} margin="0 0 12px" />
      <SnippetWrapper>
        <SkeletonBox width="92px" height={fontSize.regular} margin="0 4px" />
        <SkeletonBox width="54px" height={fontSize.regular} margin="0 4px" />
      </SnippetWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`

const SnippetWrapper = styled.div`
  display: flex;
`

export default SkeletonIconBox
