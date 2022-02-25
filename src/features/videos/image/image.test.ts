import { CompositionInterface, FilterName, Layer, LayerAttribute } from 'constant'
import { mockComposition } from 'mocks'
import * as FilterUtilsModule from 'utils/filters'
import * as ValidationUtilsModule from 'utils/validation'

import { Image } from './'

describe('Image', () => {
  const error = 'error'
  const id = 'id'
  const layers: Layer[] = []
  let compositionMock: CompositionInterface
  let image: Image
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

    image = new Image({ composition: compositionMock, id })
  })

  it('sets the `id` property to the value passed into the constructor', () => {
    expect(image.id).toEqual(id)
  })

  describe('setDimensions', () => {
    const height = 10
    const width = 20

    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
      })

      it('throws an error', () => {
        expect(() => image.setDimensions({ height })).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      image.setDimensions({ height, width })

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
        expect(() => image.setFilter(filter)).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      image.setFilter(filter)

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
        expect(() => image.setTrim({ end })).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      image.setTrim({ start })

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
      expect(compositionMock.updateLayerAttribute).not.toHaveBeenCalledWith(id, LayerAttribute.end)
    })

    describe('when an `end` argument is provided', () => {
      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        image.setTrim({ end, start })

        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.end, end)
      })
    })
  })
})
