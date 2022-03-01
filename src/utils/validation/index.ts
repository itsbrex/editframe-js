import colors from 'colors/safe'

import { CompositionFile, PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'

export const logValidationError = (message: string): void => console.error(colors.yellow(message))

export const validatePresenceOf = (
  value: string | number | CompositionFile | undefined,
  errorMessage: string
): void => {
  if (!value) {
    throw new Error(errorMessage)
  }
}

export const validateValueIsOfType = (
  caller: string,
  fieldName: string,
  value: number | string | undefined,
  type: PrimitiveType,
  shouldThrow = false
): string | undefined => {
  if (value && typeof value !== type) {
    const message = ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, type)

    if (shouldThrow) {
      throw new TypeError(message)
    } else {
      return message
    }
  }

  return undefined
}
