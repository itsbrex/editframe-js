import {
  AudioLayer,
  AudioLayerConfig,
  DefaultAudioOptions,
  DefaultTimeline,
  DefaultTransitions,
  DefaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultAudioLayerConfig = (): AudioLayerConfig => {
  const defaults = {}

  deepMerge(defaults, DefaultTimeline, DefaultTransitions, DefaultTrim)

  return defaults
}

export const makeDefaultAudioLayer = (): AudioLayer => {
  const defaults = { audio: DefaultAudioOptions }

  deepMerge(defaults, makeDefaultAudioLayerConfig())

  return defaults
}
