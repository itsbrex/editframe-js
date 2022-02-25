import { Hashided, Size, Timestamped } from 'constant/common'
import { VideoLayer } from 'constant/layers'

export enum VideoAttribute {
  downloadUrl = 'downloadUrl',
  duration = 'duration',
  isReady = 'isReady',
  metadata = 'metadata',
  streamUrl = 'streamUrl',
  thumbnailUrl = 'thumbnailUrl',
  timestamp = 'timestamp',
}

export type Video = Hashided &
  Timestamped & {
    [VideoAttribute.downloadUrl]?: string
    [VideoAttribute.duration]?: number
    [VideoAttribute.isReady]: boolean
    [VideoAttribute.metadata]: Record<string, unknown>
    [VideoAttribute.streamUrl]?: string
    [VideoAttribute.thumbnailUrl]?: string
    [VideoAttribute.timestamp]: number
  }

export type VideoOptions = {
  aspectRatio?: Size
  backgroundColor?: string
  dimensions?: Size
  duration: number
  isHD?: boolean
  metadata?: Record<string, unknown>
}

export type EncodeConfig = VideoOptions & {
  dimensions: { height: number; width: number }
  layers: VideoLayer[]
}

export enum EncodeResponseAttribute {
  id = 'id',
  status = 'status',
  timestamp = 'timestamp',
}

export type EncodeResponse = {
  [EncodeResponseAttribute.id]: string
  [EncodeResponseAttribute.status]: string
  [EncodeResponseAttribute.timestamp]: number
}
