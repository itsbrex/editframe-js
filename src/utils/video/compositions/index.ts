import {
  ApiVideoMethod,
  AudioLayer,
  CompositionFile,
  CompositionMethod,
  CompositionOptionAttribute,
  CompositionOptions,
  FilterLayer,
  ImageLayer,
  LayerAttribute,
  LayerValidator,
  PrimitiveType,
  TextLayer,
  VideoLayer,
  WaveformLayer,
} from 'constant'
import { CompositionErrorText, ValidationErrorText } from 'strings'
import { urlOrFile } from 'utils/forms'
import { validatePresenceOf, validateValueIsOfType } from 'utils/validation'
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

export const validateCompositionOptions = ({ backgroundColor, dimensions, duration }: CompositionOptions): void => {
  const errors: string[] = []

  validatePresenceOf(duration, CompositionErrorText.durationRequired)

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
      ValidationErrorText.SUB_FIELD(CompositionOptionAttribute.dimensions, LayerAttribute.height),
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

export const validateAddImage = (options: ImageLayer): void =>
  validateLayerMethod([validateLayerBase, validateLayerVisualMedia], CompositionMethod.addImage, options)

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
  validateLayerMethod([validateLayerBase, validateLayerVisualMedia], CompositionMethod.addWaveform, options)

  const error = validateValueIsOfType(
    CompositionMethod.addWaveform,
    LayerAttribute.style,
    options.style,
    PrimitiveType.string
  )

  if (error) {
    throw new Error(error)
  }
}
