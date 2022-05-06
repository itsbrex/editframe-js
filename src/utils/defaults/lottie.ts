import {
  LottieLayer,
  LottieLayerConfig,
  LottieOptions,
  defaultLottieOptions,
  defaultPosition,
  defaultSize,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultLottieLayerConfig = (): LottieLayerConfig => {
  const defaults: LottieLayerConfig = {}

  deepMerge(defaults, defaultPosition, defaultSize, defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultLottieLayer = (): LottieLayer => {
  const defaults: LottieLayer = { lottie: {} as LottieOptions }

  deepMerge(defaults, { lottie: defaultLottieOptions }, makeDefaultLottieLayerConfig())

  return defaults
}
