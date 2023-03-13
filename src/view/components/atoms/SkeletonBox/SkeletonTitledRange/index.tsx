import TextBlock from 'src/view/components/atoms/TextBlock'
import { color } from 'src/common/styles/color'
import styled from 'styled-components'
import { fontSize } from 'src/common/styles/fontSize'
import SkeletonBox from '..'

const SkeletonTitledRange: React.FC = () => {
  return (
    <Wrapper>
      <SkeletonBox
        width="108px"
        height={fontSize.regular}
        margin="8px 0 12px"
      />

      <SkeletonBox width="160px" height={fontSize.title} margin="12px 0 8px" />
      <TextBlock color={color.black} size={fontSize.large}>
        ↓
      </TextBlock>
      <SkeletonBox width="160px" height={fontSize.title} margin="12px 0 8px" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 4px;
`

export default SkeletonTitledRange
