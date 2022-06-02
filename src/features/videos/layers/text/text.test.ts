import {
  LayerHorizontalAlignmentValue,
  PrimitiveType,
  TextKey,
  TextLayerConfig,
  TextMethod,
  TextOptions,
} from 'constant'
import { Videos } from 'features'
import { Composition } from 'features/videos/composition'
import { mockApi } from 'mocks'
import { CompositionErrorText } from 'strings'
import { makeDefaultTextLayerConfig, makeDefaultTextOptions } from 'utils'
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

  let validatePresenceOfSpy: jest.SpyInstance
  let validateTextAlignmentSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance
  let validateValueIsOfTypesSpy: jest.SpyInstance

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
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateTextAlignmentSpy = jest.spyOn(LayerUtilsModule, 'validateTextAlignment')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    validateValueIsOfTypesSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfTypes')

    text = composition.addText({ text: initialText })
    layerOptionsDefaults = makeDefaultTextOptions(composition.dimensions)
    layerConfigDefaults = makeDefaultTextLayerConfig(composition.dimensions)

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct options and defaults', () => {
      expect(text.text).toEqual(initialText)
      expect(text.backgroundColor).toEqual(layerOptionsDefaults.backgroundColor)
      expect(text.color).toEqual(layerOptionsDefaults.color)
      expect(text.fontFamily).toEqual(layerOptionsDefaults.fontFamily)
      expect(text.fontSize).toEqual(layerOptionsDefaults.fontSize)
      expect(text.maxHeight).toEqual(layerOptionsDefaults.maxHeight)
      expect(text.maxWidth).toEqual(layerOptionsDefaults.maxWidth)
      expect(text.padding).toEqual(layerOptionsDefaults.padding)
      expect(text.textAlignment).toEqual(layerOptionsDefaults.textAlign)
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
    const backgroundColor = 'backgroundColor'

    beforeEach(() => {
      result = text.setBackgroundColor(backgroundColor)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setBackgroundColor,
        TextKey.backgroundColor,
        backgroundColor,
        PrimitiveType.string,
        true
      )
    })

    it('sets the `backgroundColor`', () => {
      text.setBackgroundColor(backgroundColor)

      expect(text.backgroundColor).toEqual(backgroundColor)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setColor', () => {
    const color = 'color'

    beforeEach(() => {
      result = text.setColor(color)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setColor,
        TextKey.color,
        color,
        PrimitiveType.string,
        true
      )
    })

    it('sets the `color`', () => {
      text.setColor(color)

      expect(text.color).toEqual(color)
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

  describe('setFontWeight', () => {
    const fontWeight = 100

    beforeEach(() => {
      result = text.setFontWeight(fontWeight)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypesSpy).toHaveBeenCalledWith(
        TextMethod.setFontWeight,
        TextKey.fontWeight,
        fontWeight,
        [PrimitiveType.number, PrimitiveType.string],
        true
      )
    })

    it('sets the `fontWeight`', () => {
      expect(text.fontWeight).toEqual(fontWeight)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setLineHeight', () => {
    const lineHeight = 20

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

  describe('setMaxFontSize', () => {
    const maxFontSize = 20

    beforeEach(() => {
      result = text.setMaxFontSize(maxFontSize)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setMaxFontSize,
        TextKey.maxFontSize,
        maxFontSize,
        PrimitiveType.number,
        true
      )
    })

    it('sets the `maxFontSize`', () => {
      expect(text.maxFontSize).toEqual(maxFontSize)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setMaxHeight', () => {
    const maxHeight = 20

    beforeEach(() => {
      result = text.setMaxHeight(maxHeight)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setMaxHeight,
        TextKey.maxHeight,
        maxHeight,
        PrimitiveType.number,
        true
      )
    })

    it('sets the `maxHeight`', () => {
      expect(text.maxHeight).toEqual(maxHeight)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })

  describe('setMaxWidth', () => {
    const maxWidth = 20

    beforeEach(() => {
      result = text.setMaxWidth(maxWidth)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setMaxWidth,
        TextKey.maxWidth,
        maxWidth,
        PrimitiveType.number,
        true
      )
    })

    it('sets the `maxWidth`', () => {
      expect(text.maxWidth).toEqual(maxWidth)
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

  describe('setTextAlignment', () => {
    const textAlign = LayerHorizontalAlignmentValue.center

    beforeEach(() => {
      result = text.setTextAlignment(textAlign)
    })

    it('calls the `validateTextAlignment` function with the correct arguments', () => {
      expect(validateTextAlignmentSpy).toHaveBeenCalledWith(TextMethod.setTextAlignment, textAlign)
    })

    it('sets the `textAlignment`', () => {
      expect(text.textAlignment).toEqual(textAlign)
    })

    it('returns the `Text` instance', () => {
      expect(result).toBeInstanceOf(Text)
    })
  })
})
