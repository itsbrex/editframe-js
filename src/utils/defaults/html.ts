import {
  Dimensions,
  HtmlLayer,
  HtmlLayerConfig,
  defaultBackground,
  defaultHtmlOptions,
  defaultPosition,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { makeDefaultSize } from 'utils/defaults/size'
import { deepMerge } from 'utils/objects'

export const makeDefaultHtmlLayerConfig = (dimensions: Dimensions): HtmlLayerConfig => {
  const defaults = {}

  deepMerge(defaults, defaultBackground, defaultPosition, makeDefaultSize(dimensions), defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultHtmlLayer = (dimensions: Dimensions): HtmlLayer => {
  const defaults: HtmlLayer = { html: defaultHtmlOptions }

  deepMerge(defaults, makeDefaultHtmlLayerConfig(dimensions))

  return defaults
}
