import { LayerKey, PrimitiveType } from 'constant'
import { mockLottieLayer, mockLottieOptions } from 'mocks'
import * as ValidationUtilsModule from 'utils/validation'
import * as LayerConfigValidationUtilsModule from 'utils/validation/layerConfigs'
import * as LottieValidationUtilsModule from 'utils/validation/layers/lottie'

import { validateLottie, validateLottieLayer } from './'

describe('validateLottie', () => {
  const callerName = 'caller-name'
  const lottie = mockLottieOptions()
  let validateValueIsOfTypeSpy: jest.SpyInstance

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    const finalErrors = validateLottie({ callerName, layer: { lottie } })

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(1)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(callerName, LayerKey.lottie, lottie, PrimitiveType.object)

    expect(finalErrors).toEqual([])
  })
})

describe('validateLottieLayer', () => {
  const callerName = 'caller-name'
  const layer = mockLottieLayer()
  let validateLottieSpy: jest.SpyInstance
  let validatePositionSpy: jest.SpyInstance
  let validateSizeSpy: jest.SpyInstance
  let validateTimelineSpy: jest.SpyInstance
  let validateTrimSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateLottieSpy = jest.spyOn(LottieValidationUtilsModule, 'validateLottie')
    validateTimelineSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validatePosition')
    validatePositionSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateSize')
    validateSizeSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTimeline')
    validateTrimSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTrim')

    validateLottieLayer(callerName, layer)
  })

  it('calls the `validateLottie` function with the correct arguments', () => {
    expect(validateLottieSpy).toHaveBeenCalledWith({ callerName, layer })
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
