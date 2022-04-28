import { Mixin } from 'ts-mixer'

import { CompositionInterface, LayerKey, LayerType, LottieAnimationData, LottieMethod, PrimitiveType } from 'constant'
import { PositionMixin } from 'features/videos/mixins/positionMixin'
import { SizeMixin } from 'features/videos/mixins/sizeMixin'
import { TimelineMixin } from 'features/videos/mixins/timelineMixin'
import { TrimMixin } from 'features/videos/mixins/trimMixin'
import { ValidationErrorText } from 'strings'
import { validatePresenceOf, validateValueIsOfType, withValidation } from 'utils'

export class Lottie extends Mixin(PositionMixin, SizeMixin, TimelineMixin, TrimMixin) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get type(): LayerType {
    return LayerType.lottie
  }

  get animationData(): LottieAnimationData {
    return this.getAttribute<LottieAnimationData>({ layerKey: LayerKey.lottie })
  }

  [LottieMethod.setAnimationData](data: LottieAnimationData): Lottie {
    return withValidation<this>(
      () => {
        validatePresenceOf(data, ValidationErrorText.REQUIRED_FIELD(LayerKey.lottie))
        validateValueIsOfType(LottieMethod.setAnimationData, LayerKey.lottie, data, PrimitiveType.object)
      },
      () => this.setAttribute({ layerKey: LayerKey.lottie, value: data })
    )
  }
}
