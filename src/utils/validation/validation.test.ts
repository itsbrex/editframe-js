import { validatePresenceOf } from './'

describe('validatePresenceOf', () => {
  it('returns `undefined` when the provided `value` exists', () => {
    expect(validatePresenceOf({ errorMessage: 'error-message', value: 'some-value' })).toBeUndefined()
  })

  it('returns the provided `errorMessage` when the provided `value` does not exist', () => {
    const errorMessage = 'error-message'

    expect(validatePresenceOf({ errorMessage, value: undefined })).toEqual(errorMessage)
  })
})
