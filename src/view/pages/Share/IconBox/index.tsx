import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import { dateToString } from 'src/common/utils/dateToString'
import TextBlock from 'src/view/components/atoms/TextBlock'
import styled from 'styled-components'
import Snippet from './Snippet'
import { SharedChannelType } from '..'
import NoTranslate from 'src/view/components/atoms/NoTranslate'
import { mlString } from 'src/common/utils/switchLanguages'

export type IconBoxPropsType = {
  channel: SharedChannelType
}

const IconBox: React.FC<IconBoxPropsType> = (props) => {
  const { channel } = props
  const { id, name, subscribeDate, playCount } = channel

  return (
    <Wrapper>
      <a
        href={`https://www.youtube.com/channel/${id}`}
        target="_blank"
        rel="nofollow"
      >
        <Icon src={`/api/channel-thumbnail.php?id=${id}`} />
        <TextBlock color={color.black} size={fontSize.medium} weight="bold">
          <NoTranslate>{name}</NoTranslate>
        </TextBlock>
        <SnippetWrapper>
          <Snippet
            text={mlString({
              ja: `${dateToString(new Date(subscribeDate))}に登録`,
              en: `Subscribed on ${dateToString(new Date(subscribeDate))}`,
            })}
          />
          <Snippet
            text={mlString({
              ja: `${playCount}回再生`,
              en: `${playCount} views`,
            })}
          />
        </SnippetWrapper>
      </a>
    </Wrapper>
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
