import { VideoLayer, VideoLayerConfig } from 'constant'
import {
  defaultAudioOptions,
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTransitionsOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'

export const mockVideoLayerConfig = (
  {
    audio = defaultAudioOptions,
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    transitions = defaultTransitionsOptions,
    trim = defaultTrimOptions,
  }: VideoLayerConfig = {
    audio: defaultAudioOptions,
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    transitions: defaultTransitionsOptions,
    trim: defaultTrimOptions,
  }
): VideoLayerConfig => ({
  audio,
  position,
  size,
  timeline,
  transitions,
  trim,
})

export const mockVideoLayer = (): VideoLayer => mockVideoLayerConfig()
