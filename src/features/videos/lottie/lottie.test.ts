import { CompositionInterface, IdentifiedLayer, LayerAttribute, LottieMethod, PrimitiveType } from 'constant'
import { mockComposition, mockLottieLayer } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { Lottie } from './'

describe('Lottie', () => {
  const id = 'id'
  const layers: IdentifiedLayer[] = []
  const { data } = mockLottieLayer()
  let compositionMock: CompositionInterface
  let lottie: Lottie
  let validatePresenceOfSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    compositionMock = mockComposition({
      layer: jest.fn(),
      layers,
      updateLayerAttribute: jest.fn(),
    })

    lottie = new Lottie({ composition: compositionMock, id })
  })

  describe('setAnimationData', () => {
    beforeEach(() => {
      lottie.setAnimationData(data)
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(data, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.data))
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        LottieMethod.setAnimationData,
        LayerAttribute.data,
        data,
        PrimitiveType.object
      )
    })

    it('calls the `updateLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.updateLayerAttribute).toHaveBeenCalledWith(id, LayerAttribute.data, data)
    })
  })
})
