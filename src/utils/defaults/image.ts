import {
  ImageLayer,
  ImageLayerConfig,
  defaultBackground,
  defaultPosition,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultImageLayerConfig = (): ImageLayerConfig => {
  const defaults: ImageLayerConfig = {}

  deepMerge(
    defaults,
    defaultBackground,
    defaultPosition,
    { size: { height: null, width: null } },
    defaultTimeline,
    defaultTrim
  )

  return defaults
}

export const makeDefaultImageLayer = (): ImageLayer => {
  const defaults: ImageLayer = {}

  deepMerge(defaults, makeDefaultImageLayerConfig())

  return defaults
}
