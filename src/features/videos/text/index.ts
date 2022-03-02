import { CompositionInterface, LayerAttribute, LayerHorizontalAlignment, PrimitiveType, TextMethod } from 'constant'
import { VisualMedia } from 'features/videos/visualMedia'
import { CompositionErrorText } from 'strings'
import { logValidationError, validatePresenceOf, validateTextAlignment, validateValueIsOfType } from 'utils'

export class Text extends VisualMedia {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public [TextMethod.setFontFamily](fontFamily?: string): this | void {
    try {
      validateValueIsOfType(TextMethod.setFontFamily, LayerAttribute.fontFamily, fontFamily, PrimitiveType.string, true)

      return this._updateAttribute(LayerAttribute.fontFamily, fontFamily)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [TextMethod.setFontSize](fontSize?: number): this | void {
    try {
      validateValueIsOfType(TextMethod.setFontSize, LayerAttribute.fontSize, fontSize, PrimitiveType.number, true)

      return this._updateAttribute(LayerAttribute.fontSize, fontSize)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [TextMethod.setMaxFontSize](maxFontSize?: number): this | void {
    try {
      validateValueIsOfType(
        TextMethod.setMaxFontSize,
        LayerAttribute.maxFontSize,
        maxFontSize,
        PrimitiveType.number,
        true
      )

      return this._updateAttribute(LayerAttribute.maxFontSize, maxFontSize)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [TextMethod.setMaxHeight](maxHeight?: number): this | void {
    try {
      validateValueIsOfType(TextMethod.setMaxHeight, LayerAttribute.maxHeight, maxHeight, PrimitiveType.number, true)

      return this._updateAttribute(LayerAttribute.maxHeight, maxHeight)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [TextMethod.setMaxWidth](maxWidth?: number): this | void {
    try {
      validateValueIsOfType(TextMethod.setMaxWidth, LayerAttribute.maxWidth, maxWidth, PrimitiveType.number, true)

      return this._updateAttribute(LayerAttribute.maxWidth, maxWidth)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [TextMethod.setText](text: string): this | void {
    try {
      validatePresenceOf(text, CompositionErrorText.textRequired)
      validateValueIsOfType(TextMethod.setText, LayerAttribute.text, text, PrimitiveType.string, true)

      return this._updateAttribute(LayerAttribute.text, text)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }

  public [TextMethod.setTextAlignment](textAlignment?: LayerHorizontalAlignment): this | void {
    try {
      validateTextAlignment(textAlignment)

      return this._updateAttribute(LayerAttribute.textAlignment, textAlignment)
    } catch ({ stack }) {
      logValidationError(stack)
    }
  }
}
