import { BackgroundKey, BackgroundMethod, CompositionInterface, LayerKey } from 'constant'
import { mockComposition } from 'mocks'
import * as BackgroundValidationModule from 'utils/validation/layerConfigs/background'

import { BackgroundMixin } from './'

describe('BackgroundMixin', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let background: BackgroundMixin
  let result: BackgroundMixin | void
  let validateBackgroundMixinSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    compositionMock = mockComposition({
      setLayerAttribute: jest.fn(),
    })
    validateBackgroundMixinSpy = jest.spyOn(BackgroundValidationModule, 'validateBackgroundMixin')

    background = new BackgroundMixin({ composition: compositionMock, id })
  })

  describe('setBackgroundColor', () => {
    const backgroundColor = 'background-color'

    beforeEach(() => {
      result = background.setBackgroundColor(backgroundColor)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateBackgroundMixinSpy).toHaveBeenCalledWith(BackgroundMethod.setBackgroundColor, {
        background: { color: backgroundColor },
      })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: BackgroundKey.color,
        id,
        layerKey: LayerKey.background,
        value: backgroundColor,
      })
    })

    it('returns the `BackgroundMixin` instance', () => {
      expect(result).toBeInstanceOf(BackgroundMixin)
    })
  })

  describe('setBackgroundOpacity', () => {
    const backgroundOpacity = 0.5

    beforeEach(() => {
      result = background.setBackgroundOpacity(backgroundOpacity)
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateBackgroundMixinSpy).toHaveBeenCalledWith(BackgroundMethod.setBackgroundOpacity, {
        background: {
          opacity: backgroundOpacity,
        },
      })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: BackgroundKey.opacity,
        id,
        layerKey: LayerKey.background,
        value: backgroundOpacity,
      })
    })

    it('returns the `BackgroundMixin` instance', () => {
      expect(result).toBeInstanceOf(BackgroundMixin)
    })
  })
})
