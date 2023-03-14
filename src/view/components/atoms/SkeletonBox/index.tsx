import styled, { keyframes } from 'styled-components'

export type SkeletonBoxPropsType = ContainerStyleType

const SkeletonBox: React.FC<SkeletonBoxPropsType> = (props) => {
  return (
    <Container {...props}>
      <AnimationBox />
    </Container>
  )
}

type ContainerStyleType = {
  width?: string
  height?: string
  aspectRatio?: string
  padding?: string
  margin?: string
  borderRadius?: string
}

const loading = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`

const Container = styled.div<ContainerStyleType>(
  (style) => `
    ${style.width ? `width: ${style.width};` : ''}
    ${style.height ? `height: ${style.height};` : ''}
    ${style.aspectRatio ? `aspect-ratio: ${style.aspectRatio};` : ''}
    ${style.padding ? `padding: ${style.padding};` : ''}
    ${style.margin ? `margin: ${style.margin};` : ''}
    border-radius: ${style.borderRadius || '4px'};
    background: #d9d9d9;
    position: relative;
    overflow: hidden;
  `
)

const AnimationBox = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  position: absolute;
  top: 0;
  left: 0;
  animation: ${loading} 1.2s linear infinite;
`

export default SkeletonBox
