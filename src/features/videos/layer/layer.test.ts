import { CompositionInterface, IdentifiedLayer, LayerAttribute, LayerMethod, PrimitiveType } from 'constant'
import { mockComposition } from 'mocks'
import * as ValidationUtilsModule from 'utils/validation'

import { Layer } from './'

describe('Layer', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let layer: Layer
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    layer = new Layer({ composition: compositionMock, id })
  })

  it('sets the `id` property to the value passed into the constructor', () => {
    expect(layer.id).toEqual(id)
  })

  describe('setStart', () => {
    it('calls the `validateValueIsOfType` function', () => {
      const start = 5

      layer.setStart(start)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        LayerMethod.setStart,
        LayerAttribute.start,
        start,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      const start = 20

      layer.setStart(start)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
    })
  })

  describe('setLength', () => {
    it('calls the `validateValueIsOfType` function', () => {
      const length = 5

      layer.setLength(length)

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        LayerMethod.setLength,
        LayerAttribute.length,
        length,
        PrimitiveType.number,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      const length = 20

      layer.setLength(length)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.length, length)
    })
  })
})
