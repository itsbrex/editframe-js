import { FilterAttribute, FilterName } from 'constant'
import { ValidationErrorText } from 'strings'

import { validateFilter } from './'

describe('validateFilter', () => {
  const callerName = 'caller-name'
  const fieldName = 'field-name'

  it('throws the correct error string when an invalid filter `filterName` is provided', () => {
    const filterName = 'fake-filter'

    expect(() => validateFilter(callerName, fieldName, { filterName: filterName as any, options: {} as any })).toThrow(
      new Error(
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          ValidationErrorText.SUB_FIELD(fieldName, FilterAttribute.filterName),
          filterName,
          `${Object.values(FilterName).join(', ')}`
        )
      )
    )
  })

  describe('when a valid filter `filterName` is provided', () => {
    const filterName = FilterName.brightness

    it('throws the correct error string when invalid filter `options` are provided', () => {
      const options = {}

      expect(() => validateFilter(callerName, fieldName, { filterName, options: options as any })).toThrow(
        new Error(
          ValidationErrorText.MUST_BE_TYPE(
            callerName,
            ValidationErrorText.SUB_FIELD(fieldName, FilterAttribute.options),
            options,
            JSON.stringify(options)
          )
        )
      )
    })
  })
})
