import { ImageLayer } from 'constant'
import { validateLayer } from 'utils/validation'
import { validatePosition, validateSize, validateTimeline, validateTrim } from 'utils/validation/layerConfigs'

export const validateImageLayer = (callerName: string, layer: ImageLayer): void =>
  validateLayer<ImageLayer>([validatePosition, validateSize, validateTimeline, validateTrim], callerName, layer)
