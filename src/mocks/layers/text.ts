import { Color, TextAlignmentValue, TextLayer, TextLayerConfig, TextOptions } from 'constant'
import {
  defaultBackgroundOptions,
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTransitionsOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'
import { deepMerge } from 'utils/objects'

export const mockTextLayerConfig = (
  {
    background = defaultBackgroundOptions,
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    transitions = defaultTransitionsOptions,
    trim = defaultTrimOptions,
  }: TextLayerConfig = {
    background: defaultBackgroundOptions,
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    transitions: defaultTransitionsOptions,
    trim: defaultTrimOptions,
  }
): TextLayerConfig => ({
  background,
  position,
  size,
  timeline,
  transitions,
  trim,
})

const MockTextValue = {
  color: Color.black,
  fontFamily: 'Arial',
  fontSize: 20,
  fontWeight: 100,
  lineHeight: 26,
  maxFontSize: 25,
  maxHeight: 400,
  maxWidth: 800,
  text: 'text',
  textAlign: TextAlignmentValue.center,
}

export const mockTextOptions = ({
  color = MockTextValue.color,
  fontFamily = MockTextValue.fontFamily,
  fontSize = MockTextValue.fontSize,
  fontWeight = MockTextValue.fontWeight,
  lineHeight = MockTextValue.lineHeight,
  maxFontSize = MockTextValue.maxFontSize,
  maxHeight = MockTextValue.maxHeight,
  maxWidth = MockTextValue.maxWidth,
  text = MockTextValue.text,
  textAlign = MockTextValue.textAlign,
}: TextOptions = MockTextValue): TextOptions => ({
  color,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  maxFontSize,
  maxHeight,
  maxWidth,
  text,
  textAlign,
})

export const mockTextLayer = (): TextLayer => deepMerge({ text: mockTextOptions() }, mockTextLayerConfig())
