import { AudioKey, AudioMethod, CompositionInterface, LayerKey } from 'constant'
import { mockComposition } from 'mocks'
import * as AudioValidationModule from 'utils/validation/layerConfigs/audio'

import { AudioMixin } from './'

describe('AudioMixin', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let audio: AudioMixin
  let result: AudioMixin | void
  let validateAudioMixinSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    compositionMock = mockComposition({
      setLayerAttribute: jest.fn(),
    })
    validateAudioMixinSpy = jest.spyOn(AudioValidationModule, 'validateAudioMixin')

    audio = new AudioMixin({ composition: compositionMock, id })
    jest.clearAllMocks()
  })

  describe('setVolume', () => {
    it('calls the `validateAudioMixin` function with the correct arguments', () => {
      const newVolume = 5

      audio.setVolume(5)

      expect(validateAudioMixinSpy).toHaveBeenCalledWith(AudioMethod.setVolume, { audio: { volume: newVolume } })
    })

    describe('when the provided value is greater than 1', () => {
      it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
        audio.setVolume(5)

        expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
          childKey: AudioKey.volume,
          id,
          layerKey: LayerKey.audio,
          value: 1,
        })
      })
    })

    describe('when the provided value is less than 0', () => {
      it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
        audio.setVolume(-1)

        expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
          childKey: AudioKey.volume,
          id,
          layerKey: LayerKey.audio,
          value: 0,
        })
      })
    })

    it('returns the `AudioMixin` instance', () => {
      result = audio.setVolume(1)

      expect(result).toBeInstanceOf(AudioMixin)
    })
  })

  describe('setMuted', () => {
    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      audio.setMuted()

      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: AudioKey.volume,
        id,
        layerKey: LayerKey.audio,
        value: 0,
      })
    })

    it('returns the `AudioMixin` instance', () => {
      result = audio.setMuted()

      expect(result).toBeInstanceOf(AudioMixin)
    })
  })
})
