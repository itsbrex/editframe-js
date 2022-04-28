import {
  Dimensions,
  VideoLayer,
  VideoLayerConfig,
  defaultAudio,
  defaultBackground,
  defaultPosition,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { makeDefaultSize } from 'utils/defaults/size'
import { deepMerge } from 'utils/objects'

export const makeDefaultVideoLayerConfig = (dimensions: Dimensions): VideoLayerConfig => {
  const defaults = {}

  deepMerge(
    defaults,
    defaultAudio,
    defaultBackground,
    defaultPosition,
    makeDefaultSize(dimensions),
    defaultTimeline,
    defaultTrim
  )

  return defaults
}

export const makeDefaultVideoLayer = (dimensions: Dimensions): VideoLayer => {
  const defaults: VideoLayer = {}

  deepMerge(defaults, makeDefaultVideoLayerConfig(dimensions))

  return defaults
}
