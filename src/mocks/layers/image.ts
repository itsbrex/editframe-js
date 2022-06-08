import { ImageLayer, ImageLayerConfig } from 'constant'
import {
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTransitionsOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'

export const mockImageLayerConfig = (
  {
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    transitions = defaultTransitionsOptions,
    trim = defaultTrimOptions,
  }: ImageLayerConfig = {
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    transitions: defaultTransitionsOptions,
    trim: defaultTrimOptions,
  }
): ImageLayerConfig => ({
  position,
  size,
  timeline,
  transitions,
  trim,
})

export const mockImageLayer = (): ImageLayer => mockImageLayerConfig()
