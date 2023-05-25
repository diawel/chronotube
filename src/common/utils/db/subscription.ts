import Dexie, { Table } from 'dexie'
import { ThumbnailsType } from 'src/common/utils/types/youtube'
import * as t from 'io-ts'
import { isRight } from 'fp-ts/lib/Either'
import { watchHistory } from './watchHistory'

export type ChannelType = {
  id: string
  name: string
  subscribeDate: Date
  thumbnail: ThumbnailsType
  playCount: number
}

export interface Meta {
  purpose: string
  value: any
}

class Subscription extends Dexie {
  channels!: Table<ChannelType>
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

const RawChannel = t.type({
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

type RawChannelType = t.TypeOf<typeof RawChannel>

export const validateChannels = (rawChannels: any): RawChannelType[] => {
  if (Array.isArray(rawChannels))
    return rawChannels.filter((rawChannel: any) => {
      return isRight(RawChannel.decode(rawChannel))
    })
  return []
}

export const storeChannels = async (
  channels: RawChannelType[],
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
      playCount: 0,
    }
  })
  progressSetter && progressSetter('store')
  await subscription.channels.bulkAdd(parsedSubscriptions)
  await updatePlayCount()
  await subscription.meta.put({
    purpose: 'fetched',
    value: new Date(),
  })
  progressSetter && progressSetter('finished')
}

export const updatePlayCount = async () => {
  const playCountList: { id: string; playCount: number }[] = []

  await subscription.channels
    .toCollection()
    .each(async (channel: ChannelType) => {
      playCountList.push({
        id: channel.id,
        playCount: await watchHistory.histories
          .where({ 'uploader.id': channel.id })
          .count(),
      })
    })

  const modifyChannel = async (index: number) => {
    if (!playCountList[index]) return
    await subscription.channels.update(playCountList[index].id, {
      playCount: playCountList[index].playCount,
    })
    await modifyChannel(index + 1)
  }
  await modifyChannel(0)
}
