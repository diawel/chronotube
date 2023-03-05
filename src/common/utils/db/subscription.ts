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
      channels: 'id, name, subscribeDate, playCount',
      meta: 'purpose, value',
    })
  }
}

export const subscription = new Subscription()

export type StoreSubscriptionProgressType =
  | 'init'
  | 'parse'
  | 'store'
  | 'finished'

type RawSubscriptionType = {
  etag: string
  id: string
  kind: string
  snippet: {
    channelId: string
    description: string
    publishedAt: string
    resourceId: {
      channelId: string
      kind: string
    }
    thumbnails: ThumbnailsType
    title: string
  }
}

export const storeSubscription = async (
  RawSubscriptions: RawSubscriptionType[],
  progressSetter?: (progress: StoreSubscriptionProgressType) => void
) => {
  progressSetter && progressSetter('init')
  await subscription.channels.clear()
  progressSetter && progressSetter('parse')
  const parsedSubscriptions = RawSubscriptions.map((channel) => {
    return {
      id: channel.snippet.resourceId.channelId,
      name: channel.snippet.title,
      subscribeDate: new Date(channel.snippet.publishedAt),
      thumbnail: channel.snippet.thumbnails,
    }
  })
  progressSetter && progressSetter('store')
  await subscription.channels.bulkAdd(parsedSubscriptions)
  await subscription.meta.put({
    purpose: 'fetched',
    value: new Date(),
  })
  progressSetter && progressSetter('finished')
}
