import { Blob } from 'node:buffer'

import { Filter } from 'constant/video/filters'
import { IdentifiedLayer, LayerAttribute, Size } from 'constant/video/layers'

export type LayerAttributeValue = number | string | Filter

export enum CompositionMethod {
  addAudio = 'addAudio',
  addFilter = 'addFilter',
  addImage = 'addImage',
  addText = 'addText',
  addVideo = 'addVideo',
  addWaveform = 'addWaveform',
  encode = 'encode',
  layer = 'layer',
  layers = 'layers',
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

export type CompositionFile = Blob | string

export type CompositionOptions = {
  backgroundColor?: string
  dimensions: Size
  duration: number
  metadata?: Record<string, unknown>
  videoFile?: CompositionFile
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
