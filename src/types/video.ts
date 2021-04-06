/* eslint-disable camelcase */
import { Hashided, Timestamped } from './common'

export type Video = Hashided & Timestamped & {
  title: string
}

export type VideoResolution = {
  width: number
  height: number
}

export type VideoOptions = {
  aspectRatio?: string
  backgroundColor: string
  description?: string
  resolution?: string | VideoResolution
  duration: number | string 
  hd?: boolean
  metadata?: object
  title?: string
}

export type LayerFormat = 'fill' | 'fit' | 'stretch'
export type WaveformLayerStyle = 'wave' | 'line'

export type BaseLayer = {
  start?: number 
  end?: number
}

export type LayerColors = {
  color?: string 
  backgroundColor?: string
}

export type LayerShape = {
  x?: number 
  y?: number | string
  width?: number
  height?: number
  format?: LayerFormat
}

export type AudioLayer = BaseLayer 
export type ImageLayer = BaseLayer & LayerShape
export type VideoLayer = BaseLayer & LayerShape

export type WaveformLayer = LayerColors & LayerShape & {
  style? : string
}

export type ComposableLayer = AudioLayer | ImageLayer | VideoLayer | WaveformLayer & {
  type: string
}

export type Layer =  ComposableLayer & {
  id: string
}
/* eslint-enable camelcase */
