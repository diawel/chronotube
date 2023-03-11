import { useLiveQuery } from 'dexie-react-hooks'
import { useParams } from 'react-router-dom'
import { subscription } from 'src/common/utils/db/subscription'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import { ChannelAbstractType } from 'src/common/utils/types/youtube'

type VideoType = {
  header: string
  id: string
  title: string
  uploader: ChannelAbstractType
}

const Channel: React.FC = () => {
  const { id } = useParams()
  if (!id) return <></>
  const liveQuery = useLiveQuery(async () => {
    const channel = await subscription.channels.get(id)
    const firstPlayback = await watchHistory.histories
      .where({ 'uploader.id': id })
      .first()
    const channelHistories = await watchHistory.histories
      .where({ 'uploader.id': id })
      .toArray()
    const channelVideos: {
      [key: string]: VideoType & { playCount: number }
    } = {}
    channelHistories.forEach((history) => {
      if (!channelVideos[history.id])
        channelVideos[history.id] = { ...history, playCount: 0 }
      channelVideos[history.id].playCount++
    })

    return {
      historyCount: await watchHistory.histories.count(), // 再生履歴の有効性確認用
      channel: channel,
      firstPlayback: firstPlayback,
      decisivePlayback: await watchHistory.histories
        .where('playbackDate')
        .below(channel?.subscribeDate)
        .and((history) => {
          return history.uploader.id == id
        })
        .last(),
      mostPlayedVideo: Object.values(channelVideos).reduce((a, b) =>
        a.playCount > b.playCount ? a : b
      ),
      triggerPlayback: await watchHistory.histories
        .where('playbackDate')
        .below(firstPlayback?.playbackDate)
        .last(),
      channelHistories: channelHistories,
    }
  })
  console.log(liveQuery)

  return <></>
}

export default Channel
