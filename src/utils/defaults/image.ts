import {
  ImageLayer,
  ImageLayerConfig,
  defaultBackground,
  defaultPosition,
  defaultSize,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultImageLayerConfig = (): ImageLayerConfig => {
  const defaults: ImageLayerConfig = {}

  deepMerge(defaults, defaultBackground, defaultPosition, defaultSize, defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultImageLayer = (): ImageLayer => {
  const defaults: ImageLayer = {}

  deepMerge(defaults, makeDefaultImageLayerConfig())

  return defaults
}
