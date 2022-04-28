import { Mixin } from 'ts-mixer'

import { CompositionInterface, LayerType } from 'constant'
import { AudioMixin } from 'features/videos/mixins/audioMixin'
import { TimelineMixin } from 'features/videos/mixins/timelineMixin'
import { TrimMixin } from 'features/videos/mixins/trimMixin'

export class Audio extends Mixin(AudioMixin, TimelineMixin, TrimMixin) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get type(): LayerType {
    return LayerType.audio
  }
}
