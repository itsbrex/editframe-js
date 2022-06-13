import {
  HtmlLayer,
  HtmlLayerConfig,
  defaultHtmlOptions,
  defaultPosition,
  defaultSize,
  defaultTimeline,
  defaultTransitions,
  defaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultHtmlLayerConfig = (): HtmlLayerConfig => {
  const defaults = {}

  deepMerge(defaults, defaultPosition, defaultSize, defaultTimeline, defaultTransitions, defaultTrim)

  return defaults
}

export const makeDefaultHtmlLayer = (): HtmlLayer => {
  const defaults: HtmlLayer = { html: defaultHtmlOptions }

  deepMerge(defaults, makeDefaultHtmlLayerConfig())

  return defaults
}
