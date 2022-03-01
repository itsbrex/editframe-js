import {
  CompositionInterface,
  IdentifiedLayer,
  LayerAttribute,
  LayerFormatValue,
  PrimitiveType,
  VisualMediaMethod,
} from 'constant'
import { mockComposition } from 'mocks'
import * as ValidationUtilsModule from 'utils/validation'
import * as VideoUtilsModule from 'utils/video'

import { VisualMedia } from './'

describe('VisualMedia', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let visualMedia: VisualMedia
  let validateLayerFormatSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateLayerFormatSpy = jest.spyOn(VideoUtilsModule, 'validateLayerFormat')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    visualMedia = new VisualMedia({ composition: compositionMock, id })
  })

  describe('setBackgroundColor', () => {
    const backgroundColor = 'background-color'

    beforeEach(() => {
      visualMedia.setBackgroundColor(backgroundColor)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setBackgroundColor,
        LayerAttribute.backgroundColor,
        backgroundColor,
        PrimitiveType.string
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(
        id,
        LayerAttribute.backgroundColor,
        backgroundColor
      )
    })
  })

  describe('setColor', () => {
    const color = 'color'

    beforeEach(() => {
      visualMedia.setColor(color)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setColor,
        LayerAttribute.color,
        color,
        PrimitiveType.string
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      visualMedia.setColor(color)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.color, color)
    })
  })

  describe('setFormat', () => {
    const format = LayerFormatValue.fill

    beforeEach(() => {
      visualMedia.setFormat(format)
    })

    it('calls the `validateLayerFormat` function with the correct arguments', () => {
      expect(validateLayerFormatSpy).toHaveBeenCalledWith(format)
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.format, format)
    })
  })

  describe('setHeight', () => {
    const height = 100

    beforeEach(() => {
      visualMedia.setHeight(height)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setHeight,
        LayerAttribute.height,
        height,
        PrimitiveType.number
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.height, height)
    })
  })

  describe('setWidth', () => {
    const width = 200

    beforeEach(() => {
      visualMedia.setWidth(width)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setWidth,
        LayerAttribute.width,
        width,
        PrimitiveType.number
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.width, width)
    })
  })

  describe('setX', () => {
    const x = 20

    beforeEach(() => {
      visualMedia.setX(x)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setX,
        LayerAttribute.x,
        x,
        PrimitiveType.number
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.x, x)
    })
  })

  describe('setY', () => {
    const y = 20

    beforeEach(() => {
      visualMedia.setY(y)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setY,
        LayerAttribute.y,
        y,
        PrimitiveType.number
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.y, y)
    })
  })
})
