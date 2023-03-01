import Dexie, { Table } from 'dexie'
import { ThumbnailsType } from 'src/common/utils/types/youtube'

export interface Channel {
  id: string
  name: string
  subscribeDate: Date
  thumbnail: ThumbnailsType
  playCount?: number
}

export interface Meta {
  purpose: string
  value: any
}

class Subscription extends Dexie {
  channels!: Table<Channel>
  meta!: Table<Meta>

  constructor() {
    super('Subscription')
    this.version(1).stores({
      channels: 'id, name, subscribeDate, thumbnail, playCount',
      meta: 'purpose, value',
    })
  }
}

export const subscription = new Subscription()

export const storeSubscription = async (json: Blob): Promise<void> => {
  await subscription.channels.clear()
  const parsed = JSON.parse(await json.text())
  await parsed.forEach(async (channel: any) => {
    await subscription.channels.add({
      id: channel.snippet.resourceId.channelId,
      name: channel.snippet.title,
      subscribeDate: new Date(channel.snippet.publishedAt),
      thumbnail: channel.snippet.thumbnails,
    })
  })
  await subscription.meta.put({
    purpose: 'fetched',
    value: new Date(),
  })
}
