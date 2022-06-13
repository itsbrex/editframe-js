import {
  DefaultAudio,
  DefaultPosition,
  DefaultSize,
  DefaultTimeline,
  DefaultTransitions,
  DefaultTrim,
  VideoLayer,
  VideoLayerConfig,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultVideoLayerConfig = (): VideoLayerConfig => {
  const defaults = {}

  deepMerge(defaults, DefaultAudio, DefaultPosition, DefaultSize, DefaultTimeline, DefaultTransitions, DefaultTrim)

  return defaults
}

export const makeDefaultVideoLayer = (): VideoLayer => {
  const defaults: VideoLayer = {}

  deepMerge(defaults, makeDefaultVideoLayerConfig())

  return defaults
}
