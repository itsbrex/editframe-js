import { CompositionInterface, IdentifiedLayer, LayerAttribute, VisualMediaMethod } from 'constant'
import { mockComposition } from 'mocks'
import * as VideoLayersUtilsModule from 'utils/video/layers'

import { PositionableMedia } from './'

describe('PositionableMedia', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let positionableMedia: PositionableMedia
  let validateXSpy: jest.SpyInstance
  let validateYSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateXSpy = jest.spyOn(VideoLayersUtilsModule, 'validateX')
    validateYSpy = jest.spyOn(VideoLayersUtilsModule, 'validateY')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    positionableMedia = new PositionableMedia({ composition: compositionMock, id })
  })

  describe('setX', () => {
    const x = 20

    beforeEach(() => {
      positionableMedia.setX(x)
    })

    it('calls the `validateX` function with the correct arguments', () => {
      expect(validateXSpy).toHaveBeenCalledWith(VisualMediaMethod.setX, x)
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.x, x)
    })
  })

  describe('setY', () => {
    const y = 20

    beforeEach(() => {
      positionableMedia.setY(y)
    })

    it('calls the `validateY` function with the correct arguments', () => {
      expect(validateYSpy).toHaveBeenCalledWith(VisualMediaMethod.setY, y)
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.y, y)
    })
  })
})
