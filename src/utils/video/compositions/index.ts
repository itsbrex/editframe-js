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
import { validateFilter } from 'utils/video/filters'
import {
  validateLayerAlignment,
  validateLayerAudio,
  validateLayerBase,
  validateLayerText,
  validateLayerTrim,
  validateLayerVisualMedia,
} from 'utils/video/layers'

export const formDataKey = (file: CompositionFile, id: string): string => `${urlOrFile(file)}${id}`

export const validateAddAudio = (options: AudioLayer): void => {
  validateLayerBase(CompositionMethod.addAudio, options)
  validateLayerTrim(CompositionMethod.addAudio, options)
  validateLayerAudio(CompositionMethod.addAudio, options)
}

export const validateAddImage = (options: ImageLayer): void => {
  validateLayerBase(CompositionMethod.addImage, options)
  validateLayerVisualMedia(CompositionMethod.addImage, options)
}

export const validateAddText = (options: TextLayer): void => {
  validateLayerBase(CompositionMethod.addText, options)
  validateLayerVisualMedia(CompositionMethod.addText, options)
  validateLayerAlignment(CompositionMethod.addText, options)
  validateLayerText(CompositionMethod.addText, options)
}

export const validateAddVideo = (options: VideoLayer): void => {
  validateLayerBase(CompositionMethod.addVideo, options)
  validateLayerTrim(CompositionMethod.addVideo, options)
  validateLayerAudio(CompositionMethod.addVideo, options)
  validateLayerVisualMedia(CompositionMethod.addVideo, options)
}

export const validateAddFilter = (options: FilterLayer): void => {
  validateLayerBase(CompositionMethod.addFilter, options)
  validateFilter(options.filter.filterName, options.filter.options)
}

export const validateAddWaveform = (options: WaveformLayer): void => {
  validateLayerBase(CompositionMethod.addWaveform, options)
  validateLayerVisualMedia(CompositionMethod.addWaveform, options)
  validateValueIsOfType(CompositionMethod.addWaveform, LayerAttribute.style, options.style, PrimitiveType.string)
}
