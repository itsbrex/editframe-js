import { LayerAttribute, LayerHorizontalAlignmentValue, LayerVerticalAlignmentValue, PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import {
  validateHorizontalAlignment,
  validateLayerAlignment,
  validateLayerBase,
  validateLayerText,
  validateLayerTrim,
  validateLayerVisualMedia,
} from './'

describe('validations', () => {
  const callerName = 'callerName'
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
  })

  describe('validateLayerBase', () => {
    const length = 10
    const start = 5

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      validateLayerBase(callerName, { length, start })

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(2)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.start,
        start,
        PrimitiveType.number
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.length,
        length,
        PrimitiveType.number
      )
    })
  })

  describe('validateLayerTrim', () => {
    const end = 10
    const start = 5

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      validateLayerTrim(callerName, { trim: { end, start } })

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(2)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerAttribute.trim, LayerAttribute.start),
        start,
        PrimitiveType.number
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerAttribute.trim, LayerAttribute.end),
        end,
        PrimitiveType.number
      )
    })
  })

  describe('validateLayerVisualMedia', () => {
    const backgroundColor = 'background-color'
    const color = 'color'
    const x = 5
    const y = 10

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      validateLayerVisualMedia(callerName, { backgroundColor, color, x, y })

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(4)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.backgroundColor,
        backgroundColor,
        PrimitiveType.string
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.color,
        color,
        PrimitiveType.string
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(callerName, LayerAttribute.x, x, PrimitiveType.number)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(callerName, LayerAttribute.y, y, PrimitiveType.number)
    })
  })

  describe('validateHorizontalAlignment', () => {
    const horizontalAlignment = 'invalid-horizontal-alignment'

    it('throws an error if the provided `horizontalAlignment` is invalid', () => {
      expect(() =>
        validateHorizontalAlignment(callerName, LayerAttribute.horizontalAlignment, horizontalAlignment as any)
      ).toThrow(
        new Error(
          ValidationErrorText.MUST_BE_TYPE(
            callerName,
            LayerAttribute.horizontalAlignment,
            horizontalAlignment,
            Object.values(LayerHorizontalAlignmentValue).join(', ')
          )
        )
      )
    })
  })

  describe('validateLayerAlignment', () => {
    const horizontalAlignment = 'invalid-horizontal-alignment'
    const verticalAlignment = 'invalid-vertical-alignment'

    it('throws an error if the provided `horizontalAlignment` is invalid', () => {
      expect(() => validateLayerAlignment(callerName, { horizontalAlignment: horizontalAlignment as any })).toThrow(
        new Error(
          ValidationErrorText.MUST_BE_TYPE(
            callerName,
            LayerAttribute.horizontalAlignment,
            horizontalAlignment,
            Object.values(LayerHorizontalAlignmentValue).join(', ')
          )
        )
      )
    })

    it('throws an error if the provided `verticalAlignment` is invalid', () => {
      expect(() =>
        validateLayerAlignment(callerName, {
          horizontalAlignment: LayerHorizontalAlignmentValue.center,
          verticalAlignment: verticalAlignment as any,
        })
      ).toThrow(
        new Error(
          ValidationErrorText.MUST_BE_TYPE(
            callerName,
            LayerAttribute.verticalAlignment,
            verticalAlignment,
            Object.values(LayerVerticalAlignmentValue).join(', ')
          )
        )
      )
    })
  })

  describe('validateLayerText', () => {
    const fontFamily = 'font-family'
    const fontSize = 10
    const maxFontSize = 20
    const maxHeight = 30
    const maxWidth = 40
    const text = 'text'
    const textAlignment = 'invalid-text-alignment'

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      validateLayerText(callerName, {
        fontFamily,
        fontSize,
        maxFontSize,
        maxHeight,
        maxWidth,
        text,
        textAlignment: LayerHorizontalAlignmentValue.center,
      })

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(6)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.fontFamily,
        fontFamily,
        PrimitiveType.string
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.fontSize,
        fontSize,
        PrimitiveType.number
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.maxFontSize,
        maxFontSize,
        PrimitiveType.number
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.maxHeight,
        maxHeight,
        PrimitiveType.number
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.maxWidth,
        maxWidth,
        PrimitiveType.number
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(callerName, LayerAttribute.text, text, PrimitiveType.string)
    })

    it('throws an error if the provided `textAlignment` is invalid', () => {
      expect(() =>
        validateLayerText(callerName, {
          fontFamily,
          fontSize,
          maxFontSize,
          maxHeight,
          maxWidth,
          text,
          textAlignment: textAlignment as any,
        })
      ).toThrow(
        new Error(
          ValidationErrorText.MUST_BE_TYPE(
            callerName,
            LayerAttribute.textAlignment,
            textAlignment,
            Object.values(LayerHorizontalAlignmentValue).join(', ')
          )
        )
      )
    })
  })
})
