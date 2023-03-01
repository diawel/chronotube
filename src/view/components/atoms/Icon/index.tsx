import styled from 'styled-components'

export type IconPropsType = WrapperStyleType & {
  svg: JSX.Element
}

const Icon: React.FC<IconPropsType> = (props) => {
  const { svg, size, rotate } = props
  return <Wrapper {...{ size, rotate }}>{svg}</Wrapper>
}

type WrapperStyleType = {
  size: string
  rotate?: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    display: inline-block;
    font-size: 0;
    vertical-align: inherit;
    & > svg {
      ${style.rotate ? `transform: rotate(${style.rotate});` : ''}
      width: ${style.size};
      height: ${style.size};
      object-fit: contain;
    }
  `
)

export default Icon
