import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import { dateToString } from 'src/common/utils/dateToString'
import { Channel } from 'src/common/utils/db/subscription'
import TextBlock from 'src/view/components/atoms/TextBlock'
import SmallButton from 'src/view/components/molecules/SmallButton'
import styled from 'styled-components'
import Snippet from './Snippet'

export type IconBoxPropsType = {
  channel: Channel
  withPlayCount: boolean
}

const IconBox: React.FC<IconBoxPropsType> = (props) => {
  const { channel, withPlayCount } = props
  const { id, name, thumbnail, subscribeDate, playCount } = channel

  const tweetText = withPlayCount
    ? `わたしが「${name}」をチャンネル登録したのは${dateToString(
        subscribeDate
      )}、これまで再生した回数は${playCount}回でした。`
    : `わたしが「${name}」をチャンネル登録したのは${dateToString(
        subscribeDate
      )}でした。`

  return (
    <Wrapper>
      <a
        href={`https://www.youtube.com/channel/${id}`}
        target="_blank"
        rel="nofollow"
      >
        <Icon src={thumbnail.high.url} />
        <TextBlock color={color.black} size={fontSize.medium} weight="bold">
          {name}
        </TextBlock>
        <SnippetWrapper>
          <Snippet text={`${dateToString(subscribeDate)}に登録`} />
          {withPlayCount && <Snippet text={`${playCount}回再生`} />}
        </SnippetWrapper>
      </a>
      <TweetButtonWrapper>
        <a
          href={`https://twitter.com/share?text=${encodeURIComponent(
            tweetText
          )}&url=${encodeURIComponent(
            'https://chronotube.diawel.me/'
          )}&hashtags=${encodeURIComponent(`わたしの推し履歴,Chronotube`)}`}
          target="_blank"
          rel="nofollow"
        >
          <SmallButton text="#結果をツイートする" />
        </a>
      </TweetButtonWrapper>
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

const TweetButtonWrapper = styled.div`
  margin: 24px;
`

export default IconBox
