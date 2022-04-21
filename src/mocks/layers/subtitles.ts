import { Color, SubtitlesLayer, SubtitlesLayerConfig, SubtitlesOptions } from 'constant'
import { defaultPositionOptions, defaultTimelineOptions, defaultTrimOptions } from 'mocks/layerConfigs'
import { deepMerge } from 'utils/objects'

export const mockSubtitlesLayerConfig = (
  {
    position = defaultPositionOptions,
    timeline = defaultTimelineOptions,
    trim = defaultTrimOptions,
  }: SubtitlesLayerConfig = {
    position: defaultPositionOptions,
    timeline: defaultTimelineOptions,
    trim: defaultTrimOptions,
  }
): SubtitlesLayerConfig => ({
  position,
  timeline,
  trim,
})

const MockSubtitlesValue = {
  backgroundColor: Color.black,
  color: Color.white,
  fontSize: 32,
}

export const mockSubtitlesOptions = ({
  backgroundColor = MockSubtitlesValue.backgroundColor,
  color = MockSubtitlesValue.color,
  fontSize = MockSubtitlesValue.fontSize,
}: SubtitlesOptions = MockSubtitlesValue): SubtitlesOptions => ({
  backgroundColor,
  color,
  fontSize,
})

export const mockSubtitlesLayer = (): SubtitlesLayer =>
  deepMerge({ subtitles: mockSubtitlesOptions() }, mockSubtitlesLayerConfig())
