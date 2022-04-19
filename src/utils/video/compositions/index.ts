import { Readable } from 'stream'

import {
  ApiVideoMethod,
  AudioLayer,
  CompositionFile,
  CompositionMethod,
  CompositionOptionAttribute,
  CompositionOptions,
  FilterLayer,
  HTMLLayer,
  ImageLayer,
  LayerAttribute,
  LayerValidator,
  LottieLayer,
  PrimitiveType,
  SubtitlesLayer,
  TextLayer,
  VideoLayer,
  VideoOptions,
  WaveformLayer,
} from 'constant'
import { CompositionErrorText, MediaErrorText, ValidationErrorText } from 'strings'
import { createReadStream, downloadFile, fileExists } from 'utils/files'
import { urlOrFile } from 'utils/forms'
import { isValidUrl, validatePresenceOf, validateValueIsOfType } from 'utils/validation'
import {
  validateLayerAlignment,
  validateLayerAudio,
  validateLayerBase,
  validateLayerFilter,
  validateLayerHTML,
  validateLayerLottie,
  validateLayerPositionableMedia,
  validateLayerSubtitles,
  validateLayerText,
  validateLayerTrim,
  validateLayerVisualMedia,
  validateLayerWaveform,
} from 'utils/video/layers'

export const formDataKey = (file: CompositionFile, id: string): string => `${urlOrFile(file)}${id}`

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

export const validateCompositionFile = (file: CompositionFile): void => {
  validatePresenceOf(file, MediaErrorText.invalidFileSource)

  if (typeof file !== 'string') {
    if (!(file instanceof Readable)) {
      throw new Error(MediaErrorText.invalidFileSource)
    }
  }
}

export const validateVideoOptions = ({ backgroundColor, dimensions, duration }: VideoOptions): void => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      ApiVideoMethod.new,
      ValidationErrorText.SUB_FIELD(CompositionOptionAttribute.dimensions, LayerAttribute.height),
      dimensions.height,
      PrimitiveType.number
    )
  )

  errors.push(
    validateValueIsOfType(
      ApiVideoMethod.new,
      ValidationErrorText.SUB_FIELD(CompositionOptionAttribute.dimensions, LayerAttribute.width),
      dimensions.width,
      PrimitiveType.number
    )
  )

  errors.push(
    validateValueIsOfType(ApiVideoMethod.new, CompositionOptionAttribute.duration, duration, PrimitiveType.number)
  )

  errors.push(
    validateValueIsOfType(
      ApiVideoMethod.new,
      CompositionOptionAttribute.backgroundColor,
      backgroundColor,
      PrimitiveType.string
    )
  )

  const filteredErrors = errors.filter((error) => error !== undefined)

  if (filteredErrors.length) {
    throw new TypeError(filteredErrors.join('\n'))
  }
}

export const validateCompositionOptions = ({ backgroundColor, dimensions, duration }: CompositionOptions): void => {
  const errors: string[] = []

  validatePresenceOf(duration, CompositionErrorText.durationRequired)
  validatePresenceOf(dimensions, CompositionErrorText.dimensionsRequired)

  errors.push(
    validateValueIsOfType(
      ApiVideoMethod.new,
      ValidationErrorText.SUB_FIELD(CompositionOptionAttribute.dimensions, LayerAttribute.height),
      dimensions.height,
      PrimitiveType.number
    )
  )

  errors.push(
    validateValueIsOfType(
      ApiVideoMethod.new,
      ValidationErrorText.SUB_FIELD(CompositionOptionAttribute.dimensions, LayerAttribute.width),
      dimensions.width,
      PrimitiveType.number
    )
  )

  errors.push(
    validateValueIsOfType(
      ApiVideoMethod.new,
      CompositionOptionAttribute.backgroundColor,
      backgroundColor,
      PrimitiveType.string
    )
  )

  const filteredErrors = errors.filter((error) => error !== undefined)

  if (filteredErrors.length) {
    throw new TypeError(filteredErrors.join('\n'))
  }
}

export const validateLayerMethod = (
  validators: LayerValidator[],
  callerName: string,
  options: Record<string, any>
): void => {
  const errors = validators
    .map((validate) => validate(callerName, options))
    .flat()
    .filter((error) => error !== undefined)

  if (errors.length) {
    throw new TypeError(`Validation Errors: ${errors.join('\n')}`)
  }
}

export const validateAddAudio = (options: AudioLayer): void =>
  validateLayerMethod([validateLayerBase, validateLayerTrim, validateLayerAudio], CompositionMethod.addAudio, options)

export const validateAddHTML = (options: HTMLLayer): void =>
  validateLayerMethod(
    [validateLayerBase, validateLayerVisualMedia, validateLayerFilter, validateLayerHTML],
    CompositionMethod.addHTML,
    options
  )

export const validateAddImage = (options: ImageLayer): void =>
  validateLayerMethod(
    [validateLayerBase, validateLayerVisualMedia, validateLayerFilter],
    CompositionMethod.addImage,
    options
  )

export const validateAddLottie = (options: LottieLayer): void => {
  validateLayerMethod(
    [validateLayerBase, validateLayerVisualMedia, validateLayerLottie],
    CompositionMethod.addLottie,
    options
  )
}

export const validateAddSubtitles = (options: SubtitlesLayer): void =>
  validateLayerMethod(
    [validateLayerBase, validateLayerPositionableMedia, validateLayerSubtitles],
    CompositionMethod.addSubtitles,
    options
  )

export const validateAddText = (options: TextLayer): void =>
  validateLayerMethod(
    [validateLayerBase, validateLayerVisualMedia, validateLayerAlignment, validateLayerText],
    CompositionMethod.addText,
    options
  )

export const validateAddVideo = (options: VideoLayer): void =>
  validateLayerMethod(
    [validateLayerBase, validateLayerTrim, validateLayerAudio, validateLayerVisualMedia],
    CompositionMethod.addVideo,
    options
  )

export const validateAddFilter = (options: FilterLayer): void =>
  validateLayerMethod([validateLayerBase, validateLayerFilter], CompositionMethod.addFilter, options)

export const validateAddWaveform = (options: WaveformLayer): void => {
  validateLayerMethod(
    [validateLayerBase, validateLayerVisualMedia, validateLayerWaveform],
    CompositionMethod.addWaveform,
    options
  )
}
