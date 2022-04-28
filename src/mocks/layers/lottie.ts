import { LottieLayer, LottieLayerConfig, LottieOptions } from 'constant'
import {
  defaultPositionOptions,
  defaultSizeOptions,
  defaultTimelineOptions,
  defaultTrimOptions,
} from 'mocks/layerConfigs'
import { deepMerge } from 'utils/objects'

export const mockLottieLayerConfig = (
  {
    position = defaultPositionOptions,
    size = defaultSizeOptions,
    timeline = defaultTimelineOptions,
    trim = defaultTrimOptions,
  }: LottieLayerConfig = {
    position: defaultPositionOptions,
    size: defaultSizeOptions,
    timeline: defaultTimelineOptions,
    trim: defaultTrimOptions,
  }
): LottieLayerConfig => ({
  position,
  size,
  timeline,
  trim,
})

export const mockLottieOptions = (
  {
    assets = [],
    ddd = 10,
    fr = 20,
    h = 30,
    ip = 40,
    layers = [],
    nm = 'nm',
    op = 50,
    v = 'v',
    w = 60,
  }: LottieOptions = {
    assets: [],
    ddd: 10,
    fr: 20,
    h: 30,
    ip: 40,
    layers: [],
    nm: 'nm',
    op: 50,
    v: 'v',
    w: 60,
  }
): LottieOptions => ({
  assets,
  ddd,
  fr,
  h,
  ip,
  layers,
  nm,
  op,
  v,
  w,
})

export const mockLottieLayer = (): LottieLayer => deepMerge({ lottie: mockLottieOptions() }, mockLottieLayerConfig())
