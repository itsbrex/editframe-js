import { CompositionInterface, FilterName, IdentifiedLayer, LayerAttribute } from 'constant'
import { mockComposition } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as FilterUtilsModule from 'utils/video/filters'

import { Video } from './'

describe('Video', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let video: Video
  let validateFilterSpy: jest.SpyInstance
  let validatePresenceOfSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateFilterSpy = jest.spyOn(FilterUtilsModule, 'validateFilter')
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    video = new Video({ composition: compositionMock, id })
  })

  describe('setDimensions', () => {
    const height = 10
    const width = 20

    beforeEach(() => {
      video.setDimensions({ height, width })
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(
        height,
        ValidationErrorText.REQUIRED_FIELD(LayerAttribute.height)
      )
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(
        width,
        ValidationErrorText.REQUIRED_FIELD(LayerAttribute.width)
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.height, height)
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.width, width)
    })
  })

  describe('setFilter', () => {
    const filterName = FilterName.brightness
    const options = { brightness: 10 }
    const filter = { filterName, options }

    beforeEach(() => {
      video.setFilter(filter)
    })

    it('calls the `validateFilter` function with the correct arguments', () => {
      expect(validateFilterSpy).toHaveBeenCalledWith(filterName, options)
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.filter, filter)
    })
  })
})
