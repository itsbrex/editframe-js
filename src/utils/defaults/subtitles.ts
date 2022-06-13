import {
  DefaultSubtitlesOptions,
  DefaultTimeline,
  DefaultTransitions,
  DefaultTrim,
  LayerHorizontalAlignmentValue,
  SubtitlesLayer,
  SubtitlesLayerConfig,
} from 'constant'
import { deepMerge } from 'utils/objects'

export const makeDefaultSubtitlesLayerConfig = (): SubtitlesLayerConfig => {
  const defaults = {}

  deepMerge(
    defaults,
    { position: { isRelative: true, x: LayerHorizontalAlignmentValue.center, y: 0.85 } },
    DefaultTimeline,
    DefaultTransitions,
    DefaultTrim
  )

  return defaults
}

export const makeDefaultSubtitlesLayer = (): SubtitlesLayer => {
  const defaults = { subtitles: DefaultSubtitlesOptions }

  deepMerge(defaults, makeDefaultSubtitlesLayerConfig())

  return defaults
}
