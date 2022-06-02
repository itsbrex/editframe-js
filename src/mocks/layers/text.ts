import { Color, TextAlignmentValue, TextLayer, TextLayerConfig, TextOptions } from 'constant'
import {
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTransitionsOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'
import { deepMerge } from 'utils/objects'

export const mockTextLayerConfig = (
  {
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    transitions = defaultTransitionsOptions,
    trim = defaultTrimOptions,
  }: TextLayerConfig = {
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    transitions: defaultTransitionsOptions,
    trim: defaultTrimOptions,
  }
): TextLayerConfig => ({
  position,
  size,
  timeline,
  transitions,
  trim,
})

const MockTextValue = {
  backgroundColor: Color.white,
  color: Color.black,
  fontFamily: 'Arial',
  fontSize: 20,
  fontWeight: 100,
  lineHeight: 26,
  maxFontSize: 25,
  maxHeight: 400,
  maxWidth: 800,
  padding: 0,
  text: 'text',
  textAlign: TextAlignmentValue.center,
}

export const mockTextOptions = ({
  backgroundColor = MockTextValue.backgroundColor,
  color = MockTextValue.color,
  fontFamily = MockTextValue.fontFamily,
  fontSize = MockTextValue.fontSize,
  fontWeight = MockTextValue.fontWeight,
  lineHeight = MockTextValue.lineHeight,
  maxFontSize = MockTextValue.maxFontSize,
  maxHeight = MockTextValue.maxHeight,
  maxWidth = MockTextValue.maxWidth,
  padding = MockTextValue.padding,
  text = MockTextValue.text,
  textAlign = MockTextValue.textAlign,
}: TextOptions = MockTextValue): TextOptions => ({
  backgroundColor,
  color,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  maxFontSize,
  maxHeight,
  maxWidth,
  padding,
  text,
  textAlign,
})

export const mockTextLayer = (): TextLayer => deepMerge({ text: mockTextOptions() }, mockTextLayerConfig())
