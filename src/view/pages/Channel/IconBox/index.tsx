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
import { mlString } from 'src/common/utils/switchLanguages'

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
    ? mlString({
        ja: `わたしが「${name}」をチャンネル登録したのは${dateToString(
          subscribeDate
        )}、これまで再生した回数は${playCount}回でした。`,
        en: `I subscribed to "${name}" on ${dateToString(
          subscribeDate
        )} and have watched the videos ${playCount} times.`,
      })
    : mlString({
        ja: `わたしが「${name}」をチャンネル登録したのは${dateToString(
          subscribeDate
        )}でした。`,
        en: `I subscribed to "${name}" on ${dateToString(subscribeDate)}.`,
      })
  tweetText += `\n${mlString({
    ja: '#わたしの推し履歴 #Chronotube',
    en: '#MyFavoriteHistory #Chronotube',
  })}`

  let shareUrl = 'https://chronotube.diawel.me/'
  if (historyCount) {
    tweetText += `\n\n${mlString({
      ja: '▼詳しい結果を見る',
      en: '▼See more details',
    })}`
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
          <Snippet
            text={mlString({
              ja: `${dateToString(subscribeDate)}に登録`,
              en: `Subscribed on ${dateToString(subscribeDate)}`,
            })}
          />
          {historyCount ? (
            <Snippet
              text={mlString({
                ja: `${playCount}回再生`,
                en: `${playCount} views`,
              })}
            />
          ) : (
            <></>
          )}
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
          <SmallButton
            text={mlString({
              ja: '#結果をツイートする',
              en: 'Tweet this result',
            })}
          />
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
