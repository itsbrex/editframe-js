import { Color, CompositionInterface, CompositionOptions, EncodeResponse } from 'constant'

export const mockComposition = (
  {
    duration = 10,
    getLayerAttribute = () => {},
    layer = () => {},
    layers = [],
    setLayerAttribute = () => {},
  }: {
    duration?: number
    getLayerAttribute?: any
    layer?: any
    layers?: any
    setLayerAttribute?: any
  } = {
    duration: 10,
    getLayerAttribute: () => {},
    layer: () => {},
    layers: [],
    setLayerAttribute: () => {},
  }
): CompositionInterface => ({
  duration,
  getLayerAttribute,
  layer,
  layers,
  setLayerAttribute,
})

export const mockCompositionOptions = (
  { backgroundColor, dimensions, duration, metadata }: CompositionOptions = {
    backgroundColor: Color.white,
    dimensions: { height: 100, width: 200 },
    duration: 10,
    metadata: { key: 'value' },
  }
): CompositionOptions => ({
  backgroundColor,
  dimensions,
  duration,
  metadata,
})

export const mockEncodeResponse = (
  { id, status, timestamp }: EncodeResponse = { id: 'id', status: 'status', timestamp: 1646242134 }
): EncodeResponse => ({
  id,
  status,
  timestamp,
})
