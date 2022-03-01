import { CompositionInterface, LayerAttribute, LayerFormat, PrimitiveType, VisualMediaMethod } from 'constant'
import { Media } from 'features/videos/media'
import { logValidationError, validateLayerFormat, validateValueIsOfType } from 'utils'

export class VisualMedia extends Media {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [VisualMediaMethod.setBackgroundColor](backgroundColor?: string): this | void {
    try {
      validateValueIsOfType(
        VisualMediaMethod.setBackgroundColor,
        LayerAttribute.backgroundColor,
        backgroundColor,
        PrimitiveType.string,
        true
      )

      return this._updateAttribute(LayerAttribute.backgroundColor, backgroundColor)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [VisualMediaMethod.setColor](color?: string): this | void {
    try {
      validateValueIsOfType(VisualMediaMethod.setColor, LayerAttribute.color, color, PrimitiveType.string, true)

      return this._updateAttribute(LayerAttribute.color, color)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [VisualMediaMethod.setFormat](format: LayerFormat): this | void {
    try {
      validateLayerFormat(format)

      return this._updateAttribute(LayerAttribute.format, format)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [VisualMediaMethod.setHeight](height?: number): this | void {
    try {
      validateValueIsOfType(VisualMediaMethod.setHeight, LayerAttribute.height, height, PrimitiveType.number, true)

      return this._updateAttribute(LayerAttribute.height, height)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [VisualMediaMethod.setWidth](width?: number): this | void {
    try {
      validateValueIsOfType(VisualMediaMethod.setWidth, LayerAttribute.width, width, PrimitiveType.number, true)

      return this._updateAttribute(LayerAttribute.width, width)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [VisualMediaMethod.setX](x?: number): this | void {
    try {
      validateValueIsOfType(VisualMediaMethod.setX, LayerAttribute.x, x, PrimitiveType.number, true)

      return this._updateAttribute(LayerAttribute.x, x)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [VisualMediaMethod.setY](y?: number): this | void {
    try {
      validateValueIsOfType(VisualMediaMethod.setY, LayerAttribute.y, y, PrimitiveType.number, true)

      return this._updateAttribute(LayerAttribute.y, y)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }
}
