import {
  LayerHorizontalAlignment,
  LayerHorizontalAlignmentValue,
  LayerKey,
  LayerValidator,
  LayerVerticalAlignment,
  LayerVerticalAlignmentValue,
  Position,
  PositionKey,
  PrimitiveType,
  X,
  Y,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'

export const validateHorizontalAlignment = (
  callerName: string,
  layerKey: string,
  horizontalAlignment: LayerHorizontalAlignment
): string | undefined => {
  const acceptedHorizontalValues = Object.values(LayerHorizontalAlignmentValue)

  if (horizontalAlignment && !acceptedHorizontalValues.includes(horizontalAlignment)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      layerKey,
      horizontalAlignment,
      acceptedHorizontalValues.join(', ')
    )
  }

  return undefined
}

export const validateVerticalAlignment = (
  callerName: string,
  layerKey: string,
  verticalAlignment: LayerVerticalAlignment
): string | undefined => {
  const acceptedVerticalValues = Object.values(LayerVerticalAlignmentValue)

  if (verticalAlignment && !acceptedVerticalValues.includes(verticalAlignment)) {
    return ValidationErrorText.MUST_BE_TYPE(callerName, layerKey, verticalAlignment, acceptedVerticalValues.join(', '))
  }

  return undefined
}

export const validateX = (callerName: string, layerKey: string, x: X): string | undefined => {
  if (!x) {
    return undefined
  }

  if (typeof x === PrimitiveType.string) {
    return validateHorizontalAlignment(callerName, layerKey, x as LayerHorizontalAlignment)
  } else {
    return validateValueIsOfType(callerName, layerKey, x, PrimitiveType.number)
  }
}

export const validateY = (callerName: string, layerKey: string, y: Y): string | undefined => {
  if (!y) {
    return undefined
  }

  if (typeof y === PrimitiveType.string) {
    return validateVerticalAlignment(callerName, layerKey, y as LayerVerticalAlignment)
  } else {
    return validateValueIsOfType(callerName, layerKey, y, PrimitiveType.number)
  }
}

export const validatePosition: LayerValidator<Position> = ({
  callerName,
  layer: {
    position: { angle, angleX, angleY, isRelative, scale, x, y },
  },
}) => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.position, PositionKey.angle),
      angle,
      PrimitiveType.number
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.position, PositionKey.angleX),
      angleX,
      PrimitiveType.number
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.position, PositionKey.angleY),
      angleY,
      PrimitiveType.number
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.position, PositionKey.isRelative),
      isRelative,
      PrimitiveType.boolean
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.position, PositionKey.scale),
      scale,
      PrimitiveType.number
    )
  )
  errors.push(validateX(callerName, ValidationErrorText.SUB_FIELD(LayerKey.position, PositionKey.x), x))
  errors.push(validateY(callerName, ValidationErrorText.SUB_FIELD(LayerKey.position, PositionKey.y), y))

  return errors.filter(filterUndefined)
}

export const validatePositionMixin = (callerName: string, mixin: Position): void =>
  validateLayer<Position>([validatePosition], callerName, mixin)
