import { LayerKey, PrimitiveType, TextAlignValue, TextKey } from 'constant'
import { mockTextLayer, mockTextOptions } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as LayerConfigValidationUtilsModule from 'utils/validation/layerConfigs'
import { validateText, validateTextAlign, validateTextLayer } from 'utils/validation/layers/text'
import * as TextValidationUtilsModule from 'utils/validation/layers/text'

describe('validateTextAlign', () => {
  const textAlign = 'invalid-text-alignment'
  const callerName = 'caller-name'

  it('returns an error if the provided `textAlign` is invalid', () => {
    expect(validateTextAlign(callerName, textAlign as any)).toEqual(
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.textAlign),
        textAlign,
        Object.values(TextAlignValue).join(', ')
      )
    )
  })
})

describe('validateText', () => {
  const callerName = 'caller-name'
  let validateFontStyleSpy: jest.SpyInstance
  let validateFontWeightSpy: jest.SpyInstance
  let validateTextAlignSpy: jest.SpyInstance
  let validateTextPositionSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  const textOptions = mockTextOptions()
  const {
    backgroundColor,
    backgroundTransform,
    border,
    borderRadius,
    color,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    lineHeight,
    padding,
    text,
    textAlign,
    textDecoration,
    textPosition,
    textTransform,
  } = textOptions

  beforeEach(() => {
    validateFontStyleSpy = jest.spyOn(TextValidationUtilsModule, 'validateFontStyle')
    validateFontWeightSpy = jest.spyOn(TextValidationUtilsModule, 'validateFontWeight')
    validateTextAlignSpy = jest.spyOn(TextValidationUtilsModule, 'validateTextAlign')
    validateTextPositionSpy = jest.spyOn(TextValidationUtilsModule, 'validateTextPosition')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    validateText({
      callerName,
      layer: {
        text: textOptions,
      },
    })

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(12)

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.backgroundColor),
      backgroundColor,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.backgroundTransform),
      backgroundTransform,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.border),
      border,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.borderRadius),
      borderRadius,
      PrimitiveType.number
    )

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
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.lineHeight),
      lineHeight,
      PrimitiveType.number
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.padding),
      padding,
      PrimitiveType.number
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.text),
      text,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.textDecoration),
      textDecoration,
      PrimitiveType.string
    )

    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.textTransform),
      textTransform,
      PrimitiveType.string
    )
  })

  it('calls the `validateFontStyle` function with the correct arguments', () => {
    expect(validateFontStyleSpy).toHaveBeenCalledWith(callerName, fontStyle)
  })

  it('calls the `validateFontWeight` function with the correct arguments', () => {
    expect(validateFontWeightSpy).toHaveBeenCalledWith(callerName, fontWeight)
  })

  it('calls the `validateTextAlign` function with the correct arguments', () => {
    expect(validateTextAlignSpy).toHaveBeenCalledWith(callerName, textAlign)
  })

  it('calls the `validateTextPositionSpy` function with the correct arguments', () => {
    expect(validateTextPositionSpy).toHaveBeenCalledWith(callerName, textPosition)
  })
})

describe('validateTextLayer', () => {
  const callerName = 'caller-name'
  const layer = mockTextLayer()
  let validatePositionSpy: jest.SpyInstance
  let validateSizeSpy: jest.SpyInstance
  let validateTextSpy: jest.SpyInstance
  let validateTimelineSpy: jest.SpyInstance
  let validateTrimSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validatePositionSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validatePosition')
    validateSizeSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateSize')
    validateTextSpy = jest.spyOn(TextValidationUtilsModule, 'validateText')
    validateTimelineSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTimeline')
    validateTrimSpy = jest.spyOn(LayerConfigValidationUtilsModule, 'validateTrim')

    validateTextLayer(callerName, layer)
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
