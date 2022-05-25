import { Color, WaveformLayer, WaveformLayerConfig, WaveformOptions, WaveformStyleValue } from 'constant'
import {
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTransitionsOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'
import { deepMerge } from 'utils/objects'

export const mockWaveformLayerConfig = (
  {
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    transitions = defaultTransitionsOptions,
    trim = defaultTrimOptions,
  }: WaveformLayerConfig = {
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    transitions: defaultTransitionsOptions,
    trim: defaultTrimOptions,
  }
): WaveformLayerConfig => ({
  position,
  size,
  timeline,
  transitions,
  trim,
})

const MockWaveformValue = {
  backgroundColor: Color.transparent,
  color: Color.white,
  style: WaveformStyleValue.bars,
}

export const mockWaveformOptions = ({
  backgroundColor = MockWaveformValue.backgroundColor,
  color = MockWaveformValue.color,
  style = MockWaveformValue.style,
}: WaveformOptions = MockWaveformValue): WaveformOptions => ({ backgroundColor, color, style })

export const mockWaveformLayer = (): WaveformLayer =>
  deepMerge({ waveform: mockWaveformOptions() }, mockWaveformLayerConfig())
