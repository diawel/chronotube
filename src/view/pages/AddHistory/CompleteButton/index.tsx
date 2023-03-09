import { Link } from 'react-router-dom'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'
import { ProgressType } from '..'

export type CompleteButtonPropsType = {
  progress: ProgressType
}

const CompleteButton: React.FC<CompleteButtonPropsType> = (props) => {
  const { progress } = props

  if (progress == 'finished')
    return (
      <Link to="/">
        <PrimaryButton text="完了" />
      </Link>
    )
  return (
    <LoadingButtonWrapper>
      <PrimaryButton text="完了" />
    </LoadingButtonWrapper>
  )
}

const LoadingButtonWrapper = styled.div`
  opacity: 0.5;
`

export default CompleteButton
