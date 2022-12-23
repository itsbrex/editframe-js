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

  get angle(): number {
    return this._getPositionAttribute<number>(PositionKey.angle)
  }

  get angleX(): number {
    return this._getPositionAttribute<number>(PositionKey.angleX)
  }

  get angleY(): number {
    return this._getPositionAttribute<number>(PositionKey.angleY)
  }

  get isRelative(): boolean | undefined {
    return this._getPositionAttribute<boolean | undefined>(PositionKey.isRelative)
  }

  get origin(): string {
    return this._getPositionAttribute<string>(PositionKey.origin)
  }

  get x(): X | undefined {
    return this._getPositionAttribute<X | undefined>(PositionKey.x)
  }

  get y(): Y | undefined {
    return this._getPositionAttribute<Y | undefined>(PositionKey.y)
  }
  get z(): number | undefined {
    return this._getPositionAttribute<number>(PositionKey.z)
  }

  public [PositionMethod.setAngle](angle = 0): this {
    return withValidation<this>(
      () => validatePositionMixin(PositionMethod.setAngle, { position: { angle } }),
      () => this._setPositionAttribute(PositionKey.angle, angle)
    )
  }

  public [PositionMethod.setAngleX](angleX = 0): this {
    return withValidation<this>(
      () => validatePositionMixin(PositionMethod.setAngleX, { position: { angleX } }),
      () => this._setPositionAttribute(PositionKey.angleX, angleX)
    )
  }

  public [PositionMethod.setAngleY](angleY = 0): this {
    return withValidation<this>(
      () => validatePositionMixin(PositionMethod.setAngleY, { position: { angleY } }),
      () => this._setPositionAttribute(PositionKey.angleY, angleY)
    )
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

  public [PositionMethod.setOrigin](origin: string): this {
    return withValidation<this>(
      () => validatePositionMixin(PositionMethod.setOrigin, { position: { origin } }),
      () => this._setPositionAttribute(PositionKey.origin, origin)
    )
  }

  public [PositionMethod.setY](y?: Y): this {
    return withValidation<this>(
      () => validatePositionMixin(PositionMethod.setY, { position: { y } }),
      () => this._setPositionAttribute(PositionKey.y, y)
    )
  }
  public [PositionMethod.setZ](z?: number): this {
    return withValidation<this>(
      () => validatePositionMixin(PositionMethod.setZ, { position: { z } }),
      () => this._setPositionAttribute(PositionKey.z, z)
    )
  }

  private _getPositionAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.position })
  }

  private _setPositionAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.position, value })
  }
}
