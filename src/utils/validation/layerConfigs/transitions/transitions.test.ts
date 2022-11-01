import { EasingType, LayerKey, PrimitiveType, TransitionKey, TransitionType, TransitionsMethod } from 'constant'
import { mockTransitionsOptions } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { validateTransitions, validateTransitionsMixin } from './'

describe('validateTransitions', () => {
  const callerName = 'caller-name'
  const duration = 5
  const easing = EasingType.easeIn
  const time = 10
  const value = 200
  const type = TransitionType.crossfadeIn
  let validateValueIsOfTypeSpy: jest.SpyInstance

  describe('when the transition is of interface `TransitionFade`', () => {
    beforeEach(() => {
      validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

      validateTransitions({ callerName, layer: { transitions: [{ options: { duration }, type }] } })
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.options),
        duration,
        PrimitiveType.number
      )
    })
  })

  describe('when the transition is of interface `TransitionParameter`', () => {
    beforeEach(() => {
      validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

      validateTransitions({ callerName, layer: { transitions: [{ options: { easing, time, value }, type }] } })
    })

    it('calls the `validateValueIsOfType` function with the correct arguments', () => {
      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.options),
        easing,
        PrimitiveType.string
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.options),
        time,
        PrimitiveType.number
      )

      expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.options),
        value,
        PrimitiveType.number
      )
    })
  })

  it('returns the correct errors when an invalid transition `type` is provided', () => {
    const type = 'fake-transition'

    expect(
      validateTransitions({ callerName, layer: { transitions: [{ options: { duration }, type: type as any }] } })
    ).toEqual([
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        TransitionKey.type,
        type,
        `${Object.values(TransitionType).join(', ')}`
      ),
    ])
  })

  it('returns the correct errors when less than 2 transitions are provided for parameter transitions', () => {
    const type = TransitionType.x

    expect(
      validateTransitions({
        callerName,
        layer: { transitions: [{ options: { time: 0, value: 10 }, type }] },
      })
    ).toEqual([ValidationErrorText.TWO_TRANSITIONS_REQUIRED(type)])
  })
})

describe('validateTransitionsMixin', () => {
  const callerName = TransitionsMethod.addTransition
  const transitions = mockTransitionsOptions()
  const layer = { transitions }
  let validateLayerSpy: jest.SpyInstance

  beforeEach(() => {
    validateLayerSpy = jest.spyOn(ValidationUtilsModule, 'validateLayer')
  })

  it('calls the `validateLayer` function with the correct arguments', () => {
    validateTransitionsMixin(callerName, layer)

    expect(validateLayerSpy).toHaveBeenCalledWith([validateTransitions], callerName, layer)
  })
})
