import { Color, LayerKey, PrimitiveType, TextAlignmentValue, TextKey } from 'constant'
import { mockTextLayer } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as LayerConfigValidationUtilsModule from 'utils/validation/layerConfigs'
import { validateText, validateTextAlignment, validateTextLayer } from 'utils/validation/layers/text'
import * as TextValidationUtilsModule from 'utils/validation/layers/text'

describe('validateTextAlignment', () => {
  const textAlign = 'invalid-text-alignment'
  const callerName = 'caller-name'

  it('returns an error if the provided `textAlign` is invalid', () => {
    expect(validateTextAlignment(callerName, textAlign as any)).toEqual(
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.textAlign),
        textAlign,
        Object.values(TextAlignmentValue).join(', ')
      )
    )
  })
})

describe('validateText', () => {
  const color = Color.black
  const fontFamily = 'font-family'
  const fontSize = 10
  const maxFontSize = 20
  const maxHeight = 30
  const maxWidth = 40
  const text = 'text'
  const textAlign = 'invalid-text-alignment'
  const callerName = 'caller-name'
  let validateValueIsOfTypeSpy: jest.SpyInstance

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    validateText({
      callerName,
      layer: {
        text: {
          color,
          fontFamily,
          fontSize,
          maxFontSize,
          maxHeight,
          maxWidth,
          text,
          textAlign: TextAlignmentValue.center,
        },
      },
    })

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(7)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.color),
      color,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.fontFamily),
      fontFamily,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.fontSize),
      fontSize,
      PrimitiveType.number
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.maxFontSize),
      maxFontSize,
      PrimitiveType.number
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.maxHeight),
      maxHeight,
      PrimitiveType.number
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.maxWidth),
      maxWidth,
      PrimitiveType.number
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.text),
      text,
      PrimitiveType.string
    )
  })

  it('returns an error if the provided `textAlign` is invalid', () => {
    expect(
      validateText({
        callerName,
        layer: {
          text: {
            fontFamily,
            fontSize,
            maxFontSize,
            maxHeight,
            maxWidth,
            text,
            textAlign: textAlign as any,
          },
        },
      })
    ).toEqual([
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.textAlign),
        textAlign,
        Object.values(TextAlignmentValue).join(', ')
      ),
    ])
  })
})

describe('validateTextLayer', () => {
  const callerName = 'caller-name'
  const layer = mockTextLayer()
  let validateBackgroundSpy: jest.SpyInstance
  let validatePositionSpy: jest.SpyInstance
  let validateSizeSpy: jest.SpyInstance
  let validateTextSpy: jest.SpyInstance
  let validateTimelineSpy: jest.SpyInstance
  let validateTrimSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateBackgroundSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateBackground')
    validatePositionSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validatePosition')
    validateSizeSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateSize')
    validateTextSpy = jest.spyOn(TextValidationUtilsModule, 'validateText')
    validateTimelineSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTimeline')
    validateTrimSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTrim')

    validateTextLayer(callerName, layer)
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

  it('calls the `validateText` function with the correct arguments', () => {
    expect(validateTextSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTimeline` function with the correct arguments', () => {
    expect(validateTimelineSpy).toHaveBeenCalledWith({ callerName, layer })
  })

  it('calls the `validateTrim` function with the correct arguments', () => {
    expect(validateTrimSpy).toHaveBeenCalledWith({ callerName, layer })
  })
})
