import { CompositionInterface, IdentifiedLayer, LayerAttribute, LayerHorizontalAlignmentValue } from 'constant'
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

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateTextAligmentSpy = jest.spyOn(VideoUtilsModule, 'validateTextAligment')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    text = new Text({ composition: compositionMock, id })
  })

  describe('setFontFamily', () => {
    const fontFamily = 'Arial'

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      text.setFontFamily(fontFamily)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.fontFamily, fontFamily)
    })
  })

  describe('setFontSize', () => {
    const fontSize = 20

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      text.setFontSize(fontSize)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.fontSize, fontSize)
    })
  })

  describe('setMaxFontSize', () => {
    const maxFontSize = 20

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      text.setMaxFontSize(maxFontSize)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.maxFontSize, maxFontSize)
    })
  })

  describe('setMaxHeight', () => {
    const maxHeight = 20

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      text.setMaxHeight(maxHeight)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.maxHeight, maxHeight)
    })
  })

  describe('setMaxWidth', () => {
    const maxWidth = 20

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      text.setMaxWidth(maxWidth)

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
