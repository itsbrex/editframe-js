import { CompositionInterface, FilterMethod, FilterName, IdentifiedLayer, LayerAttribute } from 'constant'
import { mockComposition } from 'mocks'
import * as ValidateFilterModule from 'utils/video/filters'

import { Filter } from './'

describe('Filter', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  const filterName = FilterName.brightness
  const filterOptions = { brightness: 10 }
  let compositionMock: CompositionInterface
  let filter: Filter
  let validateFilterSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateFilterSpy = jest.spyOn(ValidateFilterModule, 'validateFilter')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })
    filter = new Filter({ composition: compositionMock, id })
  })

  describe('setFilter', () => {
    beforeEach(() => {
      filter.setFilter({ filterName, options: filterOptions })
    })

    it('calls `validateFilter` with the correct arguments', () => {
      expect(validateFilterSpy).toHaveBeenCalledWith(
        FilterMethod.setFilter,
        LayerAttribute.filter,
        {
          filterName,
          options: filterOptions,
        },
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.filter, {
        filterName,
        options: filterOptions,
      })
    })
  })
})
