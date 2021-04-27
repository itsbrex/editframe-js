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

export type LayerShape = {
  x?: number 
  y?: number | string
  width?: number
  height?: number
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

export type WaveformLayer = LayerColors & LayerShape & {
  style? : string
}

export type ComposableLayer = AudioLayer | ImageLayer | TextLayer | VideoLayer | WaveformLayer & {
  type: string
}

export type Layer = ComposableLayer & {
  id: string
}
/* eslint-enable camelcase */
