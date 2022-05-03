import { Hashided } from 'constant/common'

export enum ApiVideoKey {
  downloadUrl = 'downloadUrl',
  duration = 'duration',
  id = 'id',
  isFailed = 'isFailed',
  isReady = 'isReady',
  metadata = 'metadata',
  streamUrl = 'streamUrl',
  thumbnailUrl = 'thumbnailUrl',
  timestamp = 'timestamp',
}

export type ApiVideo = Hashided & {
  [ApiVideoKey.downloadUrl]?: string
  [ApiVideoKey.duration]?: number
  [ApiVideoKey.isFailed]: boolean
  [ApiVideoKey.isReady]: boolean
  [ApiVideoKey.metadata]: Record<string, any>
  [ApiVideoKey.streamUrl]?: string
  [ApiVideoKey.thumbnailUrl]?: string
  [ApiVideoKey.timestamp]: number
}

export enum ApiVideoMethod {
  all = 'all',
  get = 'get',
  getMetadata = '_getMetadata',
  new = 'new',
}
