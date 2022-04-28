import { Mixin } from 'ts-mixer'

import { CompositionInterface, LayerType } from 'constant'
import { AudioMixin } from 'features/videos/mixins/audioMixin'
import { BackgroundMixin } from 'features/videos/mixins/backgroundMixin'
import { PositionMixin } from 'features/videos/mixins/positionMixin'
import { SizeMixin } from 'features/videos/mixins/sizeMixin'
import { TimelineMixin } from 'features/videos/mixins/timelineMixin'
import { TrimMixin } from 'features/videos/mixins/trimMixin'

export class Video extends Mixin(AudioMixin, BackgroundMixin, PositionMixin, SizeMixin, TimelineMixin, TrimMixin) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get type(): LayerType {
    return LayerType.video
  }
}
