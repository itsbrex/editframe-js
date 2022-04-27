import { CompositionInterface, LayerKey, TimelineKey } from 'constant'
import { mockComposition } from 'mocks'

import { Layer } from './'

describe('Layer', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let layer: Layer

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    compositionMock = mockComposition({
      getLayerAttribute: jest.fn(),
      setLayerAttribute: jest.fn(),
    })

    layer = new Layer({ composition: compositionMock, id })
  })

  describe('id', () => {
    it('returns the correct id', () => {
      expect(layer.id).toEqual(id)
    })
  })

  describe('getAttribute', () => {
    it('calls the `getAttribute` method on the `composition` with the correct arguments', () => {
      const childKey = TimelineKey.start
      const layerKey = LayerKey.audio

      layer.getAttribute({ childKey, layerKey })

      expect(compositionMock.getLayerAttribute).toHaveBeenCalledWith({ childKey, id, layerKey })
    })
  })

  describe('setAttribute', () => {
    it('calls the `setAttribute` method on the `composition` with the correct arguments', () => {
      const childKey = TimelineKey.start
      const layerKey = LayerKey.audio
      const value = 10

      layer.setAttribute({ childKey, layerKey, value })

      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({ childKey, id, layerKey, value })
    })
  })
})
