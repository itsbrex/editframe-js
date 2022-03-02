import { CompositionInterface, LayerAttribute, LayerFormat, PrimitiveType, VisualMediaMethod } from 'constant'
import { Media } from 'features/videos/media'
import { validateLayerFormat, validateValueIsOfType, withValidation } from 'utils'

export class VisualMedia extends Media {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [VisualMediaMethod.setBackgroundColor](backgroundColor?: string): this | void {
    withValidation<this>(
      () =>
        validateValueIsOfType(
          VisualMediaMethod.setBackgroundColor,
          LayerAttribute.backgroundColor,
          backgroundColor,
          PrimitiveType.string,
          true
        ),
      () => this._updateAttribute(LayerAttribute.backgroundColor, backgroundColor)
    )
  }

  public [VisualMediaMethod.setColor](color?: string): this | void {
    withValidation<this>(
      () => validateValueIsOfType(VisualMediaMethod.setColor, LayerAttribute.color, color, PrimitiveType.string, true),
      () => this._updateAttribute(LayerAttribute.color, color)
    )
  }

  public [VisualMediaMethod.setFormat](format: LayerFormat): this | void {
    withValidation<this>(
      () => validateLayerFormat(format),
      () => this._updateAttribute(LayerAttribute.format, format)
    )
  }

  public [VisualMediaMethod.setHeight](height?: number): this | void {
    withValidation<this>(
      () =>
        validateValueIsOfType(VisualMediaMethod.setHeight, LayerAttribute.height, height, PrimitiveType.number, true),
      () => this._updateAttribute(LayerAttribute.height, height)
    )
  }

  public [VisualMediaMethod.setWidth](width?: number): this | void {
    withValidation<this>(
      () => validateValueIsOfType(VisualMediaMethod.setWidth, LayerAttribute.width, width, PrimitiveType.number, true),
      () => this._updateAttribute(LayerAttribute.width, width)
    )
  }

  public [VisualMediaMethod.setX](x?: number): this | void {
    withValidation<this>(
      () => validateValueIsOfType(VisualMediaMethod.setX, LayerAttribute.x, x, PrimitiveType.number, true),
      () => this._updateAttribute(LayerAttribute.x, x)
    )
  }

  public [VisualMediaMethod.setY](y?: number): this | void {
    withValidation<this>(
      () => validateValueIsOfType(VisualMediaMethod.setY, LayerAttribute.y, y, PrimitiveType.number, true),
      () => this._updateAttribute(LayerAttribute.y, y)
    )
  }
}
