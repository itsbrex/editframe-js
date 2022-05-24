import {
  AudioLayer,
  AudioLayerConfig,
  defaultAudioOptions,
  defaultTimeline,
  defaultTransitions,
  defaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultAudioLayerConfig = (): AudioLayerConfig => {
  const defaults = {}

  deepMerge(defaults, defaultTimeline, defaultTransitions, defaultTrim)

  return defaults
}

export const makeDefaultAudioLayer = (): AudioLayer => {
  const defaults = { audio: defaultAudioOptions }

  deepMerge(defaults, makeDefaultAudioLayerConfig())

  return defaults
}
