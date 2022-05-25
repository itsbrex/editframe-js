import { CompositionInterface, LayerKey, TransitionOptions, TransitionTypes, TransitionsMethod } from 'constant'
import { Layer } from 'features/videos/layer'
import { deepClone, validateTransitionsMixin, withValidation } from 'utils'

export class TransitionsMixin extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get transitions(): TransitionOptions[] {
    return this.getAttribute<TransitionOptions[]>({ layerKey: LayerKey.transitions })
  }

  [TransitionsMethod.addTransition]({
    duration,
    options = {},
    type,
  }: {
    duration: number
    options?: Record<string, any>
    type: TransitionTypes
  }): this {
    return withValidation<this>(
      () => validateTransitionsMixin(TransitionsMethod.addTransition, { transitions: [{ duration, options, type }] }),
      () =>
        this.setAttribute({
          layerKey: LayerKey.transitions,
          value: deepClone([...(this.transitions || []), { duration, options, type }]),
        })
    )
  }
}
