import styled from 'styled-components'
import Text from 'src/view/components/atoms/Text'
import { color } from 'src/common/styles/color'
import RoundBox from 'src/view/components/atoms/RoundBox'

export type PrimaryButtonPropsType = {
  text: string
}

const PrimaryButton: React.FC<PrimaryButtonPropsType> = (props) => {
  const { text } = props
  return (
    <RoundBox style={{ background: color.white }}>
      <InnerBox>
        <Text color={color.black} size="12px">
          {text}
        </Text>
      </InnerBox>
    </RoundBox>
  )
}

const InnerBox = styled.div`
  height: 48px;
  margin: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default PrimaryButton
