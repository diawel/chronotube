import styled from 'styled-components'
import Text from 'src/view/components/atoms/Text'
import { color } from 'src/common/styles/color'
import RoundBox from 'src/view/components/atoms/RoundBox'

export type ProgressButtonPropsType = {
  text?: string
  progress: number // 0-100
}

const ProgressButton: React.FC<ProgressButtonPropsType> = (props) => {
  const { text, progress } = props
  return (
    <RoundBox
      style={{
        background: `linear-gradient(to right, ${color.black} ${progress}%, ${color.white} ${progress}%)`,
      }}
    >
      <InnerBox>
        <Text color={color.white} size="12px">
          {text ? text : `${Math.floor(progress)}%`}
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
  mix-blend-mode: exclusion;
`

export default ProgressButton
