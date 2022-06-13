import {
  DefaultPosition,
  DefaultSize,
  DefaultTextOptions,
  DefaultTimeline,
  DefaultTransitions,
  DefaultTrim,
  TextLayer,
  TextLayerConfig,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultTextLayerConfig = (): TextLayerConfig => {
  const defaults = {}

  deepMerge(defaults, DefaultPosition, DefaultSize, DefaultTimeline, DefaultTransitions, DefaultTrim)

  return defaults
}

export const makeDefaultTextLayer = (): TextLayer => {
  const defaults: TextLayer = { text: DefaultTextOptions }

  deepMerge(defaults, makeDefaultTextLayerConfig())

  return defaults
}
