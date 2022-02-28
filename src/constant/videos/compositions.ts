import { Blob } from 'node:buffer'

import { Filter } from 'constant/videos/filters'
import { Layer, LayerAttribute, Size } from 'constant/videos/layers'

export type LayerAttributeValue = number | string | Filter

export interface CompositionInterface {
  layer: (id: string) => Layer
  layers: Layer[]
  updateLayerAttribute: (id: string, layerAttribute: LayerAttribute, value: LayerAttributeValue) => void
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
  layers: Layer[]
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
