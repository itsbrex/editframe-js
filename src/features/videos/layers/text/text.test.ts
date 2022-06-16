import {
  Color,
  DefaultTextOptions,
  LayerHorizontalAlignmentValue,
  PrimitiveType,
  TextHorizontalPositionValue,
  TextKey,
  TextLayerConfig,
  TextMethod,
  TextOptions,
  TextVerticalPositionValue,
} from 'constant'
import { Videos } from 'features'
import { Composition } from 'features/videos/composition'
import { mockApi } from 'mocks'
import { CompositionErrorText } from 'strings'
import { makeDefaultTextLayerConfig, translateColor } from 'utils'
import * as ValidationUtilsModule from 'utils/validation'
import * as LayerUtilsModule from 'utils/validation/layers/text'

import { Text } from './'

describe('Text', () => {
  const initialText = 'initial-text'
  let composition: Composition
  let text: Text
  let result: Text | void
  let layerOptionsDefaults: TextOptions
  let layerConfigDefaults: TextLayerConfig

  let validateColorSpy: jest.SpyInstance
  let validateFontStyleSpy: jest.SpyInstance
  let validateFontWeightSpy: jest.SpyInstance
  let validatePresenceOfSpy: jest.SpyInstance
  let validateTextAlignSpy: jest.SpyInstance
  let validateTextPositionSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    const api = mockApi()

    composition = new Composition({
      api,
      formData: { append: jest.fn() },
      options: {
        dimensions: {
          height: 1920,
          width: 1080,
        },
        duration: 10,
      },
      videos: new Videos({ api }),
    })
    validateColorSpy = jest.spyOn(ValidationUtilsModule, 'validateColor')
    validateFontStyleSpy = jest.spyOn(LayerUtilsModule, 'validateFontStyle')
    validateFontWeightSpy = jest.spyOn(LayerUtilsModule, 'validateFontWeight')
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateTextAlignSpy = jest.spyOn(LayerUtilsModule, 'validateTextAlign')
    validateTextPositionSpy = jest.spyOn(LayerUtilsModule, 'validateTextPosition')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

    text = composition.addText({ text: initialText })
    layerOptionsDefaults = DefaultTextOptions
    layerConfigDefaults = makeDefaultTextLayerConfig()

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct options and defaults', () => {
      expect(text.text).toEqual(initialText)
      expect(text.backgroundColor).toEqual(layerOptionsDefaults.backgroundColor)
      expect(text.color).toEqual(layerOptionsDefaults.color)
      expect(text.fontFamily).toEqual(layerOptionsDefaults.fontFamily)
      expect(text.fontSize).toEqual(layerOptionsDefaults.fontSize)
      expect(text.padding).toEqual(layerOptionsDefaults.padding)
      expect(text.textAlign).toEqual(layerOptionsDefaults.textAlign)
    })

    it('sets the correct default layer configs', () => {
      expect(text.isRelative).toEqual(layerConfigDefaults.position.isRelative)
      expect(text.x).toEqual(layerConfigDefaults.position.x)
      expect(text.y).toEqual(layerConfigDefaults.position.y)
      expect(text.format).toEqual(layerConfigDefaults.size.format)
      expect(text.height).toEqual(layerConfigDefaults.size.height)
      expect(text.width).toEqual(layerConfigDefaults.size.width)
      expect(text.start).toEqual(layerConfigDefaults.timeline.start)
      expect(text.trim).toEqual(layerConfigDefaults.trim)
    })
  })

  describe('setBackgroundColor', () => {
    const backgroundColor = Color.black

    beforeEach(() => {
      result = text.setBackgroundColor(backgroundColor)
    })

    it('calls the `validateColor` function', () => {
      expect(validateColorSpy).toHaveBeenCalledWith(
        TextMethod.setBackgroundColor,
        TextKey.backgroundColor,
        backgroundColor,
        true
      )
    })

    it('sets the `backgroundColor`', () => {
      text.setBackgroundColor(backgroundColor)

      expect(text.backgroundColor).toEqual(translateColor(backgroundColor))
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setBackgroundTransform', () => {
    const backgroundTransform = 'backgroundTransform'

    beforeEach(() => {
      result = text.setBackgroundTransform(backgroundTransform)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setBackgroundTransform,
        TextKey.backgroundTransform,
        backgroundTransform,
        PrimitiveType.string,
        true
      )
    })

    it('sets the `backgroundTransform`', () => {
      text.setBackgroundTransform(backgroundTransform)

      expect(text.backgroundTransform).toEqual(backgroundTransform)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setBorder', () => {
    const border = 'border'

    beforeEach(() => {
      result = text.setBorder(border)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setBorder,
        TextKey.border,
        border,
        PrimitiveType.string,
        true
      )
    })

    it('sets the `border`', () => {
      text.setBorder(border)

      expect(text.border).toEqual(border)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setBorderRadius', () => {
    const borderRadius = 33

    beforeEach(() => {
      result = text.setBorderRadius(borderRadius)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setBorderRadius,
        TextKey.borderRadius,
        borderRadius,
        PrimitiveType.number,
        true
      )
    })

    it('sets the `borderRadius`', () => {
      text.setBorderRadius(borderRadius)

      expect(text.borderRadius).toEqual(borderRadius)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setColor', () => {
    const color = Color.black

    beforeEach(() => {
      result = text.setColor(color)
    })

    it('calls the `validateColor` function', () => {
      expect(validateColorSpy).toHaveBeenCalledWith(TextMethod.setColor, TextKey.color, color, true)
    })

    it('sets the `color`', () => {
      text.setColor(color)

      expect(text.color).toEqual(translateColor(color))
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setFontFamily', () => {
    const fontFamily = 'Arial'

    beforeEach(() => {
      result = text.setFontFamily(fontFamily)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setFontFamily,
        TextKey.fontFamily,
        fontFamily,
        PrimitiveType.string,
        true
      )
    })

    it('sets the `fontFamily`', () => {
      expect(text.fontFamily).toEqual(fontFamily)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setFontSize', () => {
    const fontSize = 20

    beforeEach(() => {
      result = text.setFontSize(fontSize)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setFontSize,
        TextKey.fontSize,
        fontSize,
        PrimitiveType.number,
        true
      )
    })

    it('sets the `fontSize`', () => {
      expect(text.fontSize).toEqual(fontSize)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setFontStyle', () => {
    const fontStyle = 'italic'

    beforeEach(() => {
      result = text.setFontStyle(fontStyle)
    })

    it('calls the `validateFontStyle` function with the correct arguments', () => {
      expect(validateFontStyleSpy).toHaveBeenCalledWith(TextMethod.setFontStyle, fontStyle)
    })

    it('sets the `fontStyle`', () => {
      expect(text.fontStyle).toEqual(fontStyle)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setFontWeight', () => {
    const fontWeight = 100

    beforeEach(() => {
      result = text.setFontWeight(fontWeight)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateFontWeightSpy).toHaveBeenCalledWith(TextMethod.setFontWeight, fontWeight)
    })

    it('sets the `fontWeight`', () => {
      expect(text.fontWeight).toEqual(fontWeight)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setLineHeight', () => {
    const lineHeight = 3

    beforeEach(() => {
      result = text.setLineHeight(lineHeight)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setLineHeight,
        TextKey.lineHeight,
        lineHeight,
        PrimitiveType.number,
        true
      )
    })

    it('sets the `lineHeight`', () => {
      expect(text.lineHeight).toEqual(lineHeight)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setPadding', () => {
    const padding = 10

    beforeEach(() => {
      result = text.setPadding(padding)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setPadding,
        TextKey.padding,
        padding,
        PrimitiveType.number,
        true
      )
    })

    it('sets the `padding`', () => {
      expect(text.padding).toEqual(padding)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setText', () => {
    const textValue = 'text'

    beforeEach(() => {
      result = text.setText(textValue)
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(textValue, CompositionErrorText.textRequired)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setText,
        TextKey.text,
        textValue,
        PrimitiveType.string,
        true
      )
    })

    it('sets the `text`', () => {
      expect(text.text).toEqual(textValue)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setTextAlign', () => {
    const textAlign = LayerHorizontalAlignmentValue.center

    beforeEach(() => {
      result = text.setTextAlign(textAlign)
    })

    it('calls the `validateTextAlign` function with the correct arguments', () => {
      expect(validateTextAlignSpy).toHaveBeenCalledWith(TextMethod.setTextAlign, textAlign)
    })

    it('sets the `textAlign`', () => {
      expect(text.textAlign).toEqual(textAlign)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setTextDecoration', () => {
    const textDecoration = 'text-decoration'

    beforeEach(() => {
      result = text.setTextDecoration(textDecoration)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setTextDecoration,
        TextKey.textDecoration,
        textDecoration,
        PrimitiveType.string,
        true
      )
    })

    it('sets the `textDecoration`', () => {
      expect(text.textDecoration).toEqual(textDecoration)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setTextPosition', () => {
    const textPosition = { x: TextHorizontalPositionValue.center, y: TextVerticalPositionValue.center }

    beforeEach(() => {
      result = text.setTextPosition(textPosition)
    })

    it('calls the `validateTextPosition` function with the correct arguments', () => {
      expect(validateTextPositionSpy).toHaveBeenCalledWith(TextMethod.setTextPosition, textPosition)
    })

    it('sets the `textPosition`', () => {
      expect(text.textPosition).toEqual(textPosition)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setTextTransform', () => {
    const textTransform = 'textTransform'

    beforeEach(() => {
      result = text.setTextTransform(textTransform)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setTextTransform,
        TextKey.textTransform,
        textTransform,
        PrimitiveType.string,
        true
      )
    })

    it('sets the `textTransform`', () => {
      text.setTextTransform(textTransform)

      expect(text.textTransform).toEqual(textTransform)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })
})
