import { CompositionInterface, LayerKey, TransitionsMethod } from 'constant'
import { mockComposition } from 'mocks'
import * as TransitionsValidationModule from 'utils/validation/layerConfigs/transitions'

import { TransitionsMixin } from './'

describe('TransitionsMixin', () => {
  const id = 'id'
  let compositionMock: CompositionInterface
  let transitions: TransitionsMixin
  let result: TransitionsMixin | void
  let validateTransitionsMixinSpy: jest.SpyInstance

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    compositionMock = mockComposition({
      setLayerAttribute: jest.fn(),
    })
    validateTransitionsMixinSpy = jest.spyOn(TransitionsValidationModule, 'validateTransitionsMixin')

    transitions = new TransitionsMixin({ composition: compositionMock, id })
  })

  describe('addTransition', () => {
    const duration = 5
    const type = 'crossfadeIn'

    beforeEach(() => {
      result = transitions.addTransition({ duration, type })
    })

    it('calls the `validateTimelineMixin` function with the correct arguments', () => {
      expect(validateTransitionsMixinSpy).toHaveBeenCalledWith(TransitionsMethod.addTransition, {
        transitions: [{ duration, options: {}, type }],
      })
    })

    it('calls the `setLayerAttribute` method on the composition with the correct arguments', () => {
      expect(compositionMock.setLayerAttribute).toHaveBeenCalledWith({
        id,
        layerKey: LayerKey.transitions,
        value: [{ duration, options: {}, type }],
      })
    })

    it('returns the `TransitionsMixin` instance', () => {
      expect(result).toBeInstanceOf(TransitionsMixin)
    })
  })
})
