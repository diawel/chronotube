import styled from 'styled-components'

type RoundBoxStyleType = {
  justify?: string
  shadow?: string
  background?: string
}

const RoundBox = styled.footer<RoundBoxStyleType>(
  (style) => `
    border-radius: 24px;
    display: flex;
    justify-content: ${style.justify};
    box-shadow: ${style.shadow};
    background: ${style.background ? style.background : 'none'}
  `
)

export default RoundBox
