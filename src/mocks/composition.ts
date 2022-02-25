import { CompositionInterface } from 'constant'

export const mockComposition = ({
  layer,
  layers,
  updateLayerAttribute,
}: {
  layer: any
  layers: any
  updateLayerAttribute: any
}): CompositionInterface => ({
  layer,
  layers,
  updateLayerAttribute,
})
