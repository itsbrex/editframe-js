import {
  AudioLayer,
  FilterLayer,
  LayerAlignment,
  LayerAttribute,
  LayerBase,
  LayerHorizontalAlignment,
  LayerHorizontalAlignmentValue,
  LayerText,
  LayerTrim,
  LayerVerticalAlignmentValue,
  LayerVisualMedia,
  PrimitiveType,
} from 'constant'
import { ValidationErrorText } from 'strings'
import { validateValueIsOfType } from 'utils/validation'
import { validateFilter } from 'utils/video/filters'

export const validateLayerBase = (callerName: string, { length, start }: LayerBase): void => {
  validateValueIsOfType(callerName, LayerAttribute.start, start, PrimitiveType.number)
  validateValueIsOfType(callerName, LayerAttribute.length, length, PrimitiveType.number)
}

export const validateLayerFilter = (callerName: string, { filter }: FilterLayer): void =>
  validateFilter(callerName, LayerAttribute.filter, filter)

export const validateLayerTrim = (callerName: string, { trim }: LayerTrim): void => {
  validateValueIsOfType(
    callerName,
    ValidationErrorText.SUB_FIELD(LayerAttribute.trim, LayerAttribute.start),
    trim?.start,
    PrimitiveType.number
  )
  validateValueIsOfType(
    callerName,
    ValidationErrorText.SUB_FIELD(LayerAttribute.trim, LayerAttribute.end),
    trim?.end,
    PrimitiveType.number
  )
}

export const validateLayerVisualMedia = (
  callerName: string,
  { backgroundColor, color, x, y }: LayerVisualMedia
): void => {
  validateValueIsOfType(callerName, LayerAttribute.backgroundColor, backgroundColor, PrimitiveType.string)
  validateValueIsOfType(callerName, LayerAttribute.color, color, PrimitiveType.string)
  validateValueIsOfType(callerName, LayerAttribute.x, x, PrimitiveType.number)
  validateValueIsOfType(callerName, LayerAttribute.y, y, PrimitiveType.number)
}

export const validateLayerAudio = (callerName: string, options: AudioLayer): void => {
  validateValueIsOfType(callerName, LayerAttribute.volume, options.volume, PrimitiveType.number)
}

export const validateHorizontalAlignment = (
  callerName: string,
  layerAttribute: string,
  horizontalAlignment: LayerHorizontalAlignment
): void => {
  const acceptedHorizontalValues = Object.values(LayerHorizontalAlignmentValue)

  if (horizontalAlignment && !acceptedHorizontalValues.includes(horizontalAlignment)) {
    throw new Error(
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        layerAttribute,
        horizontalAlignment,
        acceptedHorizontalValues.join(', ')
      )
    )
  }
}

export const validateLayerAlignment = (
  callerName: string,
  { horizontalAlignment, verticalAlignment }: LayerAlignment
): void => {
  validateHorizontalAlignment(callerName, LayerAttribute.horizontalAlignment, horizontalAlignment)
  const acceptedVerticalValues = Object.values(LayerVerticalAlignmentValue)

  if (verticalAlignment && !acceptedVerticalValues.includes(verticalAlignment)) {
    throw new Error(
      ValidationErrorText.MUST_BE_TYPE(
        callerName,
        LayerAttribute.verticalAlignment,
        verticalAlignment,
        acceptedVerticalValues.join(', ')
      )
    )
  }
}

export const validateLayerText = (
  callerName: string,
  { fontFamily, fontSize, maxFontSize, maxHeight, maxWidth, text, textAlignment }: LayerText
): void => {
  validateValueIsOfType(callerName, LayerAttribute.fontFamily, fontFamily, PrimitiveType.string)
  validateValueIsOfType(callerName, LayerAttribute.fontSize, fontSize, PrimitiveType.number)
  validateValueIsOfType(callerName, LayerAttribute.maxFontSize, maxFontSize, PrimitiveType.number)
  validateValueIsOfType(callerName, LayerAttribute.maxHeight, maxHeight, PrimitiveType.number)
  validateValueIsOfType(callerName, LayerAttribute.maxWidth, maxWidth, PrimitiveType.number)
  validateValueIsOfType(callerName, LayerAttribute.text, text, PrimitiveType.string)
  validateHorizontalAlignment(callerName, LayerAttribute.textAlignment, textAlignment)
}
