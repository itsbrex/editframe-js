import { Filter } from 'constant/video/filters'
import { LottieAnimationData } from 'constant/video/lottie'

export enum LayerAttribute {
  backgroundColor = 'backgroundColor',
  color = 'color',
  data = 'data',
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
  lottie = 'lottie',
  text = 'text',
  video = 'video',
  waveform = 'waveform',
}

const center = 'center'
const left = 'left'
const right = 'right'

export const LayerHorizontalAlignmentValue: Record<string, LayerHorizontalAlignment> = {
  center,
  left,
  right,
}
export type LayerHorizontalAlignment = typeof center | typeof left | typeof right

const bottom = 'bottom'
const middle = 'middle'
const top = 'top'

export const LayerVerticalAlignmentValue: Record<string, LayerVerticalAlignment> = {
  bottom,
  middle,
  top,
}
export type LayerVerticalAlignment = typeof bottom | typeof middle | typeof top

export enum LayerFormatValue {
  fill = 'fill',
  fit = 'fit',
  stretch = 'stretch',
}
export type LayerFormat = LayerFormatValue.fill | LayerFormatValue.fit | LayerFormatValue.stretch

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

export type LayerLottie = {
  [LayerAttribute.data]?: LottieAnimationData
}

const bars = 'bars'
const line = 'line'

export const WaveformStyleValue: Record<string, WaveformStyle> = {
  bars,
  line,
}
export type WaveformStyle = typeof bars | typeof line

export type LayerWaveform = {
  [LayerAttribute.style]?: WaveformStyle
}

export type AudioLayer = LayerBase & LayerTrim & LayerAudio
export type FilterLayer = LayerBase & LayerFilter
export type ImageLayer = LayerBase & LayerVisualMedia
export type LottieLayer = LayerBase & LayerLottie
export type TextLayer = LayerBase & LayerAlignment & LayerText & LayerVisualMedia
export type VideoLayer = LayerBase & LayerTrim & AudioLayer & LayerVisualMedia

export type WaveformLayer = LayerBase & LayerVisualMedia & LayerWaveform

export type ComposableLayer =
  | AudioLayer
  | FilterLayer
  | ImageLayer
  | LottieLayer
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
