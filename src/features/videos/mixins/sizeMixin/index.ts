import {
  ChildKey,
  CompositionInterface,
  Dimensions,
  Format,
  LayerAttributeValue,
  LayerKey,
  SizeKey,
  SizeMethod,
  SizeOptions,
} from 'constant'
import { Layer } from 'features/videos/layer'
import { validateSizeMixin, withValidation } from 'utils'

export class SizeMixin extends Layer {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get dimensions(): Omit<SizeOptions, SizeKey.format> {
    return this._composition.getLayerAttribute<Omit<SizeOptions, SizeKey.format>>({
      id: this.id,
      layerKey: LayerKey.size,
    })
  }

  get format(): Format {
    return this._getSizeAttribute<Format>(SizeKey.format)
  }

  get height(): number {
    return this._getSizeAttribute<number>(SizeKey.height)
  }

  get scale(): number {
    return this._getSizeAttribute<number>(SizeKey.scale)
  }

  get width(): number {
    return this._getSizeAttribute<number>(SizeKey.width)
  }

  [SizeMethod.setDimensions]({ height, width }: Dimensions): this {
    return withValidation<this>(
      () => validateSizeMixin(SizeMethod.setDimensions, { size: { height, width } }),
      () => {
        this._setSizeAttribute(SizeKey.height, height)

        return this._setSizeAttribute(SizeKey.width, width)
      }
    )
  }

  public [SizeMethod.setFormat](format: Format): this {
    return withValidation<this>(
      () => validateSizeMixin(SizeMethod.setFormat, { size: { format } }),
      () => this._setSizeAttribute(SizeKey.format, format)
    )
  }

  public [SizeMethod.setHeight](height?: number): this {
    return withValidation<this>(
      () => validateSizeMixin(SizeMethod.setHeight, { size: { height } }),
      () => this._setSizeAttribute(SizeKey.height, height)
    )
  }

  public [SizeMethod.setScale](scale = 1): this {
    return withValidation<this>(
      () => validateSizeMixin(SizeMethod.setScale, { size: { scale } }),
      () => this._setSizeAttribute(SizeKey.scale, scale)
    )
  }

  public [SizeMethod.setWidth](width?: number): this {
    return withValidation<this>(
      () => validateSizeMixin(SizeMethod.setWidth, { size: { width } }),
      () => this._setSizeAttribute(SizeKey.width, width)
    )
  }

  private _getSizeAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.size })
  }

  private _setSizeAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.size, value })
  }
}
