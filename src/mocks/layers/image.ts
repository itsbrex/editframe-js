import { ImageLayer, ImageLayerConfig } from 'constant'
import {
  defaultBackgroundOptions,
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'

export const mockImageLayerConfig = (
  {
    background = defaultBackgroundOptions,
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    trim = defaultTrimOptions,
  }: ImageLayerConfig = {
    background: defaultBackgroundOptions,
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    trim: defaultTrimOptions,
  }
): ImageLayerConfig => ({
  background,
  position,
  size,
  timeline,
  trim,
})

export const mockImageLayer = (): ImageLayer => mockImageLayerConfig()
