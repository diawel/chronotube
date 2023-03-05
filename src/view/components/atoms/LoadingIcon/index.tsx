import styled, { keyframes } from 'styled-components'

const LoadingIcon: React.FC = () => {
  return <Circle />
}

const loading = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`

const Circle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #121212;
  border-radius: 50%;
  animation: ${loading} 1.2s infinite;
`

export default LoadingIcon
