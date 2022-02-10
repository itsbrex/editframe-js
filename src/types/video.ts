/* eslint-disable camelcase */
import { Hashided, Size, Timestamped } from './common'

export type Video = Hashided &
  Timestamped & {
    duration?: number
    download_url?: string
    is_ready: boolean
    metadata: object
    stream_url?: string
    thumbnail_url?: string
    timestamp: number
  }

export type VideoOptions = {
  aspectRatio?: string
  backgroundColor?: string
  resolution?: string | Size
  duration: number | string
  hd?: boolean
  metadata?: object
}

export type LayerHorizontalAlignment = 'left' | 'center' | 'right'
export type LayerVerticalAlignment = 'top' | 'middle' | 'bottom'
export type LayerFormat = 'fill' | 'fit' | 'stretch'
export type WaveformLayerStyle = 'wave' | 'line'

export type BaseLayer = {
  start?: number
  end?: number
}

export type LayerAlignment = {
  horizontalAlignment?: LayerHorizontalAlignment
  verticalAlignment?: LayerVerticalAlignment
}

export type LayerColors = {
  color?: string
  backgroundColor?: string
}

export type LayerShape = Size & {
  x?: number
  y?: number | string
  format?: LayerFormat
}

export type LayerText = {
  fontFamily?: string
  fontSize?: number
  maxFontSize?: number
  maxHeight?: number
  maxWidth?: number
  text: string
  textAlignment?: LayerHorizontalAlignment
}

export type AudioLayer = BaseLayer
export type ImageLayer = BaseLayer & LayerShape
export type TextLayer = BaseLayer & LayerAlignment & LayerShape & LayerText
export type VideoLayer = BaseLayer & LayerShape

export type WaveformLayer = LayerColors &
  LayerShape & {
    style?: string
  }

export type ComposableLayer =
  | AudioLayer
  | ImageLayer
  | TextLayer
  | VideoLayer
  | (WaveformLayer & {
      type: string
    })

export type Layer = ComposableLayer & {
  id: string
}
/* eslint-enable camelcase */
