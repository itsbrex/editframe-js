import { Filter } from 'constant/videos/filters'

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
  maxFontSize = 'maxFontSize',
  maxHeight = 'maxHeight',
  maxWidth = 'maxWidth',
  start = 'start',
  style = 'style',
  text = 'text',
  textAlignment = 'textAlignment',
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

export type Trim = {
  [LayerAttribute.end]?: number
  [LayerAttribute.start]?: number
}

export type LayerAlignment = {
  [LayerAttribute.horizontalAlignment]?: LayerHorizontalAlignment
  [LayerAttribute.verticalAlignment]?: LayerVerticalAlignment
}

export type LayerColors = {
  [LayerAttribute.backgroundColor]?: string
  [LayerAttribute.color]?: string
}

export type LayerShape = Size & {
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

export type AudioLayer = Trim & {
  [LayerAttribute.volume]?: number
}
export type ImageLayer = Trim & LayerShape
export type TextLayer = Trim & LayerAlignment & LayerShape & LayerText
export type VideoLayer = Trim & LayerShape & AudioLayer
export type FilterLayer = Trim & {
  [LayerAttribute.filter]: Filter
}

export type WaveformLayer = LayerColors &
  LayerShape & {
    [LayerAttribute.style]?: string
  }

export type ComposableLayer =
  | AudioLayer
  | ImageLayer
  | TextLayer
  | VideoLayer
  | (WaveformLayer & {
      [LayerAttribute.type]: string
    })
  | FilterLayer

export type Layer = ComposableLayer & {
  id: string
}
