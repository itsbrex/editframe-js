import { CompositionInterface, LayerKey, PositionKey, PositionMethod } from 'constant'
import { mockComposition } from 'mocks'
import * as PositionValidationUtilsModule from 'utils/validation/layerConfigs/position'

import { PositionMixin } from './'

describe('PositionMixin', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let position: PositionMixin
  let result: PositionMixin | void
  let validatePositionMixinSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    compositionMock = mockComposition({
      setLayerAttribute: jest.fn(),
    })
    validatePositionMixinSpy = jest.spyOn(PositionValidationUtilsModule, 'validatePositionMixin')

    position = new PositionMixin({ composition: compositionMock, id })
  })

  describe('setIsRelative', () => {
    const isRelative = true

    beforeEach(() => {
      result = position.setIsRelative(isRelative)
    })

    it('calls the `validatePositionMixin` function with the correct arguments', () => {
      expect(validatePositionMixinSpy).toHaveBeenCalledWith(PositionMethod.setIsRelative, { position: { isRelative } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: PositionKey.isRelative,
        id,
        layerKey: LayerKey.position,
        value: isRelative,
      })
    })

    it('returns the `PositionMixin` instance', () => {
      expect(result).toBeInstanceOf(PositionMixin)
    })
  })

  describe('setX', () => {
    const x = 20

    beforeEach(() => {
      result = position.setX(x)
    })

    it('calls the `validatePositionMixin` function with the correct arguments', () => {
      expect(validatePositionMixinSpy).toHaveBeenCalledWith(PositionMethod.setX, { position: { x } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: PositionKey.x,
        id,
        layerKey: LayerKey.position,
        value: x,
      })
    })

    it('returns the `PositionMixin` instance', () => {
      expect(result).toBeInstanceOf(PositionMixin)
    })
  })

  describe('setY', () => {
    const y = 20

    beforeEach(() => {
      result = position.setY(y)
    })

    it('calls the `validatePositionMixin` function with the correct arguments', () => {
      expect(validatePositionMixinSpy).toHaveBeenCalledWith(PositionMethod.setY, { position: { y } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: PositionKey.y,
        id,
        layerKey: LayerKey.position,
        value: y,
      })
    })

    it('returns the `PositionMixin` instance', () => {
      expect(result).toBeInstanceOf(PositionMixin)
    })
  })
})
