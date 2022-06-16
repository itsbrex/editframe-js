import colorValidator from 'validate-color'

import { LayerValidator, PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'
import { logError } from 'utils/errors'
import { exitProcess } from 'utils/process'

export const assertType = (value: unknown, expected: string[] | string): boolean =>
  Array.isArray(expected) ? expected.includes(typeof value) : typeof value === expected

export const isValidUrl = (url: string): boolean => {
  try {
    validateUrl(url)

    return true
  } catch (error) {
    return false
  }
}

export const validateUrl = (url: string): void => {
  try {
    new URL(url)
  } catch (error) {
    throw new TypeError(ValidationErrorText.INVALID_URL(url))
  }
}

export const validateOptions = <OptionKey, Options>(
  callerName: string,
  optionKey: OptionKey,
  options?: Options
): void => {
  if (!options) {
    return
  }

  Object.keys(options).forEach((key) => {
    if (!Object.keys(optionKey).includes(key)) {
      throw new Error(
        ValidationErrorText.INVALID_OPTIONS(
          callerName,
          Object.keys(optionKey).join(', '),
          Object.keys(options).join(', ')
        )
      )
    }
  })
}

export const validateLayer = <LayerType>(
  validators: LayerValidator<LayerType>[],
  callerName: string,
  layer: LayerType
): void => {
  const errors = validators
    .map((validate) => validate({ callerName, layer }))
    .flat()
    .filter((error) => error !== undefined)

  if (errors.length) {
    throw new TypeError(`Validation Errors: ${errors.join('\n')}`)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validatePresenceOf = (value: any, errorMessage: string): void => {
  if (value === undefined || value === null) {
    throw new Error(errorMessage)
  }
}

export const validateValueIsOfType = (
  caller: string,
  fieldName: string,
  value: boolean | number | string | Record<string, any> | undefined,
  type: string,
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

export const validateValueIsOfTypes = (
  caller: string,
  fieldName: string,
  value: number | string | Record<string, any> | undefined,
  types: string[],
  shouldThrow = false
): string | undefined => {
  if (value && !types.includes(typeof value)) {
    const message = ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, ValidationErrorText.OR(types))

    if (shouldThrow) {
      throw new TypeError(message)
    } else {
      return message
    }
  }

  return undefined
}

export const validateValueIsInList = (
  caller: string,
  fieldName: string,
  value: number | string | undefined,
  values: (string | number)[],
  shouldThrow = false
): string | undefined => {
  if (value && !values.includes(value)) {
    const message = ValidationErrorText.MUST_BE_TYPE(
      caller,
      fieldName,
      value,
      ValidationErrorText.OR(values.map((value) => value.toString()))
    )

    if (shouldThrow) {
      throw new TypeError(message)
    } else {
      return message
    }
  }
  return undefined
}

export const validateColor = (
  caller: string,
  fieldName: string,
  value: string,
  shouldThrow = false
): string | undefined => {
  validateValueIsOfType(caller, fieldName, value, PrimitiveType.string)

  if (!colorValidator(value)) {
    const message = ValidationErrorText.INVALID_COLOR(caller, fieldName, value)

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

    exitProcess()

    return undefined
  }
}

export const withValidationAsync = async <T>(validate: () => void, callback?: () => Promise<T>): Promise<T> => {
  try {
    validate()

    if (callback) {
      return await callback()
    }

    return undefined
  } catch ({ name, stack }) {
    logError(stack)

    exitProcess()

    return undefined
  }
}

export const filterUndefined = (maybeUndefined: unknown): boolean => maybeUndefined !== undefined
