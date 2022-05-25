import {
  LayerKey,
  LayerValidator,
  PrimitiveType,
  TransitionKey,
  TransitionType,
  Transitions,
  TransitionsMethod,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'

export const validateTransitions: LayerValidator<Transitions> = ({ callerName, layer: { transitions } }) => {
  const errors: string[] = []

  transitions.forEach(({ duration, type }) => {
    errors.push(
      validateValueIsOfType(
        callerName,
        ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.duration),
        duration,
        PrimitiveType.number
      )
    )

    const isTransitionTypeValid = Object.values(TransitionType).includes(type)

    if (!isTransitionTypeValid) {
      const message = ValidationErrorText.MUST_BE_TYPE(
        callerName,
        TransitionKey.type,
        type,
        `${Object.values(TransitionType).join(', ')}`
      )

      errors.push(message)
    }
  })

  return errors.filter(filterUndefined)
}

export const validateTransitionsMixin = (callerName: TransitionsMethod, mixin: Transitions): void =>
  validateLayer<Transitions>([validateTransitions], callerName, mixin)
