import Dexie, { Table } from 'dexie'
import { ChannelAbstractType } from 'src/common/utils/types/youtube'

export interface History {
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
  channels!: Table<History>
  meta!: Table<Meta>

  constructor() {
    super('Subscription')
    this.version(1).stores({
      channels: 'id, title, playbackDate, uploader',
      meta: 'purpose, value',
    })
  }
}

export const watchHistory = new WatchHistory()
