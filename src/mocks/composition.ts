import {
  AudioLayer,
  Color,
  CompositionInterface,
  CompositionOptions,
  EncodeResponse,
  FilterLayer,
  FilterName,
  HTMLLayer,
  ImageLayer,
  LayerFormatValue,
  LayerHorizontalAlignmentValue,
  LayerVerticalAlignmentValue,
  LottieLayer,
  SubtitlesLayer,
  TextAlignmentValue,
  TextLayer,
  VideoLayer,
  WaveformLayer,
} from 'constant'

export const mockComposition = (
  {
    getLayerAttribute = () => {},
    layer = () => {},
    layers = [],
    updateLayerAttribute = () => {},
  }: {
    getLayerAttribute?: any
    layer?: any
    layers?: any
    updateLayerAttribute?: any
  } = {
    getLayerAttribute: () => {},
    layer: () => {},
    layers: [],
    updateLayerAttribute: () => {},
  }
): CompositionInterface => ({
  getLayerAttribute,
  layer,
  layers,
  updateLayerAttribute,
})

export const mockCompositionOptions = (
  { backgroundColor, dimensions, duration, metadata }: CompositionOptions = {
    backgroundColor: Color.white,
    dimensions: { height: 100, width: 200 },
    duration: 10,
    metadata: { key: 'value' },
  }
): CompositionOptions => ({
  backgroundColor,
  dimensions,
  duration,
  metadata,
})

export const mockAudioLayer = (
  { start, trim, volume }: AudioLayer = { start: 0, trim: { end: 5, start: 1 }, volume: 1 }
): AudioLayer => ({ start, trim, volume })

export const mockEncodeResponse = (
  { id, status, timestamp }: EncodeResponse = { id: 'id', status: 'status', timestamp: 1646242134 }
): EncodeResponse => ({
  id,
  status,
  timestamp,
})

export const mockFilterLayer = (
  { filter, start }: FilterLayer = {
    filter: { filterName: FilterName.brightness, options: { brightness: 10 } },
    start: 0,
  }
): FilterLayer => ({
  filter,
  start,
})

export const mockHTMLLayer = (
  {
    height,
    width,
    withHTML,
    withTransparentBackground,
    withURL,
  }: { height?: number; width?: number; withHTML: boolean; withTransparentBackground?: boolean; withURL: boolean } = {
    withHTML: true,
    withURL: false,
  }
): HTMLLayer => ({
  height,
  html: {
    page: withHTML ? 'html' : undefined,
    url: withURL ? 'url' : undefined,
    withTransparentBackground,
  },
  width,
})

export const mockImageLayer = ({ withFilter }: { withFilter: boolean } = { withFilter: false }): ImageLayer => ({
  filter: withFilter
    ? {
        filterName: FilterName.brightness,
        options: { brightness: 10 },
      }
    : undefined,
  format: LayerFormatValue.fill,
  height: 100,
  start: 10,
  width: 200,
  x: 10,
  y: 20,
})

export const mockLottieLayer = (
  { data, start }: LottieLayer = {
    data: { assets: [], ddd: 10, fr: 20, h: 30, ip: 40, layers: [], nm: 'nm', op: 50, v: 'v', w: 60 },
    start: 10,
  }
): LottieLayer => ({
  data,
  start,
})

export const mockSubtitlesLayer = (
  { subtitles, x, y }: SubtitlesLayer = {
    subtitles: {
      backgroundColor: Color.black,
      color: Color.white,
      fontSize: 32,
    },
    x: LayerHorizontalAlignmentValue.center,
    y: LayerVerticalAlignmentValue.center,
  }
): SubtitlesLayer => ({
  subtitles,
  x,
  y,
})

export const mockTextLayer = (
  {
    color,
    fontFamily,
    fontSize,
    format,
    height,
    maxFontSize,
    maxHeight,
    maxWidth,
    start,
    text,
    textAlign,
    width,
    x,
    y,
  }: TextLayer = {
    color: Color.black,
    fontFamily: 'Arial',
    fontSize: 20,
    format: LayerFormatValue.fill,
    height: 100,
    maxFontSize: 25,
    maxHeight: 400,
    maxWidth: 800,
    start: 10,
    text: 'text',
    textAlign: TextAlignmentValue.center,
    width: 200,
    x: 10,
    y: 20,
  }
): TextLayer => ({
  color,
  fontFamily,
  fontSize,
  format,
  height,
  maxFontSize,
  maxHeight,
  maxWidth,
  start,
  text,
  textAlign,
  width,
  x,
  y,
})

export const mockVideoLayer = (
  { format, height, start, width, x, y }: VideoLayer = {
    format: LayerFormatValue.fill,
    height: 100,
    start: 10,
    width: 200,
    x: 10,
    y: 20,
  }
): VideoLayer => ({
  format,
  height,
  start,
  width,
  x,
  y,
})

export const mockWaveformLayer = (
  { format, waveform, x, y }: WaveformLayer = {
    format: LayerFormatValue.fill,
    waveform: {
      backgroundColor: Color.transparent,
      color: Color.white,
    },
    x: 10,
    y: 20,
  }
): WaveformLayer => ({
  format,
  waveform,
  x,
  y,
})
