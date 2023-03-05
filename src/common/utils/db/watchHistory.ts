import Dexie, { Table } from 'dexie'
import { ChannelAbstractType } from 'src/common/utils/types/youtube'
import * as t from 'io-ts'
import { isRight } from 'fp-ts/lib/Either'

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

export type StoreWatchHistoryProgressType = 'parse' | 'store' | 'finished'

const History = t.type({
  header: t.string,
  title: t.string,
  titleUrl: t.string,
  subtitles: t.array(
    t.type({
      name: t.string,
      url: t.string,
    })
  ),
  time: t.string,
})

type HistoryType = t.TypeOf<typeof History>

export const validateHistoryies = (rawHistories: any): HistoryType[] => {
  if (Array.isArray(rawHistories)) {
    return rawHistories.filter((rawHistory: any) => {
      return isRight(History.decode(rawHistory))
    })
  }
  return []
}

export const storeWatchHistories = async (
  histories: HistoryType[],
  progressSetter?: (progress: StoreWatchHistoryProgressType) => void
) => {
  progressSetter && progressSetter('parse')
  const parsedHistories = histories.map((history) => {
    const parsedTitleUrl = history.titleUrl.match(/v=([\w-]+)/) || []
    const parsedTitle = history.title.match(/(.*)\sを視聴しました/) || []
    const parsedSubtitleUrl =
      history.subtitles[0].url?.match(/\/channel\/([\w-]+)/) || []

    return {
      playbackDate: new Date(history.time),
      header: history.header,
      id: parsedTitleUrl[1],
      title: parsedTitle[1],
      uploader: {
        id: parsedSubtitleUrl[1],
        name: history.subtitles[0].name,
      },
    }
  })
  progressSetter && progressSetter('store')
  await watchHistory.histories.bulkPut(parsedHistories)
  progressSetter && progressSetter('finished')
}
