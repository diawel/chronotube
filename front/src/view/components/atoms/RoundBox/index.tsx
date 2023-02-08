import styled from 'styled-components'

type RoundBoxStyleType = {
  shadow?: string
  background?: string
}

const RoundBox = styled.footer<RoundBoxStyleType>(
  (style) => `
    border-radius: 24px;
    box-shadow: ${style.shadow ? style.shadow : 'none'};
    background: ${style.background ? style.background : 'none'}
  `
)

export default RoundBox
