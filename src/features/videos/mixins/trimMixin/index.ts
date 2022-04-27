import {
  ChildKey,
  CompositionInterface,
  LayerAttributeValue,
  LayerKey,
  TrimKey,
  TrimMethod,
  TrimOptions,
} from 'constant'
import { Layer } from 'features/videos/layer'
import { validateTrimMixin, withValidation } from 'utils'

export class TrimMixin extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get trim(): TrimOptions {
    return this._composition.getLayerAttribute<TrimOptions>({ id: this.id, layerKey: LayerKey.trim })
  }

  [TrimMethod.setTrim](start = 0, end = this._composition.duration): this {
    return withValidation<this>(
      () => validateTrimMixin(TrimMethod.setTrim, { trim: { end, start } }),
      () => {
        this._setTrimAttribute(TrimKey.start, start < 0 ? 0 : start)

        if (end) {
          this._setTrimAttribute(TrimKey.end, end)
        }

        return this
      }
    )
  }

  private _setTrimAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.trim, value })
  }
}
