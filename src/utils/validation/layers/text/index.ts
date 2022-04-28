import {
  LayerKey,
  LayerValidator,
  PrimitiveType,
  TextAlignment,
  TextAlignmentValue,
  TextKey,
  TextLayer,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'
import {
  validateBackground,
  validatePosition,
  validateSize,
  validateTimeline,
  validateTrim,
} from 'utils/validation/layerConfigs'

export const validateTextAlignment = (callerName: string, textAlign: TextAlignment): string | undefined => {
  const acceptedHorizontalValues = Object.values(TextAlignmentValue)

  if (textAlign && !acceptedHorizontalValues.includes(textAlign)) {
    return ValidationErrorText.MUST_BE_TYPE(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.textAlign),
      textAlign,
      acceptedHorizontalValues.join(', ')
    )
  }

  return undefined
}

export const validateText: LayerValidator<TextLayer> = ({
  callerName,
  layer: {
    text: { color, fontFamily, fontSize, maxFontSize, maxHeight, maxWidth, text, textAlign },
  },
}) => {
  const errors: string[] = []

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
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.maxFontSize),
      maxFontSize,
      PrimitiveType.number
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.maxHeight),
      maxHeight,
      PrimitiveType.number
    )
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.text, TextKey.maxWidth),
      maxWidth,
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
  errors.push(validateTextAlignment(callerName, textAlign))

  return errors.filter(filterUndefined)
}

export const validateTextLayer = (callerName: string, layer: TextLayer): void =>
  validateLayer<TextLayer>(
    [validateBackground, validatePosition, validateSize, validateText, validateTimeline, validateTrim],
    callerName,
    layer
  )
