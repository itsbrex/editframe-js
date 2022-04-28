import { AudioLayer, AudioLayerConfig, defaultAudioOptions, defaultTimeline, defaultTrim } from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultAudioLayerConfig = (): AudioLayerConfig => {
  const defaults = {}

  deepMerge(defaults, defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultAudioLayer = (): AudioLayer => {
  const defaults = { audio: defaultAudioOptions }

  deepMerge(defaults, makeDefaultAudioLayerConfig())

  return defaults
}
