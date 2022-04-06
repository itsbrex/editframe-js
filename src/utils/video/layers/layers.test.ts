import {
  Color,
  HTMLAttribute,
  LayerAttribute,
  LayerFormat,
  LayerFormatValue,
  LayerHorizontalAlignmentValue,
  LayerVerticalAlignmentValue,
  PrimitiveType,
  SubtitlesAttribute,
  TextAlignmentValue,
} from 'constant'
import { mockHTMLLayer, mockLottieLayer, mockSubtitlesLayer } from 'mocks'
import { CompositionErrorText, ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as VideoLayersUtilsModule from 'utils/video/layers'

import {
  validateFormat,
  validateHorizontalAlignment,
  validateLayerAlignment,
  validateLayerBase,
  validateLayerHTML,
  validateLayerLottie,
  validateLayerPositionableMedia,
  validateLayerSubtitles,
  validateLayerText,
  validateLayerTrim,
  validateLayerVisualMedia,
  validateTextAlignment,
  validateVerticalAlignment,
  validateX,
  validateY,
} from './'

describe('validations', () => {
  const callerName = 'callerName'
  const { data } = mockLottieLayer()
  let validateValueIsOfTypeSpy: jest.SpyInstance
  let validateFormatSpy: jest.SpyInstance
  let validateXSpy: jest.SpyInstance
  let validateYSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    validateFormatSpy = jest.spyOn(VideoLayersUtilsModule, 'validateFormat')
    validateXSpy = jest.spyOn(VideoLayersUtilsModule, 'validateX')
    validateYSpy = jest.spyOn(VideoLayersUtilsModule, 'validateY')
  })

  describe('validateLayerBase', () => {
    const start = 5

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      const finalErrors = validateLayerBase(callerName, { start })

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(1)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.start,
        start,
        PrimitiveType.number
      )

      expect(finalErrors).toEqual([])
    })
  })

  describe('validateLayerHTML', () => {
    it('adds the `htmlPageOrURLRequired` error when neither `page` or `url` is provided', () => {
      const htmlLayer = mockHTMLLayer({ withHTML: false, withURL: false })
      const finalErrors = validateLayerHTML(callerName, htmlLayer)

      expect(finalErrors).toEqual([CompositionErrorText.htmlPageOrURLRequired])
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      const htmlLayer = mockHTMLLayer()
      const finalErrors = validateLayerHTML(callerName, htmlLayer)
      const {
        html: { page, url, withTransparentBackground },
      } = htmlLayer

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(3)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerAttribute.html, HTMLAttribute.page),
        page,
        PrimitiveType.string
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerAttribute.html, HTMLAttribute.withTransparentBackground),
        withTransparentBackground,
        PrimitiveType.boolean
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerAttribute.html, HTMLAttribute.url),
        url,
        PrimitiveType.string
      )

      expect(finalErrors).toEqual([])
    })
  })

  describe('validateLayerLottie', () => {
    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      const finalErrors = validateLayerLottie(callerName, { data })

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(1)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(callerName, LayerAttribute.data, data, PrimitiveType.object)

      expect(finalErrors).toEqual([])
    })
  })

  describe('validateLayerPositionableMedia', () => {
    const x = 5
    const y = 10

    beforeEach(() => {
      validateLayerPositionableMedia(callerName, { x, y })
    })

    it('calls the `validateX` function with the correct arguments', () => {
      expect(validateXSpy).toHaveBeenCalledWith(callerName, x)
    })

    it('calls the `validateY` function with the correct arguments', () => {
      expect(validateYSpy).toHaveBeenCalledWith(callerName, y)
    })
  })

  describe('validateLayerSubtitles', () => {
    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      const subtitlesLayer = mockSubtitlesLayer()
      const finalErrors = validateLayerSubtitles(callerName, subtitlesLayer)
      const {
        subtitles: { backgroundColor, color, fontSize },
      } = subtitlesLayer

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(3)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerAttribute.subtitles, SubtitlesAttribute.backgroundColor),
        backgroundColor,
        PrimitiveType.string
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerAttribute.subtitles, SubtitlesAttribute.color),
        color,
        PrimitiveType.string
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerAttribute.subtitles, SubtitlesAttribute.fontSize),
        fontSize,
        PrimitiveType.number
      )

      expect(finalErrors).toEqual([])
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
    const format = LayerFormatValue.fill
    const x = 5
    const y = 10

    beforeEach(() => {
      validateLayerVisualMedia(callerName, { backgroundColor, format, x, y })
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.backgroundColor,
        backgroundColor,
        PrimitiveType.string
      )
    })

    it('calls the `validateFormat` function with the correct arguments', () => {
      expect(validateFormatSpy).toHaveBeenCalledWith(callerName, LayerAttribute.format, format)
    })

    it('calls the `validateX` function with the correct arguments', () => {
      expect(validateXSpy).toHaveBeenCalledWith(callerName, x)
    })

    it('calls the `validateY` function with the correct arguments', () => {
      expect(validateYSpy).toHaveBeenCalledWith(callerName, y)
    })
  })

  describe('validateFormat', () => {
    const callerName = 'caller-name'
    const format = 'invalid-format'

    it('returns an error if the provided `format` is invalid', () => {
      expect(validateFormat(callerName, LayerAttribute.format, format as LayerFormat)).toEqual(
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          LayerAttribute.format,
          format,
          Object.values(LayerFormatValue).join(', ')
        )
      )
    })
  })

  describe('validateHorizontalAlignment', () => {
    const callerName = 'caller-name'
    const horizontalAlignment = 'invalid-horizontal-alignment'

    it('returns an error if the provided `horizontalAlignment` is invalid', () => {
      expect(
        validateHorizontalAlignment(callerName, LayerAttribute.horizontalAlignment, horizontalAlignment as any)
      ).toEqual(
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          LayerAttribute.horizontalAlignment,
          horizontalAlignment,
          Object.values(LayerHorizontalAlignmentValue).join(', ')
        )
      )
    })
  })

  describe('validateVerticalAlignment', () => {
    const callerName = 'caller-name'
    const verticalAlignment = 'invalid-vertical-alignment'

    it('returns an error if the provided `verticalAlignment` is invalid', () => {
      expect(validateVerticalAlignment(callerName, LayerAttribute.verticalAlignment, verticalAlignment as any)).toEqual(
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          LayerAttribute.verticalAlignment,
          verticalAlignment,
          Object.values(LayerVerticalAlignmentValue).join(', ')
        )
      )
    })
  })

  describe('validateX', () => {
    const callerName = 'caller-name'

    it('returns an error if the provided `x` is an invalid string', () => {
      const x = 'invalid-x'

      expect(validateX(callerName, x as any)).toEqual(
        validateHorizontalAlignment(callerName, LayerAttribute.x, x as any)
      )
    })

    it('returns an error if the provided `x` is an invalid non-string', () => {
      const x = true

      expect(validateX(callerName, x as any)).toEqual(
        ValidationUtilsModule.validateValueIsOfType(callerName, LayerAttribute.x, x, PrimitiveType.number)
      )
    })
  })

  describe('validateY', () => {
    const callerName = 'caller-name'

    it('returns an error if the provided `y` is an invalid string', () => {
      const y = 'invalid-y'

      expect(validateY(callerName, y as any)).toEqual(validateVerticalAlignment(callerName, LayerAttribute.y, y as any))
    })

    it('returns an error if the provided `y` is an invalid non-string', () => {
      const y = true

      expect(validateY(callerName, y as any)).toEqual(
        ValidationUtilsModule.validateValueIsOfType(callerName, LayerAttribute.y, y, PrimitiveType.number)
      )
    })
  })

  describe('validateTextAlignment', () => {
    const textAlign = 'invalid-text-alignment'

    it('returns an error if the provided `textAlign` is invalid', () => {
      expect(validateTextAlignment(callerName, textAlign as any)).toEqual(
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          LayerAttribute.textAlign,
          textAlign,
          Object.values(TextAlignmentValue).join(', ')
        )
      )
    })
  })

  describe('validateLayerAlignment', () => {
    const invalidHorizontalAlignment = 'invalid-horizontal-alignment'
    const invalidVerticalAlignment = 'invalid-vertical-alignment'

    it('returns an error if the provided `horizontalAlignment` is invalid', () => {
      expect(validateLayerAlignment(callerName, { horizontalAlignment: invalidHorizontalAlignment as any })).toEqual([
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          LayerAttribute.horizontalAlignment,
          invalidHorizontalAlignment,
          Object.values(LayerHorizontalAlignmentValue).join(', ')
        ),
      ])
    })

    it('returns an error if the provided `verticalAlignment` is invalid', () => {
      expect(
        validateLayerAlignment(callerName, {
          horizontalAlignment: LayerHorizontalAlignmentValue.center,
          verticalAlignment: invalidVerticalAlignment as any,
        })
      ).toEqual([
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          LayerAttribute.verticalAlignment,
          invalidVerticalAlignment,
          Object.values(LayerVerticalAlignmentValue).join(', ')
        ),
      ])
    })
  })

  describe('validateLayerText', () => {
    const color = Color.black
    const fontFamily = 'font-family'
    const fontSize = 10
    const maxFontSize = 20
    const maxHeight = 30
    const maxWidth = 40
    const text = 'text'
    const textAlign = 'invalid-text-alignment'

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      validateLayerText(callerName, {
        color,
        fontFamily,
        fontSize,
        maxFontSize,
        maxHeight,
        maxWidth,
        text,
        textAlign: TextAlignmentValue.center,
      })

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledTimes(7)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        LayerAttribute.color,
        color,
        PrimitiveType.string
      )

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

    it('returns an error if the provided `textAlign` is invalid', () => {
      expect(
        validateLayerText(callerName, {
          fontFamily,
          fontSize,
          maxFontSize,
          maxHeight,
          maxWidth,
          text,
          textAlign: textAlign as any,
        })
      ).toEqual([
        ValidationErrorText.MUST_BE_TYPE(
          callerName,
          LayerAttribute.textAlign,
          textAlign,
          Object.values(TextAlignmentValue).join(', ')
        ),
      ])
    })
  })
})
