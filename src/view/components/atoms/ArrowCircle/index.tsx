import { color } from 'src/common/styles/color'
import chevronDown from 'src/common/svg/chevronDown'
import styled from 'styled-components'
import Icon from '../Icon'
import RoundBox from '../RoundBox'

export type ArrowCirclePropsType = {
  direction: keyof typeof ArrowDirection
}

enum ArrowDirection {
  DOWN = '0deg',
  LEFT = '90deg',
  UP = '180deg',
  RIGHT = '270deg',
}

const ArrowCircle: React.FC<ArrowCirclePropsType> = (props) => {
  const { direction } = props
  return (
    <RoundBox background={color.white}>
      <InnerWrapper>
        <Icon
          svg={chevronDown}
          size="24px"
          rotate={ArrowDirection[direction]}
        />
      </InnerWrapper>
    </RoundBox>
  )
}

const InnerWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${color.black};
`

export default ArrowCircle
