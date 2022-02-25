import { CompositionInterface, FilterName, Layer, LayerAttribute } from 'constant'
import { mockComposition } from 'mocks'
import * as FilterUtilsModule from 'utils/filters'
import * as ValidationUtilsModule from 'utils/validation'

import { Video } from './'

describe('Video', () => {
  const error = 'error'
  const id = 'id'
  const layers: Layer[] = []
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

  it('sets the `id` property to the value passed into the constructor', () => {
    expect(video.id).toEqual(id)
  })

  describe('setDimensions', () => {
    const height = 10
    const width = 20

    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
      })

      it('throws an error', () => {
        expect(() => video.setDimensions({ height })).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      video.setDimensions({ height, width })

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.height, height)
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.width, width)
    })
  })

  describe('setFilter', () => {
    const filterName = FilterName.brightness
    const options = { brightness: 10 }
    const filter = { filterName, options }

    describe('when `validateFilter` returns an error', () => {
      beforeEach(() => {
        validateFilterSpy.mockReturnValue(error)
      })

      it('throws an error', () => {
        expect(() => video.setFilter(filter)).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      video.setFilter(filter)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.filter, filter)
    })
  })
})
