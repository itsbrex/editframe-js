import {
  Color,
  Dimensions,
  TextAlignmentValue,
  TextLayer,
  TextLayerConfig,
  TextOptions,
  defaultBackground,
  defaultPosition,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { makeDefaultSize } from 'utils/defaults/size'
import { deepMerge } from 'utils/objects'

export const makeDefaultTextLayerConfig = (dimensions: Dimensions): TextLayerConfig => {
  const defaults = {}

  deepMerge(defaults, defaultBackground, defaultPosition, makeDefaultSize(dimensions), defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultTextOptions = ({ height, width }: Dimensions): TextOptions => ({
  color: Color.black,
  fontFamily: 'Arial',
  fontSize: 32,
  fontWeight: null,
  lineHeight: 38,
  maxFontSize: null,
  maxHeight: height,
  maxWidth: width,
  text: 'Your Text Here...',
  textAlign: TextAlignmentValue.center,
})

export const makeDefaultTextLayer = (dimensions: Dimensions): TextLayer => {
  const defaults: TextLayer = { text: makeDefaultTextOptions(dimensions) }

  deepMerge(defaults, makeDefaultTextLayerConfig(dimensions))

  return defaults
}
