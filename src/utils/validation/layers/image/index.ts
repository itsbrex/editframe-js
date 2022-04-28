import { ImageLayer } from 'constant'
import { validateLayer } from 'utils/validation'
import {
  validateBackground,
  validatePosition,
  validateSize,
  validateTimeline,
  validateTrim,
} from 'utils/validation/layerConfigs'

export const validateImageLayer = (callerName: string, layer: ImageLayer): void =>
  validateLayer<ImageLayer>(
    [validateBackground, validatePosition, validateSize, validateTimeline, validateTrim],
    callerName,
    layer
  )
