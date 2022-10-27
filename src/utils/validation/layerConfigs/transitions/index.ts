import {
  LayerKey,
  LayerValidator,
  PrimitiveType,
  TransitionFadeOptions,
  TransitionKey,
  TransitionOptionKey,
  TransitionParameterOptions,
  TransitionType,
  Transitions,
  TransitionsMethod,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { assertType, filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'

const isFadeTransition = (options: Record<string, any>): options is TransitionFadeOptions =>
  options &&
  Object.keys(options).length === 1 &&
  TransitionOptionKey.duration in options &&
  assertType(options[TransitionOptionKey.duration], PrimitiveType.number)

const isParameterTransition = (options: Record<string, any>): options is TransitionParameterOptions =>
  options &&
  [2, 3].includes(Object.keys(options).length) &&
  TransitionOptionKey.time in options &&
  assertType(options[TransitionOptionKey.value], PrimitiveType.number) &&
  TransitionOptionKey.value in options &&
  assertType(options[TransitionOptionKey.value], PrimitiveType.number)

export const validateTransitions: LayerValidator<Transitions> = ({ callerName, layer: { transitions } }) => {
  const errors: string[] = []

  transitions.forEach(({ options, type }) => {
    if (isParameterTransition(options)) {
      errors.push(
        validateValueIsOfType(
          callerName,
          ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.options),
          options?.easing,
          PrimitiveType.string
        ),
        validateValueIsOfType(
          callerName,
          ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.options),
          options?.time,
          PrimitiveType.number
        ),
        validateValueIsOfType(
          callerName,
          ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.options),
          options?.value,
          PrimitiveType.number
        )
      )
    } else if (isFadeTransition(options)) {
      errors.push(
        validateValueIsOfType(
          callerName,
          ValidationErrorText.SUB_FIELD(LayerKey.transitions, TransitionKey.options),
          options?.duration,
          PrimitiveType.number
        )
      )
    }

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
