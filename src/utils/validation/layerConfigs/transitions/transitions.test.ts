import { LayerKey, PrimitiveType, TransitionKey, TransitionType, TransitionsMethod } from 'constant'
import { mockTransitionsOptions } from 'mocks'
import { ValidationErrorText } from 'strings'
import * as ValidationUtilsModule from 'utils/validation'

import { validateTransitions, validateTransitionsMixin } from './'

describe('validateTransitions', () => {
  const callerName = 'caller-name'
  const duration = 5
  const type = TransitionType.crossfadeIn
  let validateValueIsOfTypeSpy: jest.SpyInstance

  beforeEach(() => {
    validateValueIsOfTypeSpy = jest.spyOn(ValidationUtilsModule, 'validateValueIsOfType')

    validateTransitions({ callerName, layer: { transitions: [{ duration, type }] } })
  })

  it('calls the `validateValueIsOfType` function with the correct arguments', () => {
    expect(validateValueIsOfTypeSpy).toHaveBeenCalledWith(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.duration),
      duration,
      PrimitiveType.number
    )
  })

  it('returns the correct errors when an invalid transition `type` is provided', () => {
    const type = 'fake-transition'

    expect(validateTransitions({ callerName, layer: { transitions: [{ duration, type: type as any }] } })).toEqual([
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        TransitionKey.type,
        type,
        `${Object.values(TransitionType).join(', ')}`
      ),
    ])
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
