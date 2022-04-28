import { LayerKey, PrimitiveType, WaveformKey, WaveformStyleValue } from 'constant'
import { mockWaveformLayer } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as LayerConfigValidationUtilsModule from 'utils/validation/layerConfigs'
import * as WaveformValidationUtilsModule from 'utils/validation/layers/waveform'

import { validateWaveform, validateWaveformLayer } from './'

describe('validateWaveform', () => {
  const layer = mockWaveformLayer()
  const callerName = 'caller-name'
  let validateValueIsInListSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  beforeEach(() => {
    validateValueIsInListSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsInList')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    validateWaveform({ callerName, layer })

    const {
      waveform: { backgroundColor, color },
    } = layer

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(2)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.waveform, WaveformKey.backgroundColor),
      backgroundColor,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.waveform, WaveformKey.color),
      color,
      PrimitiveType.string
    )
  })

  it('calls the `validateValueIsInList` function with the correct arguments', () => {
    validateWaveform({ callerName, layer })
    const {
      waveform: { style },
    } = layer

    expect(validateValueIsInListSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.waveform, WaveformKey.style),
      style,
      Object.values(WaveformStyleValue)
    )
  })
})

describe('validateWaveformLayer', () => {
  const callerName = 'caller-name'
  const layer = mockWaveformLayer()
  let validateTimelineSpy: jest.SpyInstance
  let validateWaveformSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateTimelineSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTimeline')
    validateWaveformSpy = jest.spyOn(WaveformValidationUtilsModule, 'validateWaveform')

    validateWaveformLayer(callerName, layer)
  })

  it('calls the `validateTimeline` function with the correct arguments', () => {
    expect(validateTimelineSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateWaveform` function with the correct arguments', () => {
    expect(validateWaveformSpy).toHaveBeenCalledWith({ callerName, layer })
  })
})
