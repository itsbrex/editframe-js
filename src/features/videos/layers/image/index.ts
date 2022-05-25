import { Mixin } from 'ts-mixer'

import { CompositionInterface, LayerType } from 'constant'
import { BackgroundMixin } from 'features/videos/mixins/backgroundMixin'
import { PositionMixin } from 'features/videos/mixins/positionMixin'
import { SizeMixin } from 'features/videos/mixins/sizeMixin'
import { TimelineMixin } from 'features/videos/mixins/timelineMixin'
import { TransitionsMixin } from 'features/videos/mixins/transitionMixin'
import { TrimMixin } from 'features/videos/mixins/trimMixin'

export class Image extends Mixin(
  BackgroundMixin,
  PositionMixin,
  SizeMixin,
  TimelineMixin,
  TransitionsMixin,
  TrimMixin
) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get type(): LayerType {
    return LayerType.image
  }
}
