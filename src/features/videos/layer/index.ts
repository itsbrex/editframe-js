import { CompositionInterface, LayerAttribute, LayerAttributeValue, LayerMethod, PrimitiveType } from 'constant'
import { validateValueIsOfType, withValidation } from 'utils'

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

  get start(): number | undefined {
    return this._composition.getLayerAttribute<number | undefined>(this.id, LayerAttribute.start)
  }

  public [LayerMethod.setStart](start?: number): this | void {
    return withValidation<this>(
      () => validateValueIsOfType(LayerMethod.setStart, LayerAttribute.start, start, PrimitiveType.number, true),
      () => this._updateAttribute(LayerAttribute.start, start)
    )
  }

  _updateAttribute(layerAttribute: LayerAttribute, value: LayerAttributeValue): this {
    this._composition.updateLayerAttribute(this._id, layerAttribute, value)

    return this
  }
}
