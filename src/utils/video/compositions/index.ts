import { Readable } from 'stream'

import {
  ComposableLayer,
  CompositionFile,
  DefaultAudioOptions,
  DefaultHtmlOptions,
  DefaultSubtitlesOptions,
  DefaultTextOptions,
  DefaultWaveformOptions,
  Dimensions,
  LayerConfigs,
  LayerOptions,
  LayerType,
  SequenceableLayer,
  TransitionFadeOptions,
  TransitionType,
  defaultFilterLayer,
  defaultFilterOptions,
} from 'constant'
import { ValidationErrorText } from 'strings'
import {
  makeDefaultAudioLayer,
  makeDefaultHtmlLayer,
  makeDefaultImageLayer,
  makeDefaultLottieLayer,
  makeDefaultSequenceLayer,
  makeDefaultSubtitlesLayer,
  makeDefaultTextLayer,
  makeDefaultVideoLayer,
  makeDefaultWaveformLayer,
} from 'utils/defaults'
import { createReadStream, downloadFile, fileExists } from 'utils/files'
import { urlOrFile } from 'utils/forms'
import { deepClone, deepMerge } from 'utils/objects'
import { stripQueryParams } from 'utils/paths'
import { isValidUrl } from 'utils/validation'

export const formDataKey = (file: CompositionFile, id: string): string => `${urlOrFile(file)}${id}`

export const setLayerDefaults = <Layer>(
  dimensions: Dimensions,
  layerType: LayerType,
  layerOptions?: LayerOptions,
  layerConfig?: LayerConfigs
): Layer => {
  const defaultDimensions = { ...dimensions }

  const layerOptionsDefaults: Record<LayerType, LayerOptions> = {
    [LayerType.audio]: deepClone(DefaultAudioOptions),
    [LayerType.filter]: deepClone(defaultFilterOptions),
    [LayerType.html]: deepClone(DefaultHtmlOptions),
    [LayerType.image]: undefined,
    [LayerType.lottie]: {},
    [LayerType.sequence]: undefined,
    [LayerType.subtitles]: deepClone(DefaultSubtitlesOptions),
    [LayerType.text]: deepClone(DefaultTextOptions),
    [LayerType.video]: undefined,
    [LayerType.waveform]: deepClone(DefaultWaveformOptions),
  }

  const layerDefaults: Record<LayerType, ComposableLayer> = {
    [LayerType.audio]: deepClone(makeDefaultAudioLayer()),
    [LayerType.filter]: deepClone(defaultFilterLayer),
    [LayerType.html]: deepClone(makeDefaultHtmlLayer()),
    [LayerType.image]: deepClone(makeDefaultImageLayer()),
    [LayerType.lottie]: deepClone(makeDefaultLottieLayer()),
    [LayerType.sequence]: deepClone(makeDefaultSequenceLayer()),
    [LayerType.subtitles]: deepClone(makeDefaultSubtitlesLayer()),
    [LayerType.text]: deepClone(makeDefaultTextLayer()),
    [LayerType.video]: deepClone(makeDefaultVideoLayer()),
    [LayerType.waveform]: deepClone(makeDefaultWaveformLayer(defaultDimensions)),
  }

  let layerWithDefaults = deepClone(layerDefaults)[layerType] as Layer

  if (layerOptions && Object.keys(layerOptions).length !== 0) {
    layerWithDefaults[layerType] = deepMerge(layerOptionsDefaults[layerType], layerOptions)
  }

  if (layerConfig) {
    layerWithDefaults = deepMerge(layerWithDefaults, layerConfig)
  }

  return layerWithDefaults
}

export const processCompositionFile = async (
  file: CompositionFile,
  temporaryDirectory: string
): Promise<{ filepath: string; readStream: Readable }> => {
  if (typeof file !== 'string') {
    const filepath = (file as any).path

    if (!fileExists(filepath)) {
      throw new Error(ValidationErrorText.FILE_DOES_NOT_EXIST(filepath))
    }

    return { filepath, readStream: file as Readable }
  }

  if (isValidUrl(file)) {
    const { temporaryFilePath } = await downloadFile(stripQueryParams(file), temporaryDirectory)

    return {
      filepath: temporaryFilePath,
      readStream: createReadStream(temporaryFilePath),
    }
  }

  if (!fileExists(file)) {
    throw new Error(ValidationErrorText.FILE_DOES_NOT_EXIST(file))
  }

  return { filepath: file, readStream: createReadStream(file) }
}

export const processCrossfades = (
  currentTime: number,
  currentLayer: SequenceableLayer,
  previousLayer?: SequenceableLayer,
  nextLayer?: SequenceableLayer
): number => {
  let newCurrentTime = currentTime
  const currentLayerCrossfadeIn = currentLayer.transitions.find(
    (transition) => transition.type === TransitionType.crossfadeIn
  )
  const previousLayerCrossfadeOut = previousLayer
    ? previousLayer.transitions.find((transition) => transition.type === TransitionType.crossfadeOut)
    : undefined
  const nextLayerCrossfadeIn = nextLayer
    ? nextLayer.transitions.find((transition) => transition.type === TransitionType.crossfadeIn)
    : undefined
  const currentLayerCrossfadeInOptions = currentLayerCrossfadeIn?.options as TransitionFadeOptions
  const previousLayerCrossfadeOutOptions = previousLayerCrossfadeOut?.options as TransitionFadeOptions
  const nextLayerCrossfadeInOptions = nextLayerCrossfadeIn?.options as TransitionFadeOptions

  if (previousLayer && previousLayerCrossfadeOut) {
    if (currentLayer.transitions.find(({ type }) => type === TransitionType.fadeIn) === undefined) {
      currentLayer.addTransition({
        options: { duration: previousLayerCrossfadeOutOptions?.duration },
        type: TransitionType.fadeIn,
      })
    }
    currentLayer.setStart(newCurrentTime - previousLayerCrossfadeOutOptions.duration)
    newCurrentTime = newCurrentTime - previousLayerCrossfadeOutOptions.duration
  } else if (nextLayer && nextLayerCrossfadeIn) {
    if (currentLayer.transitions.find(({ type }) => type === TransitionType.fadeOut) === undefined) {
      currentLayer.addTransition({
        options: { duration: nextLayerCrossfadeInOptions.duration },
        type: TransitionType.fadeOut,
      })
    }
    currentLayer.setStart(newCurrentTime)
    newCurrentTime = newCurrentTime - nextLayerCrossfadeInOptions.duration
  } else if (previousLayer && currentLayerCrossfadeIn) {
    if (previousLayer.transitions.find(({ type }) => type === TransitionType.fadeOut) === undefined) {
      previousLayer.addTransition({
        options: { duration: currentLayerCrossfadeInOptions.duration },
        type: TransitionType.fadeOut,
      })
    }
    currentLayer.setStart(newCurrentTime - currentLayerCrossfadeInOptions?.duration)
    newCurrentTime = newCurrentTime - currentLayerCrossfadeInOptions?.duration
  } else {
    currentLayer.setStart(newCurrentTime)
  }

  return newCurrentTime
}
