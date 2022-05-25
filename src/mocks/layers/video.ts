import { VideoLayer, VideoLayerConfig } from 'constant'
import {
  defaultAudioOptions,
  defaultBackgroundOptions,
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTransitionsOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'

export const mockVideoLayerConfig = (
  {
    audio = defaultAudioOptions,
    background = defaultBackgroundOptions,
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    transitions = defaultTransitionsOptions,
    trim = defaultTrimOptions,
  }: VideoLayerConfig = {
    audio: defaultAudioOptions,
    background: defaultBackgroundOptions,
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    transitions: defaultTransitionsOptions,
    trim: defaultTrimOptions,
  }
): VideoLayerConfig => ({
  audio,
  background,
  position,
  size,
  timeline,
  transitions,
  trim,
})

export const mockVideoLayer = (): VideoLayer => mockVideoLayerConfig()
