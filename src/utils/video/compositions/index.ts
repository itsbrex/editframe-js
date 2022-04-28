import { Readable } from 'stream'

import {
  ComposableLayer,
  CompositionFile,
  Dimensions,
  LayerConfigs,
  LayerOptions,
  LayerType,
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
    [LayerType.text]: makeDefaultTextOptions(defaultDimensions),
    [LayerType.video]: undefined,
    [LayerType.waveform]: defaultWaveformOptions,
  }

  const layerDefaults: Record<LayerType, ComposableLayer> = {
    [LayerType.audio]: makeDefaultAudioLayer(),
    [LayerType.filter]: defaultFilterLayer,
    [LayerType.html]: makeDefaultHtmlLayer(defaultDimensions),
    [LayerType.image]: makeDefaultImageLayer(defaultDimensions),
    [LayerType.lottie]: makeDefaultLottieLayer(defaultDimensions),
    [LayerType.sequence]: makeDefaultSequenceLayer(),
    [LayerType.subtitles]: makeDefaultSubtitlesLayer(),
    [LayerType.text]: makeDefaultTextLayer(defaultDimensions),
    [LayerType.video]: makeDefaultVideoLayer(defaultDimensions),
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
