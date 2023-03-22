import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'

export type OptionPropsType = {
  linkTo: string
  text: string
}

const Option: React.FC<OptionPropsType> = (props) => {
  const { linkTo, text } = props
  return (
    <ButtonWrapper>
      <Link to={linkTo}>
        <PrimaryButton text={text} />
      </Link>
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  margin-right: 24px;
  flex-shrink: 0;
`

export default Option
