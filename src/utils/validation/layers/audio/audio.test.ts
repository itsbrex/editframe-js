import { mockAudioLayer } from 'mocks'
import * as LayerConfigValidationUtilsModule from 'utils/validation/layerConfigs'

import { validateAudioLayer } from './'

describe('validateAudioLayer', () => {
  const callerName = 'caller-name'
  const layer = mockAudioLayer()
  let validateAudioSpy: jest.SpyInstance
  let validateTimelineSpy: jest.SpyInstance
  let validateTrimSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateAudioSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateAudio')
    validateTimelineSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTimeline')
    validateTrimSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTrim')

    validateAudioLayer(callerName, layer)
  })

  it('calls the `validateAudioSpy` function with the correct arguments', () => {
    expect(validateAudioSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTimeline` function with the correct arguments', () => {
    expect(validateTimelineSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTrim` function with the correct arguments', () => {
    expect(validateTrimSpy).toHaveBeenCalledWith({ callerName, layer })
  })
})
