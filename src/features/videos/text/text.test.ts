import {
  CompositionInterface,
  IdentifiedLayer,
  LayerAttribute,
  LayerHorizontalAlignmentValue,
  PrimitiveType,
  TextMethod,
} from 'constant'
import { mockComposition } from 'mocks'
import { CompositionErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as VideoUtilsModule from 'utils/video'

import { Text } from './'

describe('Text', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let text: Text
  let validatePresenceOfSpy: jest.SpyInstance
  let validateTextAlignmentSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateTextAlignmentSpy = jest.spyOn(VideoUtilsModule, 'validateTextAlignment')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    text = new Text({ composition: compositionMock, id })
  })

  describe('setFontFamily', () => {
    const fontFamily = 'Arial'

    beforeEach(() => {
      text.setFontFamily(fontFamily)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setFontFamily,
        LayerAttribute.fontFamily,
        fontFamily,
        PrimitiveType.string,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      text.setFontFamily(fontFamily)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.fontFamily, fontFamily)
    })
  })

  describe('setFontSize', () => {
    const fontSize = 20

    beforeEach(() => {
      text.setFontSize(fontSize)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setFontSize,
        LayerAttribute.fontSize,
        fontSize,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.fontSize, fontSize)
    })
  })

  describe('setMaxFontSize', () => {
    const maxFontSize = 20

    beforeEach(() => {
      text.setMaxFontSize(maxFontSize)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setMaxFontSize,
        LayerAttribute.maxFontSize,
        maxFontSize,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.maxFontSize, maxFontSize)
    })
  })

  describe('setMaxHeight', () => {
    const maxHeight = 20

    beforeEach(() => {
      text.setMaxHeight(maxHeight)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setMaxHeight,
        LayerAttribute.maxHeight,
        maxHeight,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.maxHeight, maxHeight)
    })
  })

  describe('setMaxWidth', () => {
    const maxWidth = 20

    beforeEach(() => {
      text.setMaxWidth(maxWidth)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setMaxWidth,
        LayerAttribute.maxWidth,
        maxWidth,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.maxWidth, maxWidth)
    })
  })

  describe('setText', () => {
    const textValue = 'text'

    beforeEach(() => {
      text.setText(textValue)
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(textValue, CompositionErrorText.textRequired)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setText,
        LayerAttribute.text,
        textValue,
        PrimitiveType.string,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.text, textValue)
    })
  })

  describe('setTextAlignment', () => {
    const textAlignment = LayerHorizontalAlignmentValue.center

    beforeEach(() => {
      text.setTextAlignment(textAlignment)
    })

    it('calls the `vaidateTextAlignment` function with the correct arguments', () => {
      expect(validateTextAlignmentSpy).toHaveBeenCalledWith(textAlignment)
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.textAlignment, textAlignment)
    })
  })
})
