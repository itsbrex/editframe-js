import { LayerFormat, LayerFormatValue } from 'constant'
import { VisualMediaErrorText } from 'strings'

export const validateLayerFormat = (format: LayerFormat): void => {
  if (!Object.values(LayerFormatValue).includes(format)) {
    throw new TypeError(VisualMediaErrorText.invalidLayerFormat(format))
  }
}
