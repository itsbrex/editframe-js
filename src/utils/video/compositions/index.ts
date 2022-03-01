import {
  AudioLayer,
  CompositionFile,
  CompositionMethod,
  FilterLayer,
  ImageLayer,
  LayerAttribute,
  PrimitiveType,
  TextLayer,
  VideoLayer,
  WaveformLayer,
} from 'constant'
import { urlOrFile } from 'utils/forms'
import { validateValueIsOfType } from 'utils/validation'
import {
  validateLayerAlignment,
  validateLayerAudio,
  validateLayerBase,
  validateLayerFilter,
  validateLayerText,
  validateLayerTrim,
  validateLayerVisualMedia,
} from 'utils/video/layers'

export const formDataKey = (file: CompositionFile, id: string): string => `${urlOrFile(file)}${id}`

export const validateAddAudio = (options: AudioLayer): void =>
  [validateLayerBase, validateLayerTrim, validateLayerAudio].forEach((validate) =>
    validate(CompositionMethod.addAudio, options)
  )

export const validateAddImage = (options: ImageLayer): void =>
  [validateLayerBase, validateLayerVisualMedia].forEach((validate) => validate(CompositionMethod.addImage, options))

export const validateAddText = (options: TextLayer): void =>
  [validateLayerBase, validateLayerVisualMedia, validateLayerAlignment, validateLayerText].forEach((validate) =>
    validate(CompositionMethod.addText, options)
  )

export const validateAddVideo = (options: VideoLayer): void =>
  [validateLayerBase, validateLayerTrim, validateLayerAudio, validateLayerVisualMedia].forEach((validate) =>
    validate(CompositionMethod.addVideo, options)
  )

export const validateAddFilter = (options: FilterLayer): void =>
  [validateLayerBase, validateLayerFilter].forEach((validate) => validate(CompositionMethod.addFilter, options))

export const validateAddWaveform = (options: WaveformLayer): void => {
  ;[validateLayerBase, validateLayerVisualMedia].forEach((validate) => validate(CompositionMethod.addWaveform, options))
  validateValueIsOfType(CompositionMethod.addWaveform, LayerAttribute.style, options.style, PrimitiveType.string)
}
