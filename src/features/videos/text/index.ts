import { CompositionInterface, LayerAttribute, LayerHorizontalAlignment } from 'constant'
import { VisualMedia } from 'features/videos/visualMedia'
import { CompositionErrorText } from 'strings'
import { validatePresenceOf, validateTextAligment } from 'utils'

export class Text extends VisualMedia {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  public setFontFamily(fontFamily?: string): this {
    return this._updateAttribute(LayerAttribute.fontFamily, fontFamily)
  }

  public setFontSize(fontSize?: number): this {
    return this._updateAttribute(LayerAttribute.fontSize, fontSize)
  }

  public setMaxFontSize(maxFontSize?: number): this {
    return this._updateAttribute(LayerAttribute.maxFontSize, maxFontSize)
  }

  public setMaxHeight(maxHeight?: number): this {
    return this._updateAttribute(LayerAttribute.maxHeight, maxHeight)
  }

  public setMaxWidth(maxWidth?: number): this {
    return this._updateAttribute(LayerAttribute.maxWidth, maxWidth)
  }

  public setText(text: string): this {
    const error = validatePresenceOf({ errorMessage: CompositionErrorText.textRequired, value: text })

    if (error) {
      throw new Error(error)
    }

    return this._updateAttribute(LayerAttribute.text, text)
  }

  public setTextAlignment(textAlignment?: LayerHorizontalAlignment): this {
    const error = validateTextAligment(textAlignment)

    if (error) {
      throw new Error(error)
    }

    return this._updateAttribute(LayerAttribute.textAlignment, textAlignment)
  }
}
