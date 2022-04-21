import { Background, BackgroundKey, LayerKey, LayerValidator, PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'

export const validateBackground: LayerValidator<Background> = ({
  callerName,
  layer: {
    background: { color, opacity },
  },
}) => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.background, BackgroundKey.color),
      color,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.background, BackgroundKey.opacity),
      opacity,
      PrimitiveType.number
    )
  )

  return errors.filter(filterUndefined)
}

export const validateBackgroundMixin = (callerName: string, mixin: Background): void =>
  validateLayer<Background>([validateBackground], callerName, mixin)
