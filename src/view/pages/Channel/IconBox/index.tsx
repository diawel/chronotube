import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import { dateToString } from 'src/common/utils/dateToString'
import { Channel } from 'src/common/utils/db/subscription'
import TextBlock from 'src/view/components/atoms/TextBlock'
import styled from 'styled-components'
import Snippet from './Snippet'

export type IconBoxPropsType = {
  channel: Channel
  withPlayCount: boolean
}

const IconBox: React.FC<IconBoxPropsType> = (props) => {
  const { channel, withPlayCount } = props
  const { id, name, thumbnail, subscribeDate, playCount } = channel
  return (
    <a
      href={`https://www.youtube.com/channel/${id}`}
      target="_blank"
      rel="nofollow"
    >
      <Wrapper>
        <Icon src={thumbnail.high.url} />
        <TextBlock color={color.black} size={fontSize.medium} weight="bold">
          {name}
        </TextBlock>
        <SnippetWrapper>
          <Snippet text={`${dateToString(subscribeDate)}に登録`} />
          {withPlayCount && <Snippet text={`${playCount}回再生`} />}
        </SnippetWrapper>
      </Wrapper>
    </a>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Icon = styled.img`
  width: 160px;
  height: 160px;
  margin: 12px;
  border-radius: 24px;
  box-shadow: 0px 16px 32px ${color.shadow};
`

const SnippetWrapper = styled.div`
  display: flex;
`

export default IconBox
