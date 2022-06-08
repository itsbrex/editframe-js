import chalk from 'chalk'

import { PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'
import * as ProcessUtilsModule from 'utils/process'

import {
  assertType,
  validateOptions,
  validatePresenceOf,
  validateValueIsInList,
  validateValueIsOfType,
  validateValueIsOfTypes,
  withValidation,
  withValidationAsync,
} from './'

describe('assertType', () => {
  describe('when provided a single type', () => {
    it('returns `true` if the provided `value` matches the provided `type`', () => {
      expect(assertType('string', PrimitiveType.string)).toEqual(true)
    })

    it('returns `false` if the provided `value` does not match the provided `type`', () => {
      expect(assertType('string', PrimitiveType.number)).toEqual(false)
    })
  })

  describe('when provided a list of types', () => {
    it('returns `true` if the provided `value` matches one of the provided `types`', () => {
      expect(assertType('string', [PrimitiveType.string, PrimitiveType.undefined])).toEqual(true)
      expect(assertType(undefined, [PrimitiveType.string, PrimitiveType.undefined])).toEqual(true)
    })

    it('returns `false` if the provided `value` does not match one of the provided `types`', () => {
      expect(assertType('string', [PrimitiveType.number, undefined])).toEqual(false)
    })
  })
})

describe('validateOptions', () => {
  enum OptionKey {
    validKey = 'validKey',
  }

  const callerName = 'caller-name'
  const options = { invalidKey: 'invalid-key-value' }

  it('throws an error if invalid keys are provided', () => {
    expect(() => validateOptions(callerName, OptionKey, options)).toThrow(
      new Error(
        ValidationErrorText.INVALID_OPTIONS(
          callerName,
          Object.keys(OptionKey).join(', '),
          Object.keys(options).join(', ')
        )
      )
    )
  })
})

describe('validatePresenceOf', () => {
  it('throws the provided `errorMessage` when the provided `value` does not exist', () => {
    const errorMessage = 'error-message'

    expect(() => validatePresenceOf(undefined, errorMessage)).toThrow(new Error(errorMessage))
  })
})

describe('validateValueIsOfType', () => {
  const caller = 'caller'
  const fieldName = 'field-name'
  const value = 'invalid-value'
  const type = PrimitiveType.number

  describe('when the provided `shouldThrow` argument evaluates to `true`', () => {
    it('throws an error when the provided `value` does not match the provided `type`', () => {
      expect(() => validateValueIsOfType(caller, fieldName, value, type, true)).toThrow(
        new Error(ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, type))
      )
    })
  })

  it('returns an error when the provided `value` does not match the provided `type`', () => {
    expect(validateValueIsOfType(caller, fieldName, value, type)).toEqual(
      ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, type)
    )
  })
})

describe('validateValueIsOfTypes', () => {
  const caller = 'caller'
  const fieldName = 'field-name'
  const value = 'invalid-value'
  const types = [PrimitiveType.number, PrimitiveType.object]

  describe('when the provided `shouldThrow` argument evaluates to `true`', () => {
    it('throws an error when the provided `value` does not match the provided `types`', () => {
      expect(() => validateValueIsOfTypes(caller, fieldName, value, types, true)).toThrow(
        new Error(ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, ValidationErrorText.OR(types)))
      )
    })
  })

  it('returns an error when the provided `value` does not match the provided `types`', () => {
    expect(validateValueIsOfTypes(caller, fieldName, value, types)).toEqual(
      ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, ValidationErrorText.OR(types))
    )
  })
})

describe('validateValueIsInList', () => {
  const caller = 'caller'
  const fieldName = 'field-name'
  const value = 'invalid-value'
  const types = ['valid-value']

  describe('when the provided `shouldThrow` argument evaluates to `true`', () => {
    it('throws an error when the provided `value` is not in the provided `types`', () => {
      expect(() => validateValueIsInList(caller, fieldName, value, types, true)).toThrow(
        new Error(
          ValidationErrorText.MUST_BE_TYPE(
            caller,
            fieldName,
            value,
            ValidationErrorText.OR(types.map((type) => type.toString()))
          )
        )
      )
    })
  })

  it('returns an error when the provided `value` does not match the provided `type`', () => {
    expect(validateValueIsInList(caller, fieldName, value, types)).toEqual(
      ValidationErrorText.MUST_BE_TYPE(
        caller,
        fieldName,
        value,
        ValidationErrorText.OR(types.map((type) => type.toString()))
      )
    )
  })
})

describe('withValidation', () => {
  const typeError = new TypeError('error')
  const error = new Error('error')
  let validator: jest.Mock
  let callback: jest.Mock
  let consoleErrorSpy: jest.SpyInstance
  let exitProcessSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validator = jest.fn()
    callback = jest.fn()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    exitProcessSpy = jest.spyOn(ProcessUtilsModule, 'exitProcess').mockImplementation(() => {})
    withValidation(validator, callback)
  })

  it('calls the provided `validation` function', () => {
    withValidation(validator, callback)

    expect(validator).toHaveBeenCalledWith()
  })

  it('calls the provided `callback` function', () => {
    withValidation(validator, callback)

    expect(callback).toHaveBeenCalledWith()
  })

  describe('when the validator function throws an error', () => {
    beforeEach(() => {
      validator.mockImplementation(() => {
        throw typeError
      })
      withValidation(validator, callback)
    })

    it('logs the error to the console', () => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(chalk.yellow(typeError.stack))
    })

    it('exits the process', () => {
      expect(exitProcessSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the callback function throws an error', () => {
    beforeEach(() => {
      callback.mockImplementation(() => {
        throw error
      })

      withValidation(validator, callback)
    })

    it('logs the error to the console', () => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(chalk.yellow(error.stack))
    })

    it('exits the process', () => {
      expect(exitProcessSpy).toHaveBeenCalledTimes(1)
    })
  })
})

describe('withValidationAsync', () => {
  const typeError = new TypeError('error')
  const error = new Error('error')
  let validator: jest.Mock
  let callback: jest.Mock
  let consoleErrorSpy: jest.SpyInstance
  let exitProcessSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(async () => {
    validator = jest.fn()
    callback = jest.fn()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    exitProcessSpy = jest.spyOn(ProcessUtilsModule, 'exitProcess').mockImplementation(() => {})
    await withValidationAsync(validator, callback)
  })

  it('calls the provided `validation` function', () => {
    withValidation(validator, callback)

    expect(validator).toHaveBeenCalledWith()
  })

  it('calls the provided `callback` function', () => {
    withValidation(validator, callback)

    expect(callback).toHaveBeenCalledWith()
  })

  describe('when the validator function throws an error', () => {
    beforeEach(async () => {
      validator.mockImplementation(() => {
        throw typeError
      })

      await withValidationAsync(validator, callback)
    })
    it('logs the error to the console', () => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(chalk.yellow(typeError.stack))
    })

    it('exits the process', () => {
      expect(exitProcessSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the callback function throws an error', () => {
    beforeEach(async () => {
      callback.mockImplementation(() => {
        throw error
      })

      await withValidationAsync(validator, callback)
    })

    it('logs the error to the console', () => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(chalk.yellow(error.stack))
    })

    it('exits the process', () => {
      expect(exitProcessSpy).toHaveBeenCalledTimes(1)
    })
  })
})
