import { Readable } from 'stream'

import {
  ApiVideoMethod,
  CompositionFile,
  CompositionKey,
  CompositionOptions,
  DimensionsKey,
  PrimitiveType,
} from 'constant'
import { CompositionErrorText, MediaErrorText, ValidationErrorText } from 'strings'
import { validatePresenceOf, validateValueIsOfType } from 'utils/validation'

export const validateCompositionFile = (callerName: string, file: CompositionFile): void => {
  validatePresenceOf(file, MediaErrorText.invalidFileSource(callerName))

  if (typeof file !== 'string') {
    if (!(file instanceof Readable)) {
      throw new Error(MediaErrorText.invalidFileSource(callerName))
    }
  }
}

export const validateCompositionOptions = ({ backgroundColor, dimensions }: CompositionOptions): void => {
  const errors: string[] = []

  validatePresenceOf(dimensions, CompositionErrorText.dimensionsRequired)

  errors.push(
    validateValueIsOfType(
      ApiVideoMethod.new,
      ValidationErrorText.SUB_FIELD(CompositionKey.dimensions, DimensionsKey.height),
      dimensions.height,
      PrimitiveType.number
    )
  )

  errors.push(
    validateValueIsOfType(
      ApiVideoMethod.new,
      ValidationErrorText.SUB_FIELD(CompositionKey.dimensions, DimensionsKey.width),
      dimensions.width,
      PrimitiveType.number
    )
  )

  errors.push(
    validateValueIsOfType(ApiVideoMethod.new, CompositionKey.backgroundColor, backgroundColor, PrimitiveType.string)
  )

  const filteredErrors = errors.filter((error) => error !== undefined)

  if (filteredErrors.length) {
    throw new TypeError(filteredErrors.join('\n'))
  }
}
