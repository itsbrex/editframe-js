import { LayerKey, PrimitiveType, SubtitlesKey } from 'constant'
import { mockSubtitlesLayer } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as LayerConfigValidationUtilsModule from 'utils/validation/layerConfigs'
import * as SubtitlesValidationUtilsModule from 'utils/validation/layers/subtitles'

import { validateSubtitles, validateSubtitlesLayer } from './'

describe('validateSubtitles', () => {
  const layer = mockSubtitlesLayer()
  const callerName = 'caller-name'
  let validateValueIsOfTypeSpy: jest.SpyInstance

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    const finalErrors = validateSubtitles({ callerName, layer })
    const {
      subtitles: { backgroundColor, color, fontSize },
    } = layer

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(3)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.subtitles, SubtitlesKey.backgroundColor),
      backgroundColor,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.subtitles, SubtitlesKey.color),
      color,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.subtitles, SubtitlesKey.fontSize),
      fontSize,
      PrimitiveType.number
    )

    expect(finalErrors).toEqual([])
  })
})

describe('validateSubtitlesLayer', () => {
  const callerName = 'caller-name'
  const layer = mockSubtitlesLayer()
  let validateSubtitlesSpy: jest.SpyInstance
  let validatePositionSpy: jest.SpyInstance
  let validateTimelineSpy: jest.SpyInstance
  let validateTrimSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateSubtitlesSpy = jest.spyOn(SubtitlesValidationUtilsModule, 'validateSubtitles')
    validatePositionSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validatePosition')
    validateTimelineSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTimeline')
    validateTrimSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTrim')

    validateSubtitlesLayer(callerName, layer)
  })

  it('calls the `validateSubtitles` function with the correct arguments', () => {
    expect(validateSubtitlesSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validatePosition` function with the correct arguments', () => {
    expect(validatePositionSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTimeline` function with the correct arguments', () => {
    expect(validateTimelineSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTrim` function with the correct arguments', () => {
    expect(validateTrimSpy).toHaveBeenCalledWith({ callerName, layer })
  })
})
