import { Audio, AudioKey, LayerKey, LayerValidator, PrimitiveType } from 'constant'
import { ValidationErrorText } from 'strings'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'

export const validateAudio: LayerValidator<Audio> = ({
  callerName,
  layer: {
    audio: { volume },
  },
}) => {
  const errors: string[] = []

  errors.push(
    validateValueIsOfType(
      callerName,
      ValidationErrorText.SUB_FIELD(LayerKey.audio, AudioKey.volume),
      volume,
      PrimitiveType.number
    )
  )

  return errors.filter(filterUndefined)
}

export const validateAudioMixin = (callerName: string, mixin: Audio): void =>
  validateLayer<Audio>([validateAudio], callerName, mixin)
