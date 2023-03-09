import Dexie, { Table } from 'dexie'

export interface File {
  purpose: string
  blob: Blob
}

class CacheList extends Dexie {
  files!: Table<File>

  constructor() {
    super('CacheList')
    this.version(1).stores({ files: 'purpose, blob' })
  }
}

export const cacheList = new CacheList()
