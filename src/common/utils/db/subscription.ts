import Dexie, { Table } from 'dexie'
import { ThumbnailsType } from 'src/common/utils/types/youtube'
import * as t from 'io-ts'
import { isRight } from 'fp-ts/lib/Either'

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

const Thumbnail = t.type({
  url: t.string,
})

const Channel = t.type({
  snippet: t.type({
    publishedAt: t.string,
    resourceId: t.type({ channelId: t.string }),
    thumbnails: t.type({
      default: Thumbnail,
      high: Thumbnail,
      medium: Thumbnail,
    }),
    title: t.string,
  }),
})

type ChannelType = t.TypeOf<typeof Channel>

export const validateChannels = (rawChannels: any): ChannelType[] => {
  if (Array.isArray(rawChannels))
    return rawChannels.filter((rawChannel: any) => {
      return isRight(Channel.decode(rawChannel))
    })
  return []
}

export const storeChannels = async (
  channels: ChannelType[],
  progressSetter?: (progress: StoreSubscriptionProgressType) => void
) => {
  progressSetter && progressSetter('init')
  await subscription.channels.clear()
  progressSetter && progressSetter('parse')
  const parsedSubscriptions = channels.map((channel) => {
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
