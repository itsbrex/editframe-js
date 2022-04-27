import { AudioLayer } from 'constant'
import { validateLayer } from 'utils/validation'
import { validateAudio, validateTimeline, validateTrim } from 'utils/validation/layerConfigs'

export const validateAudioLayer = (callerName: string, layer: AudioLayer): void =>
  validateLayer<AudioLayer>([validateAudio, validateTimeline, validateTrim], callerName, layer)
