import { CompositionFile, CompositionOptionAttribute, IdentifiedFile } from '@editframe/shared-types'

import { Filter } from 'constant/video/filters'
import { HTMLOptions, IdentifiedLayer, LayerAttribute, Size, SubtitlesOptions } from 'constant/video/layers'
import { LottieAnimationData } from 'constant/video/lottie'

export type { CompositionFile as CompositionFile }
export type { IdentifiedFile as IdentifiedFile }
export { CompositionOptionAttribute as CompositionOptionAttribute }

export type LayerAttributeValue = number | string | Filter | LottieAnimationData | HTMLOptions | SubtitlesOptions

export enum CompositionMethod {
  addAudio = 'addAudio',
  addFilter = 'addFilter',
  addHTML = 'addHTML',
  addImage = 'addImage',
  addLottie = 'addLottie',
  addSubtitles = 'addSubtitles',
  addText = 'addText',
  addVideo = 'addVideo',
  addWaveform = 'addWaveform',
  backgroundColor = 'backgroundColor',
  dimensions = 'dimensions',
  duration = 'duration',
  encode = 'encode',
  layer = 'layer',
  layers = 'layers',
  metadata = 'metadata',
  preview = 'preview',
  setLayer = 'setLayer',
  updateLayerAttribute = 'updateLayerAttribute',
}

export interface CompositionInterface {
  [CompositionMethod.layer]: (id: string) => IdentifiedLayer
  [CompositionMethod.layers]: IdentifiedLayer[]
  [CompositionMethod.updateLayerAttribute]: (
    id: string,
    layerAttribute: LayerAttribute,
    value: LayerAttributeValue
  ) => void
}

export type Metadata = Record<string, string>

export type VideoOptions = {
  [CompositionOptionAttribute.backgroundColor]?: string
  [CompositionOptionAttribute.dimensions]?: Size
  [CompositionOptionAttribute.duration]?: number
  [CompositionOptionAttribute.metadata]?: Metadata
}

export type CompositionOptions = {
  [CompositionOptionAttribute.backgroundColor]?: string
  [CompositionOptionAttribute.dimensions]: Size
  [CompositionOptionAttribute.duration]: number
  [CompositionOptionAttribute.metadata]?: Metadata
}

export type EncodeConfig = CompositionOptions & {
  dimensions: { height: number; width: number }
  layers: IdentifiedLayer[]
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
