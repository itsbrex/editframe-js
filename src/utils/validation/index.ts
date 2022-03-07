import { CompositionFile, Filter, PrimitiveType, Size } from 'constant'
import { ValidationErrorText } from 'strings'
import { logError } from 'utils'

export const isValidUrl = (url: string): boolean => {
  try {
    validateURL(url)

    return true
  } catch (error) {
    return false
  }
}

export const validateURL = (url: string): void => {
  try {
    new URL(url)
  } catch (error) {
    throw new TypeError(ValidationErrorText.INVALID_URL(url))
  }
}

export const validatePresenceOf = (
  value: string | number | CompositionFile | Filter | Size | undefined,
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
export const withValidation = <T>(validate: () => void, callback?: () => T | undefined): T => {
  try {
    validate()

    if (callback) {
      return callback()
    }

    return undefined
  } catch ({ name, stack }) {
    logError(stack)

    return undefined
  }
}
