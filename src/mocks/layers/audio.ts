import { AudioLayer, AudioLayerConfig } from 'constant'
import {
  defaultTimelineOptions,
  defaultTransitionsOptions,
  defaultTrimOptions,
  mockAudioOptions,
} from 'mocks/layerConfigs'
import { deepMerge } from 'utils/objects'

export const mockAudioLayerConfig = (
  {
    timeline = defaultTimelineOptions,
    transitions = defaultTransitionsOptions,
    trim = defaultTrimOptions,
  }: AudioLayerConfig = {
    timeline: defaultTimelineOptions,
    transitions: defaultTransitionsOptions,
    trim: defaultTrimOptions,
  }
): AudioLayerConfig => ({
  timeline,
  transitions,
  trim,
})

export const mockAudioLayer = (): AudioLayer => deepMerge({ audio: mockAudioOptions() }, mockAudioLayerConfig())
