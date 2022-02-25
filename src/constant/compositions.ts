import { Filter } from 'constant/filters'
import { Layer, LayerAttribute, Size } from 'constant/layers'

export type LayerAttributeValue = number | string | Filter

export interface CompositionInterface {
  layer: (id: string) => Layer
  layers: Layer[]
  updateLayerAttribute: (id: string, layerAttribute: LayerAttribute, value: LayerAttributeValue) => void
}

export type CompositionOptions = {
  aspectRatio?: Size
  backgroundColor?: string
  dimensions?: Size
  duration: number
  isHD?: boolean
  metadata?: Record<string, unknown>
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
