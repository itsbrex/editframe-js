import { CompositionInterface, Layer, LayerAttribute } from 'constant'
import { mockComposition } from 'mocks'
import * as ValidationUtilsModule from 'utils/validation'

import { Media } from './'

describe('Media', () => {
  const error = 'error'
  const id = 'id'
  const layers: Layer[] = []
  let compositionMock: CompositionInterface
  let media: Media
  let validatePresenceOfSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    media = new Media({ composition: compositionMock, id })
  })

  it('sets the `id` property to the value passed into the constructor', () => {
    expect(media.id).toEqual(id)
  })

  describe('setTrim', () => {
    const start = 10
    const end = 20

    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
      })

      it('throws an error', () => {
        expect(() => media.setTrim({ end })).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      media.setTrim({ start })

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
      expect(compositionMock.updateLayerAttribute).not.toHaveBeenCalledWith(id, LayerAttribute.end)
    })

    describe('when an `end` argument is provided', () => {
      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        media.setTrim({ end, start })

        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.end, end)
      })
    })
  })
})
