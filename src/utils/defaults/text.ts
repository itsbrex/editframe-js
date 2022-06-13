import {
  Color,
  TextAlignValue,
  TextLayer,
  TextLayerConfig,
  TextOptions,
  defaultPosition,
  defaultSize,
  defaultTimeline,
  defaultTransitions,
  defaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultTextLayerConfig = (): TextLayerConfig => {
  const defaults = {}

  deepMerge(defaults, defaultPosition, defaultSize, defaultTimeline, defaultTransitions, defaultTrim)

  return defaults
}

export const makeDefaultTextOptions = (): TextOptions => ({
  backgroundColor: Color.transparent,
  backgroundTransform: 'none',
  border: 'none',
  borderRadius: 0,
  color: Color.white,
  fontFamily: 'Helvetica',
  fontSize: 100,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 1.2,
  padding: 16,
  text: 'Your Text Here...',
  textAlign: TextAlignValue.left,
  textDecoration: 'none',
  textPosition: null,
  textTransform: 'none',
})

export const makeDefaultTextLayer = (): TextLayer => {
  const defaults: TextLayer = { text: makeDefaultTextOptions() }

  deepMerge(defaults, makeDefaultTextLayerConfig())

  return defaults
}
