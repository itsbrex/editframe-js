import {
  CompositionInterface,
  IdentifiedLayer,
  LayerAttribute,
  LayerHorizontalAlignmentValue,
  PrimitiveType,
  TextMethod,
} from 'constant'
import { mockComposition } from 'mocks'
import * as ValidationUtilsModule from 'utils/validation'
import * as VideoUtilsModule from 'utils/video'

import { Text } from './'

describe('Text', () => {
  const error = 'error'
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let text: Text
  let validatePresenceOfSpy: jest.SpyInstance
  let validateTextAligmentSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateTextAligmentSpy = jest.spyOn(VideoUtilsModule, 'validateTextAligment')
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

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(TextMethod.setFontFamily, fontFamily, PrimitiveType.string)
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

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(TextMethod.setFontSize, fontSize, PrimitiveType.number)
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

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        TextMethod.setMaxFontSize,
        maxFontSize,
        PrimitiveType.number
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

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(TextMethod.setMaxHeight, maxHeight, PrimitiveType.number)
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

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(TextMethod.setMaxWidth, maxWidth, PrimitiveType.number)
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.maxWidth, maxWidth)
    })
  })

  describe('setText', () => {
    const textValue = 'text'

    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validatePresenceOfSpy.mockReturnValue(error)
      })

      it('throws an error', () => {
        expect(() => text.setText(textValue)).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      text.setText(textValue)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.text, textValue)
    })
  })

  describe('setTextAlignment', () => {
    const textAlignment = LayerHorizontalAlignmentValue.center

    describe('when `validatePresenceOf` returns an error', () => {
      beforeEach(() => {
        validateTextAligmentSpy.mockReturnValue(error)
      })

      it('throws an error', () => {
        expect(() => text.setTextAlignment(textAlignment)).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      text.setTextAlignment(textAlignment)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.textAlignment, textAlignment)
    })
  })
})
