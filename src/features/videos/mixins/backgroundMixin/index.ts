import {
  BackgroundKey,
  BackgroundMethod,
  ChildKey,
  CompositionInterface,
  LayerAttributeValue,
  LayerKey,
} from 'constant'
import { Layer } from 'features/videos/layer'
import { validateBackgroundMixin, withValidation } from 'utils'

export class BackgroundMixin extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get backgroundColor(): string | undefined {
    return this._getBackgroundAttribute<string | undefined>(BackgroundKey.color)
  }

  get backgroundOpacity(): number | undefined {
    return this._getBackgroundAttribute<number | undefined>(BackgroundKey.opacity)
  }

  [BackgroundMethod.setBackgroundColor](color?: string): this {
    return withValidation<this>(
      () => {
        validateBackgroundMixin(BackgroundMethod.setBackgroundColor, { background: { color } })
      },
      () => this._setBackgroundAttribute(BackgroundKey.color, color)
    )
  }

  [BackgroundMethod.setBackgroundOpacity](opacity?: number): this {
    return withValidation<this>(
      () => {
        validateBackgroundMixin(BackgroundMethod.setBackgroundOpacity, { background: { opacity } })
      },
      () => this._setBackgroundAttribute(BackgroundKey.opacity, opacity)
    )
  }

  private _getBackgroundAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.background })
  }

  private _setBackgroundAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.background, value })
  }
}
