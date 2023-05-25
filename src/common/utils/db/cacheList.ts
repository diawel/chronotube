import Dexie, { Table } from 'dexie'
import {
  StoreSubscriptionProgressType,
  storeChannels,
  validateChannels,
} from './subscription'

export type FileType = {
  purpose: string
  blob: Blob
}

class CacheList extends Dexie {
  files!: Table<FileType>

  constructor() {
    super('CacheList')
    this.version(1).stores({ files: 'purpose' })
  }
}

export const checkCachedSubscription = async (
  progressSetter?: (progress: StoreSubscriptionProgressType) => void
) => {
  const file = await cacheList.files.get('subscription')
  if (file) {
    let parsed
    try {
      parsed = JSON.parse(await file.blob.text())
    } catch {}
    await storeChannels(validateChannels(parsed), progressSetter)

    cacheList.files.delete('subscription')
  }
}

export const cacheList = new CacheList()
