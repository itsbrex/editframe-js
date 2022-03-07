import colors from 'colors/safe'

import { PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'

import { validatePresenceOf, validateValueIsOfType, withValidation } from './'

describe('validatePresenceOf', () => {
  it('throws the provided `errorMessage` when the provided `value` does not exist', () => {
    const errorMessage = 'error-message'

    expect(() => validatePresenceOf(undefined, errorMessage)).toThrow(new Error(errorMessage))
  })
})

describe('validateValueIsOfType', () => {
  describe('when the provided `shouldThrow` argument evaluates to `true`', () => {
    it('throws an error when the provided `value` does not match the provided `type`', () => {
      const caller = 'caller'
      const fieldName = 'field-name'
      const value = 'invalid-value'
      const type = PrimitiveType.number

      expect(() => validateValueIsOfType(caller, fieldName, value, type, true)).toThrow(
        new Error(ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, type))
      )
    })
  })

  it('returns an error when the provided `value` does not match the provided `type`', () => {
    const caller = 'caller'
    const fieldName = 'field-name'
    const value = 'invalid-value'
    const type = PrimitiveType.number

    expect(validateValueIsOfType(caller, fieldName, value, type)).toEqual(
      ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, type)
    )
  })
})

describe('withValidation', () => {
  let validator: jest.Mock
  let callback: jest.Mock
  let consoleErrorSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validator = jest.fn()
    callback = jest.fn()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
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
    it('logs the error to the console', () => {
      const error = new TypeError('error')

      validator.mockImplementation(() => {
        throw error
      })

      withValidation(validator, callback)

      expect(consoleErrorSpy).toHaveBeenCalledWith(colors.yellow(error.stack))
    })
  })

  describe('when the callback function throws an error', () => {
    it('logs the error to the console', () => {
      const error = new Error('error')

      callback.mockImplementation(() => {
        throw error
      })

      withValidation(validator, callback)

      expect(consoleErrorSpy).toHaveBeenCalledWith(colors.yellow(error.stack))
    })
  })
})
