import { CompositionOptionAttribute } from '@editframe/shared-types'
import { Readable } from 'node:stream'

import { Filter } from 'constant/video/filters'
import { HTMLOptions, IdentifiedLayer, LayerAttribute, Size, SubtitlesOptions } from 'constant/video/layers'
import { LottieAnimationData } from 'constant/video/lottie'

export { CompositionFile, CompositionOptionAttribute, IdentifiedFile } from '@editframe/shared-types'

export type LayerAttributeValue =
  | boolean
  | number
  | string
  | Filter
  | HTMLOptions
  | LottieAnimationData
  | Readable
  | SubtitlesOptions

export enum CompositionMethod {
  addAudio = 'addAudio',
  addFilter = 'addFilter',
  addHTML = 'addHTML',
  addImage = 'addImage',
  addLottie = 'addLottie',
  addSequence = 'addSequence',
  addSubtitles = 'addSubtitles',
  addText = 'addText',
  addVideo = 'addVideo',
  addWaveform = 'addWaveform',
  aspectRatio = '_aspectRatio',
  backgroundColor = 'backgroundColor',
  dimensions = 'dimensions',
  duration = 'duration',
  encode = 'encode',
  getLayerAttribute = 'getLayerAttribute',
  getMetadata = '_getMetadata',
  layer = 'layer',
  layers = 'layers',
  metadata = 'metadata',
  preview = 'preview',
  setLayer = 'setLayer',
  updateFile = 'updateFile',
  updateLayerAttribute = 'updateLayerAttribute',
}

export interface CompositionInterface {
  [CompositionMethod.layer]: (id: string) => IdentifiedLayer
  [CompositionMethod.layers]: IdentifiedLayer[]
  [CompositionMethod.getLayerAttribute]: <LayerAttributeValue>(
    id: string,
    layerAttribute: LayerAttribute
  ) => LayerAttributeValue
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
