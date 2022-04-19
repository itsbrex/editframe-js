import { Hashided, Timestamped } from 'constant/common'

export enum ApiVideoAttribute {
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

export type ApiVideo = Hashided &
  Timestamped & {
    [ApiVideoAttribute.downloadUrl]?: string
    [ApiVideoAttribute.duration]?: number
    [ApiVideoAttribute.isFailed]: boolean
    [ApiVideoAttribute.isReady]: boolean
    [ApiVideoAttribute.metadata]: Record<string, unknown>
    [ApiVideoAttribute.streamUrl]?: string
    [ApiVideoAttribute.thumbnailUrl]?: string
    [ApiVideoAttribute.timestamp]: number
  }

export enum ApiVideoMethod {
  all = 'all',
  get = 'get',
  getMetadata = '_getMetadata',
  new = 'new',
}
