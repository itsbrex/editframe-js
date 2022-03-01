import { PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'

import { validatePresenceOf, validateValueIsOfType } from './'

describe('validatePresenceOf', () => {
  it('returns `undefined` when the provided `value` exists', () => {
    expect(validatePresenceOf({ errorMessage: 'error-message', value: 'some-value' })).toBeUndefined()
  })

  it('returns the provided `errorMessage` when the provided `value` does not exist', () => {
    const errorMessage = 'error-message'

    expect(validatePresenceOf({ errorMessage, value: undefined })).toEqual(errorMessage)
  })
})

describe('validateValueIsOfType', () => {
  it('throws an error when the provided `value` does not match the provided `type`', () => {
    const fieldName = 'field-name'
    const value = 'invalid-value'
    const type = PrimitiveType.number

    expect(() => validateValueIsOfType(fieldName, value, type)).toThrow(
      new Error(ValidationErrorText.MUST_BE_TYPE(fieldName, value, type))
    )
  })
})
