import { FilterKey, FilterName, FilterOptionTypes, LayerKey } from 'constant'
import { mockFilterLayer } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as FilterValidationUtilsModule from 'utils/validation/layers/filter'

import { isFilterBrightness, isFilterContrast, isFilterSaturation, validateFilter, validateFilterLayer } from './'

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
  const options = {}

  it('returns the correct errors when an invalid filter `name` is provided', () => {
    const name = 'fake-filter'

    expect(validateFilter({ callerName, layer: { filter: { name: name as any, options: options as any } } })).toEqual([
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerKey.filter, FilterKey.name),
        name,
        `${Object.values(FilterName).join(', ')}`
      ),
    ])
  })

  describe('when a valid filter `name` is provided', () => {
    const name = FilterName.brightness

    it('returns the correct errors when no filter `options` are provided', () => {
      expect(validateFilter({ callerName, layer: { filter: { name, options: undefined } } })).toEqual([
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          ValidationErrorText.SUB_FIELD(LayerKey.filter, FilterKey.options),
          undefined,
          JSON.stringify(FilterOptionTypes[name])
        ),
      ])
    })

    it('returns the correct errors when invalid filter `options` are provided', () => {
      expect(validateFilter({ callerName, layer: { filter: { name, options: options as any } } })).toEqual([
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          ValidationErrorText.SUB_FIELD(LayerKey.filter, FilterKey.options),
          options,
          JSON.stringify(FilterOptionTypes[name])
        ),
      ])
    })

    it('does not return an error message when no options are passed for a filter that does not require options', () => {
      const name = FilterName.grayscale

      expect(validateFilter({ callerName, layer: { filter: { name, options: undefined } } })).toEqual([])
    })
  })
})

describe('validateFilterLayer', () => {
  const callerName = 'caller-name'
  const layer = mockFilterLayer()
  let validateFilterSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateFilterSpy = jest.spyOn(FilterValidationUtilsModule, 'validateFilter')

    validateFilterLayer(callerName, layer)
  })

  it('calls the `validateFilter` function with the correct arguments', () => {
    expect(validateFilterSpy).toHaveBeenCalledWith({ callerName, layer })
  })
})
