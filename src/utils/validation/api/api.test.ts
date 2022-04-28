import { ApiDataValidator } from 'constant'

import { validateApiData } from './'

describe('validateApiData', () => {
  enum DataTypeKey {
    field = 'field',
  }

  interface DataType {
    field: string
  }

  const invalidDataError = 'error'
  const validate = (data: any): data is DataType => DataTypeKey.field in data
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
