import {
  FontStyle,
  FontStyleValue,
  FontWeight,
  FontWeightValue,
  LayerKey,
  LayerValidator,
  PrimitiveType,
  TextAlign,
  TextAlignValue,
  TextHorizontalPositionValue,
  TextKey,
  TextLayer,
  TextPosition,
  TextVerticalPositionValue,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'
import { validatePosition, validateSize, validateTimeline, validateTrim } from 'utils/validation/layerConfigs'

export const validateTextAlign = (callerName: string, textAlign: TextAlign): string | undefined => {
  const acceptedValues = Object.values(TextAlignValue)

  if (!acceptedValues.includes(textAlign)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.textAlign),
      textAlign,
      acceptedValues.join(', ')
    )
  }

  return undefined
}

export const validateTextPosition = (callerName: string, textPosition?: TextPosition): string | undefined => {
  const acceptedHorizontalValues = Object.values(TextHorizontalPositionValue)
  const acceptedVerticalValues = Object.values(TextVerticalPositionValue)

  if (textPosition && textPosition.x && !acceptedHorizontalValues.includes(textPosition.x)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, ValidationErrorText.SUB_FIELD(TextKey.textPosition, 'x')),
      textPosition.x,
      acceptedHorizontalValues.join(', ')
    )
  }

  if (textPosition && textPosition.y && !acceptedVerticalValues.includes(textPosition.y)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, ValidationErrorText.SUB_FIELD(TextKey.textPosition, 'y')),
      textPosition.y,
      acceptedVerticalValues.join(', ')
    )
  }

  return undefined
}

export const validateFontStyle = (callerName: string, fontStyle: FontStyle): string | undefined => {
  const acceptedValues = Object.values(FontStyleValue)

  if (fontStyle && !acceptedValues.includes(fontStyle)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.fontStyle),
      fontStyle,
      acceptedValues.join(', ')
    )
  }

  return undefined
}

export const validateFontWeight = (callerName: string, fontWeight: FontWeight): string | undefined => {
  const acceptedValues = Object.values(FontWeightValue)

  if (fontWeight && !acceptedValues.includes(fontWeight)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.fontWeight),
      fontWeight,
      acceptedValues.join(', ')
    )
  }

  return undefined
}

export const validateText: LayerValidator<TextLayer> = ({
  callerName,
  layer: {
    text: {
      backgroundColor,
      backgroundTransform,
      border,
      borderRadius,
      color,
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight,
      lineHeight,
      padding,
      text,
      textAlign,
      textDecoration,
      textPosition,
      textTransform,
    },
  },
}) => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.backgroundColor),
      backgroundColor,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.backgroundTransform),
      backgroundTransform,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.border),
      border,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.borderRadius),
      borderRadius,
      PrimitiveType.number
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.color),
      color,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.fontFamily),
      fontFamily,
      PrimitiveType.string
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.fontSize),
      fontSize,
      PrimitiveType.number
    )
  )
  errors.push(validateFontStyle(callerName, fontStyle))
  errors.push(validateFontWeight(callerName, fontWeight))
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.lineHeight),
      lineHeight,
      PrimitiveType.number
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.padding),
      padding,
      PrimitiveType.number
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.text),
      text,
      PrimitiveType.string
    )
  )
  errors.push(validateTextAlign(callerName, textAlign))
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.textDecoration),
      textDecoration,
      PrimitiveType.string
    )
  )
  errors.push(validateTextPosition(callerName, textPosition))
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.textTransform),
      textTransform,
      PrimitiveType.string
    )
  )

  return errors.filter(filterUndefined)
}

export const validateTextLayer = (callerName: string, layer: TextLayer): void =>
  validateLayer<TextLayer>(
    [validatePosition, validateSize, validateText, validateTimeline, validateTrim],
    callerName,
    layer
  )
