import { PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'

import { validatePresenceOf, validateValueIsOfType } from './'

describe('validatePresenceOf', () => {
  it('throws the provided `errorMessage` when the provided `value` does not exist', () => {
    const errorMessage = 'error-message'

    expect(() => validatePresenceOf(undefined, errorMessage)).toThrow(new Error(errorMessage))
  })
})

describe('validateValueIsOfType', () => {
  it('throws an error when the provided `value` does not match the provided `type`', () => {
    const caller = 'caller'
    const fieldName = 'field-name'
    const value = 'invalid-value'
    const type = PrimitiveType.number

    expect(() => validateValueIsOfType(caller, fieldName, value, type)).toThrow(
      new Error(ValidationErrorText.MUST_BE_TYPE(caller, fieldName, value, type))
    )
  })
})
