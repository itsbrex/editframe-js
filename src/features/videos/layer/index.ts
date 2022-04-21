import { ChildKey, CompositionInterface, LayerAttributeValue, LayerKey } from 'constant'

export class Layer {
  protected _composition: CompositionInterface
  private _id: string

  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    this._composition = composition
    this._id = id
  }

  get id(): string {
    return this._id
  }

  public getAttribute<Value>({ childKey, layerKey }: { childKey?: ChildKey; layerKey: LayerKey }): Value {
    return this._composition.getLayerAttribute<Value>({ childKey, id: this.id, layerKey })
  }

  public setAttribute({
    childKey,
    layerKey,
    value,
  }: {
    childKey?: ChildKey
    layerKey: LayerKey
    value: LayerAttributeValue
  }): this {
    this._composition.setLayerAttribute({ childKey, id: this._id, layerKey, value })

    return this
  }
}
