import { FilterAttribute, FilterName, FilterOptionTypes } from 'constant'
import { ValidationErrorText } from 'strings'

import { isFilterBrightness, isFilterContrast, isFilterFade, isFilterSaturation, validateFilter } from './'

describe('isFilterBrightness', () => {
  it('returns `false` when there are an incorrect number of keys in the options', () => {
    expect(isFilterBrightness({ brightness: 10, notARealKey: 'not-a-real-key' })).toEqual(false)
  })

  it('returns `false` when a `brightness` key is missing', () => {
    expect(isFilterBrightness({ notARealKey: 'not-a-real-key' })).toEqual(false)
  })

  it('returns `false` when the `brightness` value is not a `number`', () => {
    expect(isFilterBrightness({ brightness: 'not-a-number' })).toEqual(false)
  })

  it('returns `true` when the `brightness` value is a `number`', () => {
    expect(isFilterBrightness({ brightness: 1 })).toEqual(true)
  })
})

describe('isFilterContrast', () => {
  it('returns `false` when there are an incorrect number of keys in the options', () => {
    expect(isFilterContrast({ brightness: 10, notARealKey: 'not-a-real-key' })).toEqual(false)
  })

  it('returns `false` when a `contrast` key is missing', () => {
    expect(isFilterContrast({ notARealKey: 'not-a-real-key' })).toEqual(false)
  })

  it('returns `false` when the `contrast` value is not a `number`', () => {
    expect(isFilterContrast({ contrast: 'not-a-number' })).toEqual(false)
  })

  it('returns `true` when the `contrast` value is a `number`', () => {
    expect(isFilterContrast({ contrast: 1 })).toEqual(true)
  })
})

describe('isFilterFade', () => {
  it('returns `false` when there are an incorrect number of keys in the options', () => {
    expect(isFilterFade({ color: '#ffffff', duration: 10, notARealKey: 'not-a-real-key', startTime: 20 })).toEqual(
      false
    )
  })

  it('returns `false` when a `duration` key is missing', () => {
    expect(isFilterFade({ color: '#ffffff', startTime: 20 })).toEqual(false)
  })

  it('returns `false` when the `color` value is not a `string`', () => {
    expect(isFilterFade({ color: 10 })).toEqual(false)
  })

  it('returns `false` when the `duration` value is not a `number`', () => {
    expect(isFilterFade({ duration: 'not-a-number' })).toEqual(false)
  })

  it('returns `false` when the `startTime` value is not a `number`', () => {
    expect(isFilterFade({ startTime: 'not-a-number' })).toEqual(false)
  })

  it('returns `true` when the `color` value is a `string`, the `duation` value is a `number` and the `startTime` value is a `number`', () => {
    expect(isFilterFade({ color: '#ffffff', duration: 10, startTime: 20 })).toEqual(true)
  })
})

describe('isFilterSaturation', () => {
  it('returns `false` when there are an incorrect number of keys in the options', () => {
    expect(isFilterSaturation({ notARealKey: 'not-a-real-key', saturation: 10 })).toEqual(false)
  })

  it('returns `false` when a `saturation` key is missing', () => {
    expect(isFilterSaturation({ notARealKey: 'not-a-real-key' })).toEqual(false)
  })

  it('returns `false` when the `saturation` value is not a `number`', () => {
    expect(isFilterSaturation({ saturation: 'not-a-number' })).toEqual(false)
  })

  it('returns `true` when the `saturation` value is a `number`', () => {
    expect(isFilterSaturation({ saturation: 1 })).toEqual(true)
  })
})

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
        const filterName = FilterName.grayscale

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
