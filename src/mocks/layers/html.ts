import { HtmlLayer, HtmlLayerConfig, HtmlOptions } from 'constant'
import {
  defaultBackgroundOptions,
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'
import { deepMerge } from 'utils/objects'

export const mockHtmlLayerConfig = (
  {
    background = defaultBackgroundOptions,
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    trim = defaultTrimOptions,
  }: HtmlLayerConfig = {
    background: defaultBackgroundOptions,
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    trim: defaultTrimOptions,
  }
): HtmlLayerConfig => ({
  background,
  position,
  size,
  timeline,
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
