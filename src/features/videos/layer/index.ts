import { CompositionInterface, LayerAttribute, LayerAttributeValue } from 'constant'

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

  public setStart(start?: number): this {
    return this._updateAttribute(LayerAttribute.start, start)
  }

  public setLength(length?: number): this {
    return this._updateAttribute(LayerAttribute.length, length)
  }

  _updateAttribute(layerAttribute: LayerAttribute, value: LayerAttributeValue): this {
    this._composition.updateLayerAttribute(this._id, layerAttribute, value)

    return this
  }
}
