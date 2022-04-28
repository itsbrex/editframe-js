import {
  Dimensions,
  ImageLayer,
  ImageLayerConfig,
  defaultBackground,
  defaultPosition,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { makeDefaultSize } from 'utils/defaults/size'
import { deepMerge } from 'utils/objects'

export const makeDefaultImageLayerConfig = (dimensions: Dimensions): ImageLayerConfig => {
  const defaults: ImageLayerConfig = {}

  deepMerge(defaults, defaultBackground, defaultPosition, makeDefaultSize(dimensions), defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultImageLayer = (dimensions: Dimensions): ImageLayer => {
  const defaults: ImageLayer = {}

  deepMerge(defaults, makeDefaultImageLayerConfig(dimensions))

  return defaults
}
