import { AudioMethod, CompositionInterface, IdentifiedLayer, LayerAttribute, PrimitiveType } from 'constant'
import { mockComposition } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { Audio } from './'

describe('Audio', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let audio: Audio
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

    audio = new Audio({ composition: compositionMock, id })
  })

  describe('setVolume', () => {
    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      const volume = 1

      audio.setVolume(volume)

      expect(validatePresenceOfSpy).toHaveBeenCalledWith(
        volume,
        ValidationErrorText.REQUIRED_FIELD(LayerAttribute.volume)
      )
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      const volume = 5

      audio.setVolume(volume)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        AudioMethod.setVolume,
        LayerAttribute.volume,
        volume,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      const volume = 0.5

      audio.setVolume(volume)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.volume, volume)
    })

    describe('when the provided value is greater than 1', () => {
      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        audio.setVolume(2)

        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.volume, 1)
      })
    })

    describe('when the provided value is less than 0', () => {
      it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
        audio.setVolume(-1)

        expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.volume, 0)
      })
    })
  })

  describe('setMuted', () => {
    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      audio.setMuted()

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.volume, 0)
    })
  })
})
