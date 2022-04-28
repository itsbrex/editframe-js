import {
  Dimensions,
  LottieLayer,
  LottieLayerConfig,
  LottieOptions,
  defaultLottieOptions,
  defaultPosition,
  defaultTimeline,
  defaultTrim,
} from 'constant'
import { makeDefaultSize } from 'utils/defaults/size'
import { deepMerge } from 'utils/objects'

export const makeDefaultLottieLayerConfig = (dimensions: Dimensions): LottieLayerConfig => {
  const defaults: LottieLayerConfig = {}

  deepMerge(defaults, defaultPosition, makeDefaultSize(dimensions), defaultTimeline, defaultTrim)

  return defaults
}

export const makeDefaultLottieLayer = (dimensions: Dimensions): LottieLayer => {
  const defaults: LottieLayer = { lottie: {} as LottieOptions }

  deepMerge(defaults, { lottie: defaultLottieOptions }, makeDefaultLottieLayerConfig(dimensions))

  return defaults
}
