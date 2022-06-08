import {
  Color,
  FontStyleValue,
  FontWeightValue,
  TextAlignValue,
  TextHorizontalPositionValue,
  TextLayer,
  TextLayerConfig,
  TextOptions,
  TextVerticalPositionValue,
} from 'constant'
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
  backgroundTransform: 'none',
  border: 'none',
  borderRadius: 0,
  color: Color.black,
  fontFamily: 'Arial',
  fontSize: 20,
  fontStyle: FontStyleValue.normal,
  fontWeight: FontWeightValue.normal,
  lineHeight: 1.2,
  padding: 0,
  text: 'text',
  textAlign: TextAlignValue.center,
  textDecoration: 'none',
  textPosition: {
    x: TextHorizontalPositionValue.center,
    y: TextVerticalPositionValue.center,
  },
  textTransform: 'none',
}

export const mockTextOptions = ({
  backgroundColor = MockTextValue.backgroundColor,
  backgroundTransform = MockTextValue.backgroundTransform,
  border = MockTextValue.border,
  borderRadius = MockTextValue.borderRadius,
  color = MockTextValue.color,
  fontFamily = MockTextValue.fontFamily,
  fontSize = MockTextValue.fontSize,
  fontStyle = MockTextValue.fontStyle,
  fontWeight = MockTextValue.fontWeight,
  lineHeight = MockTextValue.lineHeight,
  padding = MockTextValue.padding,
  text = MockTextValue.text,
  textAlign = MockTextValue.textAlign,
  textDecoration = MockTextValue.textDecoration,
  textPosition = MockTextValue.textPosition,
  textTransform = MockTextValue.textTransform,
}: TextOptions = MockTextValue): TextOptions => ({
  backgroundColor,
  backgroundTransform,
  border,
  borderRadius,
  color,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  lineHeight,
  padding,
  text,
  textAlign,
  textDecoration,
  textPosition,
  textTransform,
})

export const mockTextLayer = (): TextLayer => deepMerge({ text: mockTextOptions() }, mockTextLayerConfig())
