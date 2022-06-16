import { LayerKey, LayerValidator, PrimitiveType, SubtitlesKey, SubtitlesLayer } from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateColor, validateLayer, validateValueIsOfType } from 'utils/validation'
import { validatePosition, validateTimeline, validateTrim } from 'utils/validation/layerConfigs'

export const validateSubtitles: LayerValidator<SubtitlesLayer> = ({
  callerName,
  layer: {
    subtitles: { backgroundColor, color, fontSize },
  },
}) => {
  const errors: string[] = []

  errors.push(
    validateColor(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.subtitles, SubtitlesKey.backgroundColor),
      backgroundColor,
      false
    )
  )
  errors.push(
    validateColor(callerName, ValidationErrorText.SUB_FIELD(LayerKey.subtitles, SubtitlesKey.color), color, false)
  )
  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.subtitles, SubtitlesKey.fontSize),
      fontSize,
      PrimitiveType.number
    )
  )

  return errors.filter(filterUndefined)
}

export const validateSubtitlesLayer = (callerName: string, layer: SubtitlesLayer): void =>
  validateLayer<SubtitlesLayer>(
    [validatePosition, validateSubtitles, validateTimeline, validateTrim],
    callerName,
    layer
  )
