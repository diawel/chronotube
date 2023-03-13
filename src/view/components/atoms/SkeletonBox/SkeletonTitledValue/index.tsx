import styled from 'styled-components'
import { fontSize } from 'src/common/styles/fontSize'
import SkeletonBox from '..'

const SkeletonTitledValue: React.FC = () => {
  return (
    <Wrapper>
      <SkeletonBox
        width="108px"
        height={fontSize.regular}
        margin="8px 0 12px"
      />
      <SkeletonBox width="160px" height={fontSize.title} margin="0 0 14px" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 4px;
`

export default SkeletonTitledValue
