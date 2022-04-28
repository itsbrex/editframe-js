import { VideoLayer } from 'constant'
import { validateLayer } from 'utils/validation'
import {
  validateAudio,
  validateBackground,
  validatePosition,
  validateSize,
  validateTimeline,
  validateTrim,
} from 'utils/validation/layerConfigs'

export const validateVideoLayer = (callerName: string, layer: VideoLayer): void =>
  validateLayer<VideoLayer>(
    [validateBackground, validatePosition, validateSize, validateTimeline, validateTrim, validateAudio],
    callerName,
    layer
  )
