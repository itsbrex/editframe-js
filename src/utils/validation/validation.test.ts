import { ApiDataValidator } from 'constant'

import { validateApiData, validatePresenceOf } from './'

describe('validateApiData', () => {
  enum DataTypeAttributes {
    field = 'field',
  }

  interface DataType {
    field: string
  }

  const invalidDataError = 'error'
  const validate = (data: any): data is DataType => DataTypeAttributes.field in data
  const validator: ApiDataValidator<DataType> = {
    invalidDataError,
    validate,
  }

  describe('when the provided data is malformed', () => {
    it('throws the provided error', () => {
      expect(() => validateApiData<DataType>({}, validator)).toThrow(new Error(invalidDataError))
    })
  })

  it('returns the provided data', () => {
    const validData = { field: 'value' }

    expect(validateApiData<DataType>(validData, validator)).toEqual(validData)
  })
})

describe('validatePresenceOf', () => {
  it('returns `undefined` when the provided `value` exists', () => {
    expect(validatePresenceOf({ errorMessage: 'error-message', value: 'some-value' })).toBeUndefined()
  })

  it('returns the provided `errorMessage` when the provided `value` does not exist', () => {
    const errorMessage = 'error-message'

    expect(validatePresenceOf({ errorMessage, value: undefined })).toEqual(errorMessage)
  })
})
