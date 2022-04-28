import {
  Dimensions,
  WaveformLayer,
  WaveformLayerConfig,
  defaultPosition,
  defaultTimeline,
  defaultTrim,
  defaultWaveformOptions,
} from 'constant'
import { makeDefaultSize } from 'utils/defaults/size'
import { deepMerge } from 'utils/objects'

export const makeDefaultWaveformLayerConfig = (dimensions: Dimensions): WaveformLayerConfig => {
  const defaults: WaveformLayerConfig = {}

  deepMerge(defaults, defaultPosition, makeDefaultSize(dimensions), defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultWaveformLayer = (dimensions: Dimensions): WaveformLayer => {
  const defaults: WaveformLayer = { waveform: defaultWaveformOptions }

  deepMerge(defaults, makeDefaultWaveformLayerConfig(dimensions))

  return defaults
}
