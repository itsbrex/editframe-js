import { Filter } from 'constant/video/filters'

export enum LayerAttribute {
  backgroundColor = 'backgroundColor',
  color = 'color',
  end = 'end',
  filter = 'filter',
  fontFamily = 'fontFamily',
  fontSize = 'fontSize',
  format = 'format',
  height = 'height',
  horizontalAlignment = 'horizontalAlignment',
  length = 'length',
  maxFontSize = 'maxFontSize',
  maxHeight = 'maxHeight',
  maxWidth = 'maxWidth',
  start = 'start',
  style = 'style',
  text = 'text',
  textAlignment = 'textAlignment',
  trim = 'trim',
  type = 'type',
  verticalAlignment = 'verticalAlignment',
  volume = 'volume',
  width = 'width',
  x = 'x',
  y = 'y',
}
export type Size = {
  [LayerAttribute.height]?: number
  [LayerAttribute.width]?: number
}
export enum LayerType {
  audio = 'audio',
  filter = 'filter',
  image = 'image',
  text = 'text',
  video = 'video',
  waveform = 'waveform',
}

export enum LayerHorizontalAlignmentValue {
  center = 'center',
  left = 'left',
  right = 'right',
}
export type LayerHorizontalAlignment =
  | LayerHorizontalAlignmentValue.left
  | LayerHorizontalAlignmentValue.center
  | LayerHorizontalAlignmentValue.right

export enum LayerVerticalAlignmentValue {
  bottom = 'bottom',
  middle = 'middle',
  top = 'top',
}
export type LayerVerticalAlignment =
  | LayerVerticalAlignmentValue.bottom
  | LayerVerticalAlignmentValue.middle
  | LayerVerticalAlignmentValue.top

export enum LayerFormatValue {
  fill = 'fill',
  fit = 'fit',
  stretch = 'stretch',
}
export type LayerFormat = LayerFormatValue.fill | LayerFormatValue.fit | LayerFormatValue.stretch

export enum WaveformLayerStyleValue {
  line = 'line',
  wave = 'wave',
}
export type WaveformLayerStyle = WaveformLayerStyleValue.wave | WaveformLayerStyleValue.line

export type LayerBase = {
  [LayerAttribute.start]?: number
  [LayerAttribute.length]?: number
}

export type Trim = {
  [LayerAttribute.end]?: number
  [LayerAttribute.start]: number
}

export type LayerTrim = {
  [LayerAttribute.trim]?: Trim
}

export type LayerAlignment = {
  [LayerAttribute.horizontalAlignment]?: LayerHorizontalAlignment
  [LayerAttribute.verticalAlignment]?: LayerVerticalAlignment
}

export type LayerVisualMedia = Size & {
  [LayerAttribute.backgroundColor]?: string
  [LayerAttribute.color]?: string
  [LayerAttribute.format]?: LayerFormat
  [LayerAttribute.x]?: number
  [LayerAttribute.y]?: number
}

export type LayerText = {
  [LayerAttribute.fontFamily]?: string
  [LayerAttribute.fontSize]?: number
  [LayerAttribute.maxFontSize]?: number
  [LayerAttribute.maxHeight]?: number
  [LayerAttribute.maxWidth]?: number
  [LayerAttribute.text]: string
  [LayerAttribute.textAlignment]?: LayerHorizontalAlignment
}

export type LayerAudio = {
  [LayerAttribute.volume]?: number
}

export type LayerFilter = {
  [LayerAttribute.filter]: Filter
}

export enum WaveformStyle {
  bars = 'bars',
  line = 'line',
}
export type LayerWaveform = {
  [LayerAttribute.style]?: WaveformStyle
}

export type AudioLayer = LayerBase & LayerTrim & LayerAudio
export type ImageLayer = LayerBase & LayerVisualMedia
export type TextLayer = LayerBase & LayerAlignment & LayerText & LayerVisualMedia
export type VideoLayer = LayerBase & LayerTrim & AudioLayer & LayerVisualMedia
export type FilterLayer = LayerBase & LayerFilter

export type WaveformLayer = LayerBase & LayerVisualMedia & LayerWaveform

export type ComposableLayer =
  | AudioLayer
  | ImageLayer
  | TextLayer
  | VideoLayer
  | (WaveformLayer & {
      [LayerAttribute.type]: string
    })
  | FilterLayer

export type TypedLayer = ComposableLayer & {
  type: LayerType
}

export type IdentifiedLayer = TypedLayer & {
  id: string
}
