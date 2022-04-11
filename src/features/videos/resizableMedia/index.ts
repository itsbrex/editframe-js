import { CompositionInterface, LayerAttribute, LayerFormat, PrimitiveType, ResizableMediaMethod, Size } from 'constant'
import { Media } from 'features/videos/media'
import { ValidationErrorText } from 'strings'
import { validateLayerFormat, validatePresenceOf, validateValueIsOfType, withValidation } from 'utils'

export class ResizableMedia extends Media {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  [ResizableMediaMethod.setDimensions]({ height, width }: Size): this | void {
    withValidation<this>(
      () => {
        validatePresenceOf(height, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.height))
        validatePresenceOf(width, ValidationErrorText.REQUIRED_FIELD(LayerAttribute.width))
      },
      () => {
        this._updateAttribute(LayerAttribute.height, height)

        return this._updateAttribute(LayerAttribute.width, width)
      }
    )
  }

  public [ResizableMediaMethod.setFormat](format: LayerFormat): this | void {
    withValidation<this>(
      () => validateLayerFormat(format),
      () => this._updateAttribute(LayerAttribute.format, format)
    )
  }

  public [ResizableMediaMethod.setHeight](height?: number): this | void {
    withValidation<this>(
      () =>
        validateValueIsOfType(
          ResizableMediaMethod.setHeight,
          LayerAttribute.height,
          height,
          PrimitiveType.number,
          true
        ),
      () => this._updateAttribute(LayerAttribute.height, height)
    )
  }

  public [ResizableMediaMethod.setWidth](width?: number): this | void {
    withValidation<this>(
      () =>
        validateValueIsOfType(ResizableMediaMethod.setWidth, LayerAttribute.width, width, PrimitiveType.number, true),
      () => this._updateAttribute(LayerAttribute.width, width)
    )
  }
}
