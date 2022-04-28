import { CompositionInterface, FormatValue, LayerKey, SizeKey, SizeMethod } from 'constant'
import { mockComposition } from 'mocks'
import * as SizeValidationModule from 'utils/validation/layerConfigs/size'

import { SizeMixin } from './'

describe('SizeMixin', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let size: SizeMixin
  let result: SizeMixin | void
  let validateSizeMixinSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    compositionMock = mockComposition({
      setLayerAttribute: jest.fn(),
    })
    validateSizeMixinSpy = jest.spyOn(SizeValidationModule, 'validateSizeMixin')

    size = new SizeMixin({ composition: compositionMock, id })
  })

  describe('setDimensions', () => {
    const height = 10
    const width = 20

    beforeEach(() => {
      result = size.setDimensions({ height, width })
    })

    it('calls the `validateSizeMixin` function with the correct arguments', () => {
      expect(validateSizeMixinSpy).toHaveBeenCalledWith(SizeMethod.setDimensions, { size: { height, width } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: SizeKey.height,
        id,
        layerKey: LayerKey.size,
        value: height,
      })
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: SizeKey.width,
        id,
        layerKey: LayerKey.size,
        value: width,
      })
    })

    it('returns the `SizeMixin` instance', () => {
      expect(result).toBeInstanceOf(SizeMixin)
    })
  })

  describe('setFormat', () => {
    const format = FormatValue.fill

    beforeEach(() => {
      result = size.setFormat(format)
    })

    it('calls the `validateSizeMixin` function with the correct arguments', () => {
      expect(validateSizeMixinSpy).toHaveBeenCalledWith(SizeMethod.setFormat, { size: { format } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: SizeKey.format,
        id,
        layerKey: LayerKey.size,
        value: format,
      })
    })

    it('returns the `SizeMixin` instance', () => {
      expect(result).toBeInstanceOf(SizeMixin)
    })
  })

  describe('setHeight', () => {
    const height = 100

    beforeEach(() => {
      result = size.setHeight(height)
    })

    it('calls the `validateSizeMixin` function', () => {
      expect(validateSizeMixinSpy).toHaveBeenCalledWith(SizeMethod.setHeight, { size: { height } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: SizeKey.height,
        id,
        layerKey: LayerKey.size,
        value: height,
      })
    })

    it('returns the `SizeMixin` instance', () => {
      expect(result).toBeInstanceOf(SizeMixin)
    })
  })

  describe('setWidth', () => {
    const width = 200

    beforeEach(() => {
      result = size.setWidth(width)
    })

    it('calls the `validateSizeMixin` function', () => {
      expect(validateSizeMixinSpy).toHaveBeenCalledWith(SizeMethod.setWidth, { size: { width } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: SizeKey.width,
        id,
        layerKey: LayerKey.size,
        value: width,
      })
    })

    it('returns the `SizeMixin` instance', () => {
      expect(result).toBeInstanceOf(SizeMixin)
    })
  })
})
