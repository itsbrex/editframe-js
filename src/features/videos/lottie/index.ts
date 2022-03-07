import { CompositionInterface, LayerAttribute, LottieAnimationData, LottieMethod, PrimitiveType } from 'constant'
import { VisualMedia } from 'features/videos/visualMedia'
import { ValidationErrorText } from 'strings'
import { logError, validatePresenceOf, validateValueIsOfType } from 'utils'

export class Lottie extends VisualMedia {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  [LottieMethod.setAnimationData](data: LottieAnimationData): Lottie | void {
    try {
      validatePresenceOf(data, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.data))
      validateValueIsOfType(LottieMethod.setAnimationData, LayerAttribute.data, data, PrimitiveType.object)

      return this._updateAttribute(LayerAttribute.data, data)
    } catch ({ stack }) {
      logError(stack)
    }
  }
}
