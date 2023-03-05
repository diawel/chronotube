import Dexie, { Table } from 'dexie'
import { ChannelAbstractType } from 'src/common/utils/types/youtube'

export interface History {
  header: string
  id: string
  title: string
  playbackDate: Date
  uploader: ChannelAbstractType
}

export interface Meta {
  purpose: string
  value: any
}

class WatchHistory extends Dexie {
  histories!: Table<History>
  meta!: Table<Meta>

  constructor() {
    super('WatchHistory')
    this.version(1).stores({
      histories: 'playbackDate, header, id, title, uploader.id',
      meta: 'purpose, value',
    })
  }
}

export const watchHistory = new WatchHistory()

export type storeHistoryProgressType = 'parse' | 'store' | 'finished'

type rawHistoryType = {
  header: string
  title: string
  titleUrl?: string
  subtitles?: { name: string; url?: string }[]
  time: string
  products: string[]
}

export const storeWatchHistory = async (
  rawHistory: rawHistoryType[],
  progressSetter?: (progress: storeHistoryProgressType) => void
) => {
  progressSetter && progressSetter('parse')
  const parsedHistory = rawHistory
    .filter(
      (history) =>
        history.titleUrl &&
        history.subtitles &&
        history.subtitles[0].url &&
        history.subtitles[0].name
    )
    .map((history) => {
      const filteredHistory = history as rawHistoryType & {
        titleUrl: string
        subtitles: [{ url: string; name: string }]
      }
      const parsedTitleUrl = filteredHistory.titleUrl.match(/v=([\w-]+)/) || []
      const parsedTitle =
        filteredHistory.title.match(/(.*)\sを視聴しました/) || []
      const parsedSubtitleUrl =
        filteredHistory.subtitles[0].url?.match(/\/channel\/([\w-]+)/) || []

      return {
        playbackDate: new Date(filteredHistory.time),
        header: filteredHistory.header,
        id: parsedTitleUrl[1],
        title: parsedTitle[1],
        uploader: {
          id: parsedSubtitleUrl[1],
          name: filteredHistory.subtitles[0].name,
        },
      }
    })

  progressSetter && progressSetter('store')
  await watchHistory.histories.bulkPut(parsedHistory)

  progressSetter && progressSetter('finished')
}
