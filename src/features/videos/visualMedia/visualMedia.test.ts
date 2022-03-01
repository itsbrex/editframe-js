import { CompositionInterface, IdentifiedLayer, LayerAttribute, LayerFormatValue } from 'constant'
import { mockComposition } from 'mocks'
import * as VideoUtilsModule from 'utils/video'

import { VisualMedia } from './'

describe('VisualMedia', () => {
  const error = 'error'
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let visualMedia: VisualMedia
  let validateLayerFormatSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateLayerFormatSpy = jest.spyOn(VideoUtilsModule, 'validateLayerFormat')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    visualMedia = new VisualMedia({ composition: compositionMock, id })
  })

  describe('setBackgroundColor', () => {
    const backgroundColor = 'background-color'

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      visualMedia.setBackgroundColor(backgroundColor)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(
        id,
        LayerAttribute.backgroundColor,
        backgroundColor
      )
    })
  })

  describe('setColor', () => {
    const color = 'color'

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

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      visualMedia.setHeight(height)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.height, height)
    })
  })

  describe('setWidth', () => {
    const width = 200

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      visualMedia.setWidth(width)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.width, width)
    })
  })

  describe('setX', () => {
    const x = 20

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      visualMedia.setX(x)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.x, x)
    })
  })

  describe('setY', () => {
    const y = 20

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      visualMedia.setY(y)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.y, y)
    })
  })
})
