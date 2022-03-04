import { CompositionInterface, LayerAttribute, LayerAttributeValue, LayerMethod, PrimitiveType } from 'constant'
import { logValidationError, validateValueIsOfType } from 'utils'

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

  public [LayerMethod.setStart](start?: number): this | void {
    try {
      if (start) {
        validateValueIsOfType(LayerMethod.setStart, LayerAttribute.start, start, PrimitiveType.number, true)
      }

      return this._updateAttribute(LayerAttribute.start, start)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [LayerMethod.setLength](length?: number): this | void {
    try {
      if (length) {
        validateValueIsOfType(LayerMethod.setLength, LayerAttribute.length, length, PrimitiveType.number, true)
      }

      return this._updateAttribute(LayerAttribute.length, length)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  _updateAttribute(layerAttribute: LayerAttribute, value: LayerAttributeValue): this {
    this._composition.updateLayerAttribute(this._id, layerAttribute, value)

    return this
  }
}
