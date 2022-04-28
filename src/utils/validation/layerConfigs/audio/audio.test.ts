import { AudioKey, AudioMethod, LayerKey, PrimitiveType } from 'constant'
import { mockAudioOptions } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { validateAudio, validateAudioMixin } from './'

describe('validateAudio', () => {
  const callerName = 'caller-name'
  const volume = 1
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

    validateAudio({ callerName, layer: { audio: { volume } } })
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(1)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.audio, AudioKey.volume),
      volume,
      PrimitiveType.number
    )
  })
})

describe('validateAudioMixin', () => {
  const callerName = AudioMethod.setVolume
  const audio = mockAudioOptions()
  const layer = { audio }
  let validateLayerSpy: jest.SpyInstance

  beforeEach(() => {
    validateLayerSpy = jest.spyOn(ValidationUtilsModule, 'validateLayer')
  })

  it('calls the `validateLayer` function with the correct arguments', () => {
    validateAudioMixin(callerName, { audio })

    expect(validateLayerSpy).toHaveBeenCalledWith([validateAudio], callerName, layer)
  })
})
