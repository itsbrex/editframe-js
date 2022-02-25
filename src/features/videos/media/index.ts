import { CompositionInterface, LayerAttribute, LayerAttributeValue, Trim } from 'constant'
import { ValidationErrorText } from 'strings'
import { validatePresenceOf } from 'utils'

export class Media {
  protected _composition: CompositionInterface
  private _id: string

  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    this._composition = composition
    this._id = id
  }

  get id(): string {
    return this._id
  }

  setTrim<T extends typeof Media>(this: T, trim: Trim): InstanceType<T> {
    const error = validatePresenceOf({
      errorMessage: ValidationErrorText.REQUIRED_FIELD(LayerAttribute.start),
      value: trim.start,
    })

    if (error) {
      throw new Error(error)
    }

    const { end } = trim
    const start = trim.start < 0 ? 0 : trim.start

    this._updateAttribute<T>(LayerAttribute.start, start)

    if (end) {
      this._updateAttribute(LayerAttribute.end, end)
    }

    return this
  }

  _updateAttribute<T extends typeof Media>(
    this: T,
    layerAttribute: LayerAttribute,
    value: LayerAttributeValue
  ): InstanceType<T> {
    this._composition.updateLayerAttribute(this._id, layerAttribute, value)

    return this
  }
}
