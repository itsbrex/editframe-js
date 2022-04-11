import { CompositionInterface, IdentifiedLayer, LayerAttribute, PositionableMediaMethod, PrimitiveType } from 'constant'
import { mockComposition } from 'mocks'
import * as ValidationUtilsModule from 'utils/validation'
import * as VideoLayersUtilsModule from 'utils/video/layers'

import { PositionableMedia } from './'

describe('PositionableMedia', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  let compositionMock: CompositionInterface
  let positionableMedia: PositionableMedia
  let validateValueIsOfTypeSpy: jest.SpyInstance
  let validateXSpy: jest.SpyInstance
  let validateYSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    validateXSpy = jest.spyOn(VideoLayersUtilsModule, 'validateX')
    validateYSpy = jest.spyOn(VideoLayersUtilsModule, 'validateY')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    positionableMedia = new PositionableMedia({ composition: compositionMock, id })
  })

  describe('setIsRelative', () => {
    const isRelative = true

    beforeEach(() => {
      positionableMedia.setIsRelative(isRelative)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        PositionableMediaMethod.setIsRelative,
        LayerAttribute.isRelative,
        isRelative,
        PrimitiveType.boolean,
        true
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.isRelative, isRelative)
    })
  })

  describe('setX', () => {
    const x = 20

    beforeEach(() => {
      positionableMedia.setX(x)
    })

    it('calls the `validateX` function with the correct arguments', () => {
      expect(validateXSpy).toHaveBeenCalledWith(PositionableMediaMethod.setX, x)
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
      expect(validateYSpy).toHaveBeenCalledWith(PositionableMediaMethod.setY, y)
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.y, y)
    })
  })
})
