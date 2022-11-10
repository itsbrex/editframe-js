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

  describe('setAngle', () => {
    const angle = 10

    beforeEach(() => {
      result = position.setAngle(angle)
    })

    it('calls the `validatePositionMixin` function with the correct arguments', () => {
      expect(validatePositionMixinSpy).toHaveBeenCalledWith(PositionMethod.setAngle, { position: { angle } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: PositionKey.angle,
        id,
        layerKey: LayerKey.position,
        value: angle,
      })
    })

    it('returns the `PositionMixin` instance', () => {
      expect(result).toBeInstanceOf(PositionMixin)
    })
  })

  describe('setAngleX', () => {
    const angleX = 10

    beforeEach(() => {
      result = position.setAngleX(angleX)
    })

    it('calls the `validatePositionMixin` function with the correct arguments', () => {
      expect(validatePositionMixinSpy).toHaveBeenCalledWith(PositionMethod.setAngleX, { position: { angleX } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: PositionKey.angleX,
        id,
        layerKey: LayerKey.position,
        value: angleX,
      })
    })

    it('returns the `PositionMixin` instance', () => {
      expect(result).toBeInstanceOf(PositionMixin)
    })
  })

  describe('setAngleY', () => {
    const angleY = 10

    beforeEach(() => {
      result = position.setAngleY(angleY)
    })

    it('calls the `validatePositionMixin` function with the correct arguments', () => {
      expect(validatePositionMixinSpy).toHaveBeenCalledWith(PositionMethod.setAngleY, { position: { angleY } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: PositionKey.angleY,
        id,
        layerKey: LayerKey.position,
        value: angleY,
      })
    })

    it('returns the `PositionMixin` instance', () => {
      expect(result).toBeInstanceOf(PositionMixin)
    })
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

  describe('setOrigin', () => {
    const origin = 'top left'

    beforeEach(() => {
      result = position.setOrigin(origin)
    })

    it('calls the `validatePositionMixin` function with the correct arguments', () => {
      expect(validatePositionMixinSpy).toHaveBeenCalledWith(PositionMethod.setOrigin, { position: { origin } })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: PositionKey.origin,
        id,
        layerKey: LayerKey.position,
        value: origin,
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
