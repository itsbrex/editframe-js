import { ValidationErrorText } from 'strings'

import { validatePresenceOf } from './'

describe('validatePresenceOf', () => {
  it('returns `undefined` when the provided `value` exists', () => {
    expect(validatePresenceOf('some-value')).toBeUndefined()
  })

  describe('when an `errorMessage` is provided', () => {
    it('returns the provided `errorMessage` when the provided `value` does not exist', () => {
      const errorMessage = 'error-message'

      expect(validatePresenceOf(undefined, errorMessage)).toEqual(errorMessage)
    })
  })

  describe('when no `errorMessage` is provided', () => {
    it('returns a default error message when the provided `value` does not exist', () => {
      expect(validatePresenceOf(undefined)).toEqual(ValidationErrorText.REQUIRED_FIELD)
    })
  })
})
