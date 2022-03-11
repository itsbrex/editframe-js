import { CompositionInterface, FontWeight, LayerAttribute, PrimitiveType, TextAlignment, TextMethod } from 'constant'
import { VisualMedia } from 'features/videos/visualMedia'
import { CompositionErrorText } from 'strings'
import {
  validatePresenceOf,
  validateTextAlignment,
  validateValueIsOfType,
  validateValueIsOfTypes,
  withValidation,
} from 'utils'

export class Text extends VisualMedia {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [TextMethod.setFontFamily](fontFamily?: string): this | void {
    return withValidation<this>(
      () =>
        validateValueIsOfType(
          TextMethod.setFontFamily,
          LayerAttribute.fontFamily,
          fontFamily,
          PrimitiveType.string,
          true
        ),
      () => this._updateAttribute(LayerAttribute.fontFamily, fontFamily)
    )
  }

  public [TextMethod.setFontSize](fontSize?: number): this | void {
    return withValidation<this>(
      () =>
        validateValueIsOfType(TextMethod.setFontSize, LayerAttribute.fontSize, fontSize, PrimitiveType.number, true),
      () => this._updateAttribute(LayerAttribute.fontSize, fontSize)
    )
  }

  public [TextMethod.setFontWeight](fontWeight?: FontWeight): this | void {
    return withValidation<this>(
      () =>
        validateValueIsOfTypes(
          TextMethod.setFontWeight,
          LayerAttribute.fontWeight,
          fontWeight,
          [PrimitiveType.number, PrimitiveType.string],
          true
        ),
      () => this._updateAttribute(LayerAttribute.fontWeight, fontWeight)
    )
  }

  public [TextMethod.setLineHeight](lineHeight?: number): this | void {
    return withValidation<this>(
      () =>
        validateValueIsOfType(
          TextMethod.setLineHeight,
          LayerAttribute.lineHeight,
          lineHeight,
          PrimitiveType.number,
          true
        ),
      () => this._updateAttribute(LayerAttribute.lineHeight, lineHeight)
    )
  }

  public [TextMethod.setMaxFontSize](maxFontSize?: number): this | void {
    withValidation<this>(
      () =>
        validateValueIsOfType(
          TextMethod.setMaxFontSize,
          LayerAttribute.maxFontSize,
          maxFontSize,
          PrimitiveType.number,
          true
        ),
      () => this._updateAttribute(LayerAttribute.maxFontSize, maxFontSize)
    )
  }

  public [TextMethod.setMaxHeight](maxHeight?: number): this | void {
    withValidation<this>(
      () =>
        validateValueIsOfType(TextMethod.setMaxHeight, LayerAttribute.maxHeight, maxHeight, PrimitiveType.number, true),
      () => this._updateAttribute(LayerAttribute.maxHeight, maxHeight)
    )
  }

  public [TextMethod.setMaxWidth](maxWidth?: number): this | void {
    withValidation<this>(
      () =>
        validateValueIsOfType(TextMethod.setMaxWidth, LayerAttribute.maxWidth, maxWidth, PrimitiveType.number, true),
      () => this._updateAttribute(LayerAttribute.maxWidth, maxWidth)
    )
  }

  public [TextMethod.setText](text: string): this | void {
    withValidation<this>(
      () => {
        validatePresenceOf(text, CompositionErrorText.textRequired)
        validateValueIsOfType(TextMethod.setText, LayerAttribute.text, text, PrimitiveType.string, true)
      },
      () => this._updateAttribute(LayerAttribute.text, text)
    )
  }

  public [TextMethod.setTextAlignment](textAlign?: TextAlignment): this | void {
    withValidation<this>(
      () => validateTextAlignment(TextMethod.setTextAlignment, textAlign),
      () => this._updateAttribute(LayerAttribute.textAlign, textAlign)
    )
  }
}
