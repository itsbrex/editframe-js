import {
  VideoLayer,
  VideoLayerConfig,
  defaultAudio,
  defaultBackground,
  defaultPosition,
  defaultSize,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultVideoLayerConfig = (): VideoLayerConfig => {
  const defaults = {}

  deepMerge(defaults, defaultAudio, defaultBackground, defaultPosition, defaultSize, defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultVideoLayer = (): VideoLayer => {
  const defaults: VideoLayer = {}

  deepMerge(defaults, makeDefaultVideoLayerConfig())

  return defaults
}
