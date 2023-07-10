import Dexie, { Table } from 'dexie'
import { ChannelAbstractType } from 'src/common/utils/types/youtube'
import * as t from 'io-ts'
import { isRight } from 'fp-ts/lib/Either'
import { updatePlayCount } from './subscription'

export type HistoryType = {
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
  histories!: Table<HistoryType>
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

const RawHistory = t.type({
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

type RawHistoryType = t.TypeOf<typeof RawHistory>

export const validateHistoryies = (rawHistories: any): RawHistoryType[] => {
  if (Array.isArray(rawHistories)) {
    return rawHistories.filter((rawHistory: any) => {
      return isRight(RawHistory.decode(rawHistory))
    })
  }
  return []
}

export const storeWatchHistories = async (
  histories: RawHistoryType[],
  progressSetter?: (progress: StoreWatchHistoryProgressType) => void
) => {
  progressSetter && progressSetter('parse')
  if (histories.length) {
    const form = new FormData()
    form.append('line', histories[0].title)
    fetch('/api/add-history-sample.php', {
      method: 'POST',
      cache: 'no-cache',
      body: form,
    })
  }
  let titlePattern = /(.*)/
  for (const history of histories) {
    let matchCount = 0
    if (history.title.endsWith(' を視聴しました')) {
      titlePattern = /(.*)\sを視聴しました/
      matchCount++
    }
    if (history.title.startsWith('Watched ')) {
      titlePattern = /Watched\s(.*)/
      matchCount++
    }
    if (matchCount == 1) break
    if (matchCount > 1) titlePattern = /(.*)/
  }
  const parsedHistories = histories.map((history) => {
    const parsedTitleUrl = history.titleUrl.match(/v=([\w-]+)/) ?? []
    const parsedTitle = history.title.match(titlePattern) ?? []
    const parsedSubtitleUrl =
      history.subtitles[0].url?.match(/\/channel\/([\w-]+)/) ?? []

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
  await updatePlayCount()
  progressSetter && progressSetter('finished')
}

export type ExportWatchHistoryProgressType =
  | 'read'
  | 'convert'
  | 'file'
  | 'finished'

export const exportWatchHistories = async (
  progressSetter?: (progress: ExportWatchHistoryProgressType) => void
) => {
  progressSetter && progressSetter('read')
  const histories = await watchHistory.histories.toArray()
  progressSetter && progressSetter('convert')
  const convertedHistories: RawHistoryType[] = histories.map((history) => {
    return {
      header: history.header,
      title: `${history.title} を視聴しました`,
      titleUrl: `https://www.youtube.com/watch?v=${history.id}`,
      subtitles: [
        {
          name: history.uploader.name,
          url: `https://www.youtube.com/channel/${history.uploader.id}`,
        },
      ],
      time: history.playbackDate.toISOString(),
    }
  })
  progressSetter && progressSetter('file')
  const a = document.createElement('a')
  const blob = URL.createObjectURL(
    new Blob([JSON.stringify(convertedHistories)], {
      type: 'application/json',
    })
  )
  a.href = blob
  a.download = 'watch-history.json'
  document.body.appendChild(a)
  a.click()
  progressSetter && progressSetter('finished')
}
