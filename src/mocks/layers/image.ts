import { ImageLayer, ImageLayerConfig } from 'constant'
import {
  defaultBackgroundOptions,
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTransitionsOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'

export const mockImageLayerConfig = (
  {
    background = defaultBackgroundOptions,
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    transitions = defaultTransitionsOptions,
    trim = defaultTrimOptions,
  }: ImageLayerConfig = {
    background: defaultBackgroundOptions,
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    transitions: defaultTransitionsOptions,
    trim: defaultTrimOptions,
  }
): ImageLayerConfig => ({
  background,
  position,
  size,
  timeline,
  transitions,
  trim,
})

export const mockImageLayer = (): ImageLayer => mockImageLayerConfig()
