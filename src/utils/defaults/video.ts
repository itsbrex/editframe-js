import {
  VideoLayer,
  VideoLayerConfig,
  defaultAudio,
  defaultPosition,
  defaultSize,
  defaultTimeline,
  defaultTransitions,
  defaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultVideoLayerConfig = (): VideoLayerConfig => {
  const defaults = {}

  deepMerge(defaults, defaultAudio, defaultPosition, defaultSize, defaultTimeline, defaultTransitions, defaultTrim)

  return defaults
}

export const makeDefaultVideoLayer = (): VideoLayer => {
  const defaults: VideoLayer = {}

  deepMerge(defaults, makeDefaultVideoLayerConfig())

  return defaults
}
