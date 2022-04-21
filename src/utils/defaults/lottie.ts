import {
  LottieLayer,
  LottieLayerConfig,
  LottieOptions,
  defaultLottieOptions,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultLottieLayerConfig = (): LottieLayerConfig => {
  const defaults: LottieLayerConfig = {}

  deepMerge(defaults, defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultLottieLayer = (): LottieLayer => {
  const defaults: LottieLayer = { lottie: {} as LottieOptions }

  deepMerge(defaults, { lottie: defaultLottieOptions }, makeDefaultLottieLayerConfig())

  return defaults
}
