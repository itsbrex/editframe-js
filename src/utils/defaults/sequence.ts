import { SequenceLayer, SequenceLayerConfig, defaultTimeline } from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultSequenceLayerConfig = (): SequenceLayerConfig => {
  const defaults: SequenceLayerConfig = {}

  deepMerge(defaults, defaultTimeline)

  return defaults
}

export const makeDefaultSequenceLayer = (): SequenceLayer => {
  const defaults: SequenceLayer = {}

  deepMerge(defaults, makeDefaultSequenceLayerConfig())

  return defaults
}
