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
      histories: 'playbackDate, header, id, title, uploader',
      meta: 'purpose, value',
    })
  }
}

export const watchHistory = new WatchHistory()

type rawHistoryType = {
  header: string
  title: string
  titleUrl?: string
  subtitles: { name: string; url?: string }[]
  time: string
  products: string[]
}

const addWatchHistory = async (
  history: rawHistoryType,
  lastHistory?: History
) => {
  if (!history.titleUrl || !history.subtitles[0].url) return
  const playbackDate = new Date(history.time)
  if (!lastHistory || playbackDate > lastHistory.playbackDate) {
    const parsedTitleUrl = history.titleUrl.match(/v=([\w-]+)/)
    const parsedTitle = history.title.match(/(.*)\sを視聴しました/)
    const parsedSubtitleUrl =
      history.subtitles[0].url.match(/\/channel\/([\w-]+)/)
    if (!parsedTitleUrl || !parsedTitle || !parsedSubtitleUrl) return
    await watchHistory.histories.add({
      playbackDate: playbackDate,
      header: history.header,
      id: parsedTitleUrl[1],
      title: parsedTitle[1],
      uploader: {
        id: parsedSubtitleUrl[1],
        name: history.subtitles[0].name,
      },
    })
  }
}

export const storeWatchHistory = async (json: Blob): Promise<void> => {
  const parsed: rawHistoryType[] = JSON.parse(await json.text())
  await watchHistory.histories.toCollection().last(async (lastHistory) => {
    await parsed.forEach(async (history) => {
      await addWatchHistory(history, lastHistory)
    })
  })
}
