import {
  ChildKey,
  CompositionInterface,
  LayerAttributeValue,
  LayerKey,
  PositionKey,
  PositionMethod,
  X,
  Y,
} from 'constant'
import { Layer } from 'features/videos/layer'
import { validatePositionMixin, withValidation } from 'utils'

export class PositionMixin extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get isRelative(): boolean | undefined {
    return this._getPositionAttribute<boolean | undefined>(PositionKey.isRelative)
  }

  get x(): X | undefined {
    return this._getPositionAttribute<X | undefined>(PositionKey.x)
  }

  get y(): Y | undefined {
    return this._getPositionAttribute<Y | undefined>(PositionKey.y)
  }

  public [PositionMethod.setIsRelative](isRelative = false): this {
    return withValidation<this>(
      () => validatePositionMixin(PositionMethod.setIsRelative, { position: { isRelative } }),
      () => this._setPositionAttribute(PositionKey.isRelative, isRelative)
    )
  }

  public [PositionMethod.setX](x?: X): this {
    return withValidation<this>(
      () => validatePositionMixin(PositionMethod.setX, { position: { x } }),
      () => this._setPositionAttribute(PositionKey.x, x)
    )
  }

  public [PositionMethod.setY](y?: Y): this {
    return withValidation<this>(
      () => validatePositionMixin(PositionMethod.setY, { position: { y } }),
      () => this._setPositionAttribute(PositionKey.y, y)
    )
  }

  private _getPositionAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.position })
  }

  private _setPositionAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.position, value })
  }
}
