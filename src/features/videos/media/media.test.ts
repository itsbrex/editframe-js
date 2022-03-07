import { CompositionInterface, IdentifiedLayer, LayerAttribute, MediaMethod, PrimitiveType } from 'constant'
import { mockComposition } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { Media } from './'

describe('Media', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let media: Media
  let validatePresenceOfSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    media = new Media({ composition: compositionMock, id })
  })

  describe('setTrim', () => {
    const start = 10
    const end = 20

    beforeEach(() => {
      media.setTrim({ start })
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(
        start,
        ValidationErrorText.REQUIRED_FIELD(LayerAttribute.start)
      )
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        MediaMethod.setTrim,
        LayerAttribute.start,
        start,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
      expect(compositionMock.updateLayerAttribute).not.toHaveBeenCalledWith(id, LayerAttribute.end)
    })

    describe('when an `end` argument is provided', () => {
      beforeEach(() => {
        media.setTrim({ end, start })
      })

      it('calls the `validateValueIsOfType` function with the correct arguments', () => {
        expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
          MediaMethod.setTrim,
          LayerAttribute.end,
          end,
          PrimitiveType.number,
          true
        )
      })

      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.end, end)
      })
    })
  })
})
