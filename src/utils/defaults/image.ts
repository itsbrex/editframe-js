import {
  DefaultPosition,
  DefaultSize,
  DefaultTimeline,
  DefaultTransitions,
  DefaultTrim,
  ImageLayer,
  ImageLayerConfig,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultImageLayerConfig = (): ImageLayerConfig => {
  const defaults: ImageLayerConfig = {}

  deepMerge(defaults, DefaultPosition, DefaultSize, DefaultTimeline, DefaultTransitions, DefaultTrim)

  return defaults
}

export const makeDefaultImageLayer = (): ImageLayer => {
  const defaults: ImageLayer = {}

  deepMerge(defaults, makeDefaultImageLayerConfig())

  return defaults
}
