import {
  Dimensions,
  HtmlLayer,
  HtmlLayerConfig,
  defaultBackground,
  defaultHtmlOptions,
  defaultPosition,
  defaultTimeline,
  defaultTransitions,
  defaultTrim,
} from 'constant'
import { makeDefaultSize } from 'utils/defaults/size'
import { deepMerge } from 'utils/objects'

export const makeDefaultHtmlLayerConfig = (dimensions: Dimensions): HtmlLayerConfig => {
  const defaults = {}

  deepMerge(
    defaults,
    defaultBackground,
    defaultPosition,
    makeDefaultSize(dimensions),
    defaultTimeline,
    defaultTransitions,
    defaultTrim
  )

  return defaults
}

export const makeDefaultHtmlLayer = (dimensions: Dimensions): HtmlLayer => {
  const defaults: HtmlLayer = { html: defaultHtmlOptions }

  deepMerge(defaults, makeDefaultHtmlLayerConfig(dimensions))

  return defaults
}
