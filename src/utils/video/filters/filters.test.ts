import { FilterAttribute, FilterName, FilterOptionTypes } from 'constant'
import { ValidationErrorText } from 'strings'

import { validateFilter } from './'

describe('validateFilter', () => {
  const callerName = 'caller-name'
  const fieldName = 'field-name'
  const options = {}

  describe('when the `shouldThrow` argument evaluates to `true`', () => {
    it('throws the correct error string when an invalid filter `filterName` is provided', () => {
      const filterName = 'fake-filter'

      expect(() =>
        validateFilter(callerName, fieldName, { filterName: filterName as any, options: options as any }, true)
      ).toThrow(
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

      it('throws the correct error string when no filter `options` are provided', () => {
        expect(() => validateFilter(callerName, fieldName, { filterName, options: undefined }, true)).toThrow(
          new Error(
            ValidationErrorText.MUST_BE_TYPE(
              callerName,
              ValidationErrorText.SUB_FIELD(fieldName, FilterAttribute.options),
              undefined,
              JSON.stringify(FilterOptionTypes[filterName])
            )
          )
        )
      })

      it('throws the correct error string when invalid filter `options` are provided', () => {
        expect(() => validateFilter(callerName, fieldName, { filterName, options: options as any }, true)).toThrow(
          new Error(
            ValidationErrorText.MUST_BE_TYPE(
              callerName,
              ValidationErrorText.SUB_FIELD(fieldName, FilterAttribute.options),
              options,
              JSON.stringify(FilterOptionTypes[filterName])
            )
          )
        )
      })

      it('does not throw an error when no options are passed for a filter that does not require options', () => {
        const filterName = FilterName.fadeOut

        expect(() => validateFilter(callerName, fieldName, { filterName, options: undefined }, true)).not.toThrow()
      })
    })
  })

  it('returns the correct error string when an invalid filter `filterName` is provided', () => {
    const filterName = 'fake-filter'

    expect(validateFilter(callerName, fieldName, { filterName: filterName as any, options: options as any })).toEqual([
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        ValidationErrorText.SUB_FIELD(fieldName, FilterAttribute.filterName),
        filterName,
        `${Object.values(FilterName).join(', ')}`
      ),
    ])
  })
})
