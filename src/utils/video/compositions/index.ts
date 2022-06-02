import { Readable } from 'stream'

import {
  ComposableLayer,
  CompositionFile,
  Dimensions,
  LayerConfigs,
  LayerOptions,
  LayerType,
  SequenceableLayer,
  TransitionType,
  defaultAudioOptions,
  defaultFilterLayer,
  defaultFilterOptions,
  defaultHtmlOptions,
  defaultSubtitlesOptions,
  defaultWaveformOptions,
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
  makeDefaultTextOptions,
  makeDefaultVideoLayer,
  makeDefaultWaveformLayer,
} from 'utils/defaults'
import { createReadStream, downloadFile, fileExists } from 'utils/files'
import { urlOrFile } from 'utils/forms'
import { deepMerge } from 'utils/objects'
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
    [LayerType.audio]: defaultAudioOptions,
    [LayerType.filter]: defaultFilterOptions,
    [LayerType.html]: defaultHtmlOptions,
    [LayerType.image]: undefined,
    [LayerType.lottie]: {},
    [LayerType.sequence]: undefined,
    [LayerType.subtitles]: defaultSubtitlesOptions,
    [LayerType.text]: makeDefaultTextOptions(),
    [LayerType.video]: undefined,
    [LayerType.waveform]: defaultWaveformOptions,
  }

  const layerDefaults: Record<LayerType, ComposableLayer> = {
    [LayerType.audio]: makeDefaultAudioLayer(),
    [LayerType.filter]: defaultFilterLayer,
    [LayerType.html]: makeDefaultHtmlLayer(defaultDimensions),
    [LayerType.image]: makeDefaultImageLayer(),
    [LayerType.lottie]: makeDefaultLottieLayer(),
    [LayerType.sequence]: makeDefaultSequenceLayer(),
    [LayerType.subtitles]: makeDefaultSubtitlesLayer(),
    [LayerType.text]: makeDefaultTextLayer(),
    [LayerType.video]: makeDefaultVideoLayer(),
    [LayerType.waveform]: makeDefaultWaveformLayer(defaultDimensions),
  }

  let layerWithDefaults = layerDefaults[layerType] as Layer

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
    const { temporaryFilePath } = await downloadFile(file, temporaryDirectory)

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

  if (previousLayer && previousLayerCrossfadeOut) {
    currentLayer.addTransition({ duration: previousLayerCrossfadeOut.duration, type: TransitionType.fadeIn })
    currentLayer.setStart(newCurrentTime - previousLayerCrossfadeOut.duration)
    newCurrentTime = newCurrentTime - previousLayerCrossfadeOut.duration
  } else if (nextLayer && nextLayerCrossfadeIn) {
    currentLayer.addTransition({ duration: nextLayerCrossfadeIn.duration, type: TransitionType.fadeOut })
    currentLayer.setStart(newCurrentTime)
    newCurrentTime = newCurrentTime - nextLayerCrossfadeIn.duration
  } else if (previousLayer && currentLayerCrossfadeIn) {
    previousLayer.addTransition({ duration: currentLayerCrossfadeIn.duration, type: TransitionType.fadeOut })
    currentLayer.setStart(newCurrentTime - currentLayerCrossfadeIn.duration)
    newCurrentTime = newCurrentTime - currentLayerCrossfadeIn.duration
  } else {
    currentLayer.setStart(newCurrentTime)
  }

  return newCurrentTime
}
