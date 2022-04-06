import { CompositionInterface, LayerAttribute, LayerFormatValue, PrimitiveType, VisualMediaMethod } from 'constant'
import { mockComposition } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'
import * as VideoUtilsModule from 'utils/video'

import { ResizableMedia } from './'

describe('ResizableMedia', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let resizableMedia: ResizableMedia
  let validateLayerFormatSpy: jest.SpyInstance
  let validatePresenceOfSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateLayerFormatSpy = jest.spyOn(VideoUtilsModule, 'validateLayerFormat')
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    compositionMock = mockComposition({
      updateLayerAttribute: jest.fn(),
    })

    resizableMedia = new ResizableMedia({ composition: compositionMock, id })
  })

  describe('setDimensions', () => {
    const height = 10
    const width = 20

    beforeEach(() => {
      resizableMedia.setDimensions({ height, width })
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(
        height,
        ValidationErrorText.REQUIRED_FIELD(LayerAttribute.height)
      )
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(
        width,
        ValidationErrorText.REQUIRED_FIELD(LayerAttribute.width)
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.height, height)
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.width, width)
    })
  })

  describe('setFormat', () => {
    const format = LayerFormatValue.fill

    beforeEach(() => {
      resizableMedia.setFormat(format)
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
      resizableMedia.setHeight(height)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setHeight,
        LayerAttribute.height,
        height,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.height, height)
    })
  })

  describe('setWidth', () => {
    const width = 200

    beforeEach(() => {
      resizableMedia.setWidth(width)
    })

    it('calls the `validateValueIsOfType` function', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        VisualMediaMethod.setWidth,
        LayerAttribute.width,
        width,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.width, width)
    })
  })
})
