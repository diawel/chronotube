import Dexie, { Table } from 'dexie'

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

export const cacheList = new CacheList()
