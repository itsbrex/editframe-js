import { LayerKey, LottieLayerConfig, LottieMethod, PrimitiveType } from 'constant'
import { Composition } from 'features/videos/composition'
import { mockApi, mockLottieOptions } from 'mocks'
import { ValidationErrorText } from 'strings'
import { makeDefaultLottieLayerConfig } from 'utils'
import * as ValidationUtilsModule from 'utils/validation'

import { Lottie } from './'

describe('Lottie', () => {
  const lottieOptions = mockLottieOptions()
  const newLottieOptions = mockLottieOptions({
    assets: [],
    ddd: 20,
    fr: 30,
    h: 40,
    ip: 50,
    layers: [],
    nm: 'nm',
    op: 60,
    v: 'v',
    w: 70,
  })
  let defaultLottieLayerConfig: LottieLayerConfig
  let composition: Composition
  let lottie: Lottie
  let result: Lottie | void
  let validatePresenceOfSpy: jest.SpyInstance
  let validateValueIsOfTypeSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    composition = new Composition({
      api: mockApi({ get: jest.fn(), post: jest.fn(), put: jest.fn() }),
      formData: { append: jest.fn() },
      options: { dimensions: { height: 1080, width: 1920 }, duration: 10 },
    })
    defaultLottieLayerConfig = makeDefaultLottieLayerConfig(composition.dimensions)
    validatePresenceOfSpy = jest.spyOn(ValidationUtilsModule, 'validatePresenceOf')
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')
    lottie = composition.addLottie(lottieOptions)

    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('sets the correct options and defaults', () => {
      expect(lottie.animationData).toEqual(lottieOptions)
    })

    it('sets the correct default layer configs', () => {
      expect(lottie.start).toEqual(defaultLottieLayerConfig.timeline.start)
      expect(lottie.trim).toEqual(defaultLottieLayerConfig.trim)
    })
  })

  describe('setAnimationData', () => {
    beforeEach(() => {
      result = lottie.setAnimationData(newLottieOptions)
    })

    it('calls the `validatePresenceOf` function with the correct arguments', () => {
      expect(validatePresenceOfSpy).toHaveBeenCalledWith(
        newLottieOptions,
        ValidationErrorText.REQUIRED_FIELD(LayerKey.lottie)
      )
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        LottieMethod.setAnimationData,
        LayerKey.lottie,
        newLottieOptions,
        PrimitiveType.object
      )
    })

    it('sets the lottie options', () => {
      expect(lottie.animationData).toEqual(newLottieOptions)
    })

    it('returns the `Lottie` instance', () => {
      expect(result).toBeInstanceOf(Lottie)
    })
  })
})
