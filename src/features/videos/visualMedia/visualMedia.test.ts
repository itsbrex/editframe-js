import { CompositionInterface, FilterName, LayerAttribute, PrimitiveType, VisualMediaMethod } from 'constant'
import { mockComposition } from 'mocks'
import * as ValidationUtilsModule from 'utils/validation'
import * as FilterUtilsModule from 'utils/video/filters'

import { VisualMedia } from './'

describe('VisualMedia', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let visualMedia: VisualMedia
  let validateFilterSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateFilterSpy = jest.spyOn(FilterUtilsModule, 'validateFilter')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    compositionMock = mockComposition({
      updateLayerAttribute: jest.fn(),
    })

    visualMedia = new VisualMedia({ composition: compositionMock, id })
  })

  describe('setBackgroundColor', () => {
    const backgroundColor = 'background-color'

    beforeEach(() => {
      visualMedia.setBackgroundColor(backgroundColor)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setBackgroundColor,
        LayerAttribute.backgroundColor,
        backgroundColor,
        PrimitiveType.string,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(
        id,
        LayerAttribute.backgroundColor,
        backgroundColor
      )
    })
  })

  describe('setFilter', () => {
    const filterName = FilterName.brightness
    const options = { brightness: 10 }
    const filter = { filterName, options }

    beforeEach(() => {
      visualMedia.setFilter(filter)
    })

    it('calls the `validateFilter` function with the correct arguments', () => {
      expect(validateFilterSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setFilter,
        LayerAttribute.filter,
        {
          filterName,
          options,
        },
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.filter, filter)
    })
  })
})
