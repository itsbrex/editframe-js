import { CompositionInterface, LayerAttribute, LayerFormat } from 'constant'
import { Media } from 'features/videos/media'
import { validateLayerFormat } from 'utils'

export class VisualMedia extends Media {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public setBackgroundColor(backgroundColor?: string): this {
    return this._updateAttribute(LayerAttribute.backgroundColor, backgroundColor)
  }

  public setColor(color?: string): this {
    return this._updateAttribute(LayerAttribute.color, color)
  }

  public setFormat(format: LayerFormat): this {
    const error = validateLayerFormat(format)

    if (error) {
      throw new Error(error)
    }

    return this._updateAttribute(LayerAttribute.format, format)
  }

  public setHeight(height?: number): this {
    return this._updateAttribute(LayerAttribute.height, height)
  }

  public setWidth(width?: number): this {
    return this._updateAttribute(LayerAttribute.width, width)
  }

  public setX(x?: number): this {
    return this._updateAttribute(LayerAttribute.x, x)
  }

  public setY(y?: number): this {
    return this._updateAttribute(LayerAttribute.y, y)
  }
}
