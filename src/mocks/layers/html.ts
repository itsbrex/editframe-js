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
    withTransparentBackground = true,
    withUrl = false,
  }: { withHtml?: boolean; withTransparentBackground?: boolean; withUrl?: boolean } = {
    withHtml: true,
    withTransparentBackground: true,
    withUrl: false,
  }
): HtmlOptions => ({
  page: withHtml ? 'html' : undefined,
  url: withUrl ? 'url' : undefined,
  withTransparentBackground,
})

export const mockHtmlLayer = (): HtmlLayer => deepMerge({ html: mockHtmlOptions() }, mockHtmlLayerConfig())
