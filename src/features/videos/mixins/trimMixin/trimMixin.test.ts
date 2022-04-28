import { CompositionInterface, LayerKey, TrimKey, TrimMethod } from 'constant'
import { mockComposition } from 'mocks'
import * as TrimValidationModule from 'utils/validation/layerConfigs/trim'

import { TrimMixin } from './'

describe('TrimMixin', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let trim: TrimMixin
  let result: TrimMixin | void
  let validateTrimMixinSpy: jest.SpyInstance

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    compositionMock = mockComposition({
      setLayerAttribute: jest.fn(),
    })
    validateTrimMixinSpy = jest.spyOn(TrimValidationModule, 'validateTrimMixin')

    trim = new TrimMixin({ composition: compositionMock, id })
  })

  describe('setTrim', () => {
    const start = 10
    const end = 30

    beforeEach(() => {
      result = trim.setTrim(start)
    })

    it('calls the `validateTrim` function with the correct arguments', () => {
      expect(validateTrimMixinSpy).toHaveBeenCalledWith(TrimMethod.setTrim, {
        trim: { end: compositionMock.duration, start },
      })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        childKey: TrimKey.start,
        id,
        layerKey: LayerKey.trim,
        value: start,
      })
      expect(compositionMock.setLayerAttribute).not.toHaveBeenCalledWith({
        childKey: TrimKey.end,
        id,
        layerKey: LayerKey.trim,
        value: end,
      })
    })

    it('returns the `TrimMixin` instance', () => {
      expect(result).toBeInstanceOf(TrimMixin)
    })

    describe('when an `end` argument is provided', () => {
      beforeEach(() => {
        trim.setTrim(start, end)
      })

      it('calls the `validateTrim` function with the correct arguments', () => {
        expect(validateTrimMixinSpy).toHaveBeenCalledWith(TrimMethod.setTrim, { trim: { end, start } })
      })

      it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
        expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
          childKey: TrimKey.start,
          id,
          layerKey: LayerKey.trim,
          value: start,
        })
        expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
          childKey: TrimKey.end,
          id,
          layerKey: LayerKey.trim,
          value: end,
        })
      })
    })
  })
})
