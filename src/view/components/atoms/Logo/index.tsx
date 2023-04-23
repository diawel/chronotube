import styled from 'styled-components'

export type LogoProps = ImageStyleType

type ImageStyleType = {
  width?: string
  height?: string
}

const Logo: React.FC<LogoProps> = (props) => {
  return <StyledImage src="/image/chronotube.svg" {...props} />
}
const StyledImage = styled.img<ImageStyleType>(
  (style) => `
    width: ${style.width ?? 'auto'};
    height: ${style.height ?? 'auto'};
  `
)

export default Logo
