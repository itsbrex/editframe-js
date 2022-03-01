import { LayerFormat, LayerFormatValue, LayerHorizontalAlignment, LayerHorizontalAlignmentValue } from 'constant'
import { TextErrorText, VisualMediaErrorText } from 'strings'

export const validateLayerFormat = (format: LayerFormat): void => {
  if (!Object.values(LayerFormatValue).includes(format)) {
    throw new TypeError(VisualMediaErrorText.invalidLayerFormat(format))
  }
}

export const validateTextAligment = (textAlignment: LayerHorizontalAlignment): void => {
  if (!Object.values(LayerHorizontalAlignmentValue).includes(textAlignment)) {
    throw new TypeError(TextErrorText.invalidTextAlignment(textAlignment))
  }
}
