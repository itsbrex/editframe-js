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
  const error = 'error'
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
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(VisualMediaMethod.setColor, color, PrimitiveType.string)
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      visualMedia.setColor(color)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.color, color)
    })
  })

  describe('setFormat', () => {
    const format = LayerFormatValue.fill

    describe('when `validateLayerFormat` returns an error', () => {
      beforeEach(() => {
        validateLayerFormatSpy.mockReturnValue(error)
      })

      it('throws an error', () => {
        expect(() => visualMedia.setFormat(format)).toThrow(error)
      })
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      visualMedia.setFormat(format)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.format, format)
    })
  })

  describe('setHeight', () => {
    const height = 100

    beforeEach(() => {
      visualMedia.setHeight(height)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(VisualMediaMethod.setHeight, height, PrimitiveType.number)
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
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(VisualMediaMethod.setWidth, width, PrimitiveType.number)
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
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(VisualMediaMethod.setX, x, PrimitiveType.number)
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
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(VisualMediaMethod.setY, y, PrimitiveType.number)
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.y, y)
    })
  })
})
