import {
  DefaultLottieOptions,
  DefaultPosition,
  DefaultSize,
  DefaultTimeline,
  DefaultTransitions,
  DefaultTrim,
  LottieLayer,
  LottieLayerConfig,
  LottieOptions,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultLottieLayerConfig = (): LottieLayerConfig => {
  const defaults: LottieLayerConfig = {}

  deepMerge(defaults, DefaultPosition, DefaultSize, DefaultTimeline, DefaultTransitions, DefaultTrim)

  return defaults
}

export const makeDefaultLottieLayer = (): LottieLayer => {
  const defaults: LottieLayer = { lottie: {} as LottieOptions }

  deepMerge(defaults, { lottie: DefaultLottieOptions }, makeDefaultLottieLayerConfig())

  return defaults
}
