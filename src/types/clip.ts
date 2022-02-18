import { Resolution, Timing } from './common'
import { VideoLayer } from './video'

/* eslint-disable camelcase */
export type ClipRequestOptions = {
  metadata?: object
  share?: boolean
  title?: string
}

export type ClipObject = {
  id: string
  filters: any[]
  resolution?: Resolution
  trim?: Timing
  volume?: number
}

export type ClipEncodeConfig = ClipRequestOptions & {
  clip: ClipObject
  layers: Array<VideoLayer>
}
/* eslint-enable camelcase */
