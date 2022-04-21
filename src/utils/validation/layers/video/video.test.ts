import { mockVideoLayer } from 'mocks'
import * as LayerConfigValidationUtilsModule from 'utils/validation/layerConfigs'

import { validateVideoLayer } from './'

describe('validateVideoLayer', () => {
  const callerName = 'caller-name'
  const layer = mockVideoLayer()
  let validateAudioSpy: jest.SpyInstance
  let validateBackgroundSpy: jest.SpyInstance
  let validatePositionSpy: jest.SpyInstance
  let validateSizeSpy: jest.SpyInstance
  let validateTimelineSpy: jest.SpyInstance
  let validateTrimSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateAudioSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateAudio')
    validateBackgroundSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateBackground')
    validatePositionSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validatePosition')
    validateSizeSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateSize')
    validateTimelineSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTimeline')
    validateTrimSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTrim')

    validateVideoLayer(callerName, layer)
  })

  it('calls the `validateAudio` function with the correct arguments', () => {
    expect(validateAudioSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateBackground` function with the correct arguments', () => {
    expect(validateBackgroundSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validatePosition` function with the correct arguments', () => {
    expect(validatePositionSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateSize` function with the correct arguments', () => {
    expect(validateSizeSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTimeline` function with the correct arguments', () => {
    expect(validateTimelineSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTrim` function with the correct arguments', () => {
    expect(validateTrimSpy).toHaveBeenCalledWith({ callerName, layer })
  })
})
