import { HtmlLayer, HtmlLayerConfig, HtmlOptions } from 'constant'
import {
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTransitionsOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'
import { deepMerge } from 'utils/objects'

export const mockHtmlLayerConfig = (
  {
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    transitions = defaultTransitionsOptions,
    trim = defaultTrimOptions,
  }: HtmlLayerConfig = {
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    transitions: defaultTransitionsOptions,
    trim: defaultTrimOptions,
  }
): HtmlLayerConfig => ({
  position,
  size,
  timeline,
  transitions,
  trim,
})

export const mockHtmlOptions = (
  {
    withHtml = true,
    withTailwind = true,
    withTransparentBackground = true,
    withUrl = false,
  }: { withHtml?: boolean; withTailwind?: boolean; withTransparentBackground?: boolean; withUrl?: boolean } = {
    withHtml: true,
    withTailwind: true,
    withTransparentBackground: true,
    withUrl: false,
  }
): HtmlOptions => ({
  page: withHtml ? { body: 'html', styles: 'styles' } : undefined,
  url: withUrl ? 'url' : undefined,
  withTailwind,
  withTransparentBackground,
})

export const mockHtmlLayer = (): HtmlLayer => deepMerge({ html: mockHtmlOptions() }, mockHtmlLayerConfig())
