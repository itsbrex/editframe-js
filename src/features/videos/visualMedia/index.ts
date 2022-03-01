import { CompositionInterface, LayerAttribute, LayerFormat, PrimitiveType, VisualMediaMethod } from 'constant'
import { Media } from 'features/videos/media'
import { validateLayerFormat, validateValueIsOfType } from 'utils'

export class VisualMedia extends Media {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [VisualMediaMethod.setBackgroundColor](backgroundColor?: string): this {
    validateValueIsOfType(
      VisualMediaMethod.setBackgroundColor,
      LayerAttribute.backgroundColor,
      backgroundColor,
      PrimitiveType.string
    )

    return this._updateAttribute(LayerAttribute.backgroundColor, backgroundColor)
  }

  public [VisualMediaMethod.setColor](color?: string): this {
    validateValueIsOfType(VisualMediaMethod.setColor, LayerAttribute.color, color, PrimitiveType.string)

    return this._updateAttribute(LayerAttribute.color, color)
  }

  public [VisualMediaMethod.setFormat](format: LayerFormat): this {
    validateLayerFormat(format)

    return this._updateAttribute(LayerAttribute.format, format)
  }

  public [VisualMediaMethod.setHeight](height?: number): this {
    validateValueIsOfType(VisualMediaMethod.setHeight, LayerAttribute.height, height, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.height, height)
  }

  public [VisualMediaMethod.setWidth](width?: number): this {
    validateValueIsOfType(VisualMediaMethod.setWidth, LayerAttribute.width, width, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.width, width)
  }

  public [VisualMediaMethod.setX](x?: number): this {
    validateValueIsOfType(VisualMediaMethod.setX, LayerAttribute.x, x, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.x, x)
  }

  public [VisualMediaMethod.setY](y?: number): this {
    validateValueIsOfType(VisualMediaMethod.setY, LayerAttribute.y, y, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.y, y)
  }
}
