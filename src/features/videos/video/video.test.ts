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

  describe('setTrim', () => {
    const start = 10
    const end = 20

    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
      })

      it('throws an error', () => {
        expect(() => video.setTrim({ end })).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      video.setTrim({ start })

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
      expect(compositionMock.updateLayerAttribute).not.toHaveBeenCalledWith(id, LayerAttribute.end)
    })

    describe('when an `end` argument is provided', () => {
      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        video.setTrim({ end, start })

        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.end, end)
      })
    })
  })

  describe('setVolume', () => {
    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
      })

      it('throws an error', () => {
        expect(() => video.setVolume(undefined)).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      const volume = 0.5

      video.setVolume(volume)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.volume, volume)
    })

    describe('when the provided value is greater than 1', () => {
      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        video.setVolume(2)

        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.volume, 1)
      })
    })

    describe('when the provided value is less than 0', () => {
      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        video.setVolume(-1)

        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.volume, 0)
      })
    })
  })

  describe('setMuted', () => {
    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      video.setMuted()

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.volume, 0)
    })
  })
})
