import { CompositionInterface, LayerAttribute, LayerHorizontalAlignment, PrimitiveType, TextMethod } from 'constant'
import { VisualMedia } from 'features/videos/visualMedia'
import { CompositionErrorText } from 'strings'
import { validatePresenceOf, validateTextAligment, validateValueIsOfType } from 'utils'

export class Text extends VisualMedia {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [TextMethod.setFontFamily](fontFamily?: string): this {
    validateValueIsOfType(TextMethod.setFontFamily, LayerAttribute.fontFamily, fontFamily, PrimitiveType.string)

    return this._updateAttribute(LayerAttribute.fontFamily, fontFamily)
  }

  public [TextMethod.setFontSize](fontSize?: number): this {
    validateValueIsOfType(TextMethod.setFontSize, LayerAttribute.fontSize, fontSize, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.fontSize, fontSize)
  }

  public [TextMethod.setMaxFontSize](maxFontSize?: number): this {
    validateValueIsOfType(TextMethod.setMaxFontSize, LayerAttribute.maxFontSize, maxFontSize, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.maxFontSize, maxFontSize)
  }

  public [TextMethod.setMaxHeight](maxHeight?: number): this {
    validateValueIsOfType(TextMethod.setMaxHeight, LayerAttribute.maxHeight, maxHeight, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.maxHeight, maxHeight)
  }

  public [TextMethod.setMaxWidth](maxWidth?: number): this {
    validateValueIsOfType(TextMethod.setMaxWidth, LayerAttribute.maxWidth, maxWidth, PrimitiveType.number)

    return this._updateAttribute(LayerAttribute.maxWidth, maxWidth)
  }

  public [TextMethod.setText](text: string): this {
    validatePresenceOf(text, CompositionErrorText.textRequired)

    return this._updateAttribute(LayerAttribute.text, text)
  }

  public [TextMethod.setTextAlignment](textAlignment?: LayerHorizontalAlignment): this {
    validateTextAligment(textAlignment)

    return this._updateAttribute(LayerAttribute.textAlignment, textAlignment)
  }
}
