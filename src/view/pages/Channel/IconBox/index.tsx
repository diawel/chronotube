import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import { dateToString } from 'src/common/utils/dateToString'
import { ChannelType } from 'src/common/utils/db/subscription'
import TextBlock from 'src/view/components/atoms/TextBlock'
import SmallButton from 'src/view/components/molecules/SmallButton'
import styled from 'styled-components'
import Snippet from './Snippet'
import { ChannelAbstractType } from 'src/common/utils/types/youtube'
import NoTranslate from 'src/view/components/atoms/NoTranslate'

export type IconBoxPropsType = {
  historyCount: number
  channel: ChannelType
  firstPlayback?: { id: string; title: string; playbackDate: Date }
  mostPlayedVideo?: { id: string; title: string; playCount: number }
  triggerPlayback?: {
    id: string
    title: string
    uploader: ChannelAbstractType
  }
}

const IconBox: React.FC<IconBoxPropsType> = (props) => {
  const {
    channel,
    historyCount,
    firstPlayback,
    mostPlayedVideo,
    triggerPlayback,
  } = props
  const { id, name, thumbnail, subscribeDate, playCount } = channel

  let tweetText = historyCount
    ? `わたしが「${name}」をチャンネル登録したのは${dateToString(
        subscribeDate
      )}、これまで再生した回数は${playCount}回でした。`
    : `わたしが「${name}」をチャンネル登録したのは${dateToString(
        subscribeDate
      )}でした。`
  tweetText += '\n#わたしの推し履歴 #Chronotube'

  let shareUrl = 'https://chronotube.diawel.me/'
  if (historyCount) {
    tweetText += '\n\n▼詳しい結果を見る'
    shareUrl += `share?d=${encodeURIComponent(
      JSON.stringify({
        channel: { ...{ id, name, subscribeDate, playCount } },
        firstPlayback: firstPlayback
          ? {
              id: firstPlayback.id,
              title: firstPlayback.title,
              playbackDate: firstPlayback.playbackDate,
            }
          : undefined,
        mostPlayedVideo: mostPlayedVideo
          ? {
              id: mostPlayedVideo.id,
              title: mostPlayedVideo.title,
              playCount: mostPlayedVideo.playCount,
            }
          : undefined,
        triggerPlayback: triggerPlayback
          ? {
              id: triggerPlayback.id,
              title: triggerPlayback.title,
              uploader: {
                id: triggerPlayback.uploader.id,
                name: triggerPlayback.uploader.name,
              },
            }
          : undefined,
        v: 1,
      })
    )}`
  }

  return (
    <Wrapper>
      <a
        href={`https://www.youtube.com/channel/${id}`}
        target="_blank"
        rel="nofollow"
      >
        <Icon src={thumbnail.high.url} />
        <TextBlock color={color.black} size={fontSize.medium} weight="bold">
          <NoTranslate>{name}</NoTranslate>
        </TextBlock>
        <SnippetWrapper>
          <Snippet text={`${dateToString(subscribeDate)}に登録`} />
          {historyCount ? <Snippet text={`${playCount}回再生`} /> : <></>}
        </SnippetWrapper>
      </a>
      <TweetButtonWrapper>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tweetText
          )}&url=${encodeURIComponent(shareUrl)}`}
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
