import { CompositionInterface, IdentifiedLayer, LayerAttribute } from 'constant'
import { mockComposition } from 'mocks'

import { Layer } from './'

describe('Layer', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let layer: Layer

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
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
    const start = 20

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      layer.setStart(start)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.start, start)
    })
  })

  describe('setLength', () => {
    const length = 20

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      layer.setLength(length)

      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.length, length)
    })
  })
})
