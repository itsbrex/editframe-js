import {
  DefaultPosition,
  DefaultTimeline,
  DefaultTransitions,
  DefaultTrim,
  DefaultWaveformOptions,
  Dimensions,
  WaveformLayer,
  WaveformLayerConfig,
} from 'constant'
import { makeDefaultSize } from 'utils/defaults/size'
import { deepMerge } from 'utils/objects'

export const makeDefaultWaveformLayerConfig = (dimensions: Dimensions): WaveformLayerConfig => {
  const defaults: WaveformLayerConfig = {}

  deepMerge(defaults, DefaultPosition, makeDefaultSize(dimensions), DefaultTimeline, DefaultTransitions, DefaultTrim)

  return defaults
}

export const makeDefaultWaveformLayer = (dimensions: Dimensions): WaveformLayer => {
  const defaults: WaveformLayer = { waveform: DefaultWaveformOptions }

  deepMerge(defaults, makeDefaultWaveformLayerConfig(dimensions))

  return defaults
}
