import { LayerKey, LayerValidator, WaveformKey, WaveformLayer, WaveformStyle, WaveformStyleValue } from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateColor, validateLayer, validateValueIsInList } from 'utils/validation'
import { validateTimeline } from 'utils/validation/layerConfigs'

export const validateWaveformStyle = (callerName: string, style: WaveformStyle): string | undefined => {
  const acceptedWaveformStyles = Object.values(WaveformStyleValue)

  if (style && !acceptedWaveformStyles.includes(style)) {
    return ValidationErrorText.MUST_BE_TYPE(callerName, WaveformKey.style, style, acceptedWaveformStyles.join(', '))
  }

  return undefined
}

export const validateWaveform: LayerValidator<WaveformLayer> = ({
  callerName,
  layer: {
    waveform: { backgroundColor, color, style },
  },
}) => {
  const errors: string[] = []

  errors.push(
    validateColor(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.waveform, WaveformKey.backgroundColor),
      backgroundColor,
      false
    )
  )
  errors.push(
    validateColor(callerName, ValidationErrorText.SUB_FIELD(LayerKey.waveform, WaveformKey.color), color, false)
  )
  errors.push(
    validateValueIsInList(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.waveform, WaveformKey.style),
      style,
      Object.values(WaveformStyleValue)
    )
  )

  return errors.filter(filterUndefined)
}

export const validateWaveformLayer = (callerName: string, layer: WaveformLayer): void => {
  validateLayer<WaveformLayer>([validateTimeline, validateWaveform], callerName, layer)
}
