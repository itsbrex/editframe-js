import { LayerFormat, LayerFormatValue, LayerHorizontalAlignment, LayerHorizontalAlignmentValue } from 'constant'
import { TextErrorText, VisualMediaErrorText } from 'strings'

export const validateLayerFormat = (format: LayerFormat): void => {
  if (!Object.values(LayerFormatValue).includes(format)) {
    throw new Error(VisualMediaErrorText.invalidLayerFormat(format))
  }
}

export const validateTextAligment = (textAlignment: LayerHorizontalAlignment): void => {
  if (!Object.values(LayerHorizontalAlignmentValue).includes(textAlignment)) {
    throw new Error(TextErrorText.invalidTextAlignment(textAlignment))
  }
}
