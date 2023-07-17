import { Link } from 'react-router-dom'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'
import { ProgressType } from '..'
import { mlString } from 'src/common/utils/switchLanguages'

export type CompleteButtonPropsType = {
  progress: ProgressType
}

const CompleteButton: React.FC<CompleteButtonPropsType> = (props) => {
  const { progress } = props

  if (progress == 'finished')
    return (
      <Link to="/">
        <PrimaryButton
          text={mlString({
            ja: '完了',
            en: 'Completed',
          })}
        />
      </Link>
    )
  return (
    <LoadingButtonWrapper>
      <PrimaryButton
        text={mlString({
          ja: '完了',
          en: 'Completed',
        })}
      />
    </LoadingButtonWrapper>
  )
}

const LoadingButtonWrapper = styled.div`
  opacity: 0.5;
`

export default CompleteButton
