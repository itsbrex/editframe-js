import { LayerFormat, LayerFormatValue, LayerHorizontalAlignment, LayerHorizontalAlignmentValue } from 'constant'
import { TextErrorText, VisualMediaErrorText } from 'strings'

export const validateLayerFormat = (format: LayerFormat): string | undefined => {
  if (Object.values(LayerFormatValue).includes(format)) {
    return undefined
  }

  return VisualMediaErrorText.invalidLayerFormat(format)
}

export const validateTextAligment = (textAlignment: LayerHorizontalAlignment): string | undefined => {
  if (Object.values(LayerHorizontalAlignmentValue).includes(textAlignment)) {
    return undefined
  }

  return TextErrorText.invalidTextAlignment(textAlignment)
}
