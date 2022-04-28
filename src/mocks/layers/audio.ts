import { AudioLayer, AudioLayerConfig } from 'constant'
import { defaultTimelineOptions, defaultTrimOptions, mockAudioOptions } from 'mocks/layerConfigs'
import { deepMerge } from 'utils/objects'

export const mockAudioLayerConfig = (
  { timeline = defaultTimelineOptions, trim = defaultTrimOptions }: AudioLayerConfig = {
    timeline: defaultTimelineOptions,
    trim: defaultTrimOptions,
  }
): AudioLayerConfig => ({
  timeline,
  trim,
})

export const mockAudioLayer = (): AudioLayer => deepMerge({ audio: mockAudioOptions() }, mockAudioLayerConfig())
