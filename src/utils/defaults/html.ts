import {
  DefaultHtmlOptions,
  DefaultPosition,
  DefaultSize,
  DefaultTimeline,
  DefaultTransitions,
  DefaultTrim,
  HtmlLayer,
  HtmlLayerConfig,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultHtmlLayerConfig = (): HtmlLayerConfig => {
  const defaults = {}

  deepMerge(defaults, DefaultPosition, DefaultSize, DefaultTimeline, DefaultTransitions, DefaultTrim)

  return defaults
}

export const makeDefaultHtmlLayer = (): HtmlLayer => {
  const defaults: HtmlLayer = { html: DefaultHtmlOptions }

  deepMerge(defaults, makeDefaultHtmlLayerConfig())

  return defaults
}
