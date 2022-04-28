import { LayerKey, LayerValidator, LottieLayer, PrimitiveType } from 'constant'
import { filterUndefined, validateLayer, validateValueIsOfType } from 'utils/validation'
import { validatePosition, validateSize, validateTimeline, validateTrim } from 'utils/validation/layerConfigs'

export const validateLottie: LayerValidator<LottieLayer> = ({ callerName, layer: { lottie: lottieOptions } }) => {
  const errors: string[] = []

  errors.push(validateValueIsOfType(callerName, LayerKey.lottie, lottieOptions, PrimitiveType.object))

  return errors.filter(filterUndefined)
}

export const validateLottieLayer = (callerName: string, layer: LottieLayer): void => {
  validateLayer<LottieLayer>(
    [validateLottie, validatePosition, validateSize, validateTimeline, validateTrim],
    callerName,
    layer
  )
}
