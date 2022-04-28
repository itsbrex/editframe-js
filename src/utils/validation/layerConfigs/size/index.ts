import { FormatValue, LayerKey, LayerValidator, PrimitiveType, Size, SizeKey } from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsInList, validateValueIsOfType } from 'utils/validation'

export const validateSize: LayerValidator<Size> = ({
  callerName,
  layer: {
    size: { format, height, width },
  },
}) => {
  const errors: string[] = []

  errors.push(
    validateValueIsInList(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.size, SizeKey.format),
      format,
      Object.values(FormatValue)
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.size, SizeKey.height),
      height,
      PrimitiveType.number
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.size, SizeKey.width),
      width,
      PrimitiveType.number
    )
  )

  return errors.filter(filterUndefined)
}

export const validateSizeMixin = (callerName: string, mixin: Size): void =>
  validateLayer<Size>([validateSize], callerName, mixin)
