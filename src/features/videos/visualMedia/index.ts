import { CompositionInterface, LayerAttribute, LayerFormat, PrimitiveType, VisualMediaMethod } from 'constant'
import { Media } from 'features/videos/media'
import { validateLayerFormat, validateValueIsOfType } from 'utils'

export class VisualMedia extends Media {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [VisualMediaMethod.setBackgroundColor](backgroundColor?: string): this {
    validateValueIsOfType(VisualMediaMethod.setBackgroundColor, backgroundColor, PrimitiveType.string)

    return this._updateAttribute(LayerAttribute.backgroundColor, backgroundColor)
  }

  public [VisualMediaMethod.setColor](color?: string): this {
    validateValueIsOfType(VisualMediaMethod.setColor, color, PrimitiveType.string)

    return this._updateAttribute(LayerAttribute.color, color)
  }

  public [VisualMediaMethod.setFormat](format: LayerFormat): this {
    const error = validateLayerFormat(format)

    if (error) {
      throw new Error(error)
    }

    return this._updateAttribute(LayerAttribute.format, format)
  }

  public [VisualMediaMethod.setHeight](height?: number): this {
    validateValueIsOfType(VisualMediaMethod.setHeight, height, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.height, height)
  }

  public [VisualMediaMethod.setWidth](width?: number): this {
    validateValueIsOfType(VisualMediaMethod.setWidth, width, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.width, width)
  }

  public [VisualMediaMethod.setX](x?: number): this {
    validateValueIsOfType(VisualMediaMethod.setX, x, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.x, x)
  }

  public [VisualMediaMethod.setY](y?: number): this {
    validateValueIsOfType(VisualMediaMethod.setY, y, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.y, y)
  }
}
