import {
  CompositionInterface,
  LayerKey,
  TransitionOptions,
  TransitionTypes,
  TransitionsMethod,
  TransitionsToOptions,
} from 'constant'
import { Layer } from 'features/videos/layer'
import { deepClone, validateTransitionsMixin, withValidation } from 'utils'

export class TransitionsMixin extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get transitions(): TransitionOptions[] {
    return this.getAttribute<TransitionOptions[]>({ layerKey: LayerKey.transitions })
  }

  [TransitionsMethod.addTransition]<TransitionType extends keyof TransitionsToOptions>({
    options,
    type,
  }: {
    options: TransitionsToOptions[TransitionType]
    type: TransitionTypes
  }): this {
    return withValidation<this>(
      () => validateTransitionsMixin(TransitionsMethod.addTransition, { transitions: [{ options, type }] }),
      () =>
        this.setAttribute({
          layerKey: LayerKey.transitions,
          value: deepClone([...(this.transitions || []), { options, type }]),
        })
    )
  }

  [TransitionsMethod.setTransitions](transitions: TransitionOptions[]): this {
    return withValidation<this>(
      () => validateTransitionsMixin(TransitionsMethod.setTransitions, { transitions }),
      () =>
        this.setAttribute({
          layerKey: LayerKey.transitions,
          value: transitions,
        })
    )
  }
}
