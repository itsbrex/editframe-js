import { FilterMethod, FilterName } from 'constant'
import { Videos } from 'features'
import { Composition } from 'features/videos/composition'
import { mockApi } from 'mocks'
import * as FilterValidationUtilsModule from 'utils/validation/layers/filter'

import { Filter } from './'

describe('Filter', () => {
  const host = 'host'
  const initialName = FilterName.brightness
  const initialOptions = { brightness: 10 }
  let composition: Composition
  let filter: Filter
  let result: Filter | void
  let validateFilterLayerSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    const api = mockApi({ get: jest.fn(), post: jest.fn(), put: jest.fn() })

    composition = new Composition({
      api,
      formData: { append: jest.fn() },
      host,
      options: { dimensions: { height: 1080, width: 1920 }, duration: 10 },
      videos: new Videos({ api, host }),
    })
    validateFilterLayerSpy = jest.spyOn(FilterValidationUtilsModule, 'validateFilterLayer')
    filter = composition.addFilter({ name: initialName, options: initialOptions })

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct options', () => {
      expect(filter.name).toEqual(initialName)
      expect(filter.options).toEqual(initialOptions)
    })
  })

  describe('setFilter', () => {
    const newName = FilterName.contrast
    const newOptions = { contrast: 10 }

    beforeEach(() => {
      result = filter.setFilter({ name: newName, options: newOptions })
    })

    it('calls `validateFilterLayer` with the correct arguments', () => {
      expect(validateFilterLayerSpy).toHaveBeenCalledWith(FilterMethod.setFilter, {
        filter: {
          name: newName,
          options: newOptions,
        },
      })
    })

    it('sets the filter `name` and `options` to the correct values', () => {
      expect(filter.name).toEqual(newName)
      expect(filter.options).toEqual(newOptions)
    })

    it('returns the `Filter` instance', () => {
      expect(result).toBeInstanceOf(Filter)
    })
  })
})
