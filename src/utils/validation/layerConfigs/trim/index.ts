import { LayerKey, LayerValidator, PrimitiveType, Trim, TrimKey, TrimMethod } from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'

export const validateTrim: LayerValidator<Trim> = ({ callerName, layer: { trim }, shouldThrow = false }) => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.trim, TrimKey.start),
      trim?.start,
      PrimitiveType.number
    )
  )

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.trim, TrimKey.end),
      trim?.end,
      PrimitiveType.number
    )
  )

  if (shouldThrow) {
    throw new Error(errors[0])
  }

  return errors.filter(filterUndefined)
}

export const validateTrimMixin = (callerName: TrimMethod, mixin: Trim): void =>
  validateLayer<Trim>([validateTrim], callerName, mixin)
