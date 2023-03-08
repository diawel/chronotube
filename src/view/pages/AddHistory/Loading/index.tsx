import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import LoadingIcon from 'src/view/components/atoms/LoadingIcon'
import TextBlock from 'src/view/components/atoms/TextBlock'
import styled from 'styled-components'
import { ProgressType } from '..'

export type LoadingPropsType = {
  progress: ProgressType
}

const progressSnippet: { [index in ProgressType]: string } = {
  ready: '',
  init: '初期化中',
  parse: 'JSONデータを解析中',
  store: 'データベースに格納中',
  finished: '',
}

const Loading: React.FC<LoadingPropsType> = (props) => {
  const { progress } = props

  return (
    <Wrapper>
      <IconWrapper>
        <LoadingIcon />
      </IconWrapper>
      <TextBlock color={color.black} size={fontSize.small}>
        {progressSnippet[progress]}
      </TextBlock>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconWrapper = styled.div`
  padding: 32px;
`

export default Loading
