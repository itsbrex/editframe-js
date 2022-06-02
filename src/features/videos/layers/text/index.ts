import { Mixin } from 'ts-mixer'

import {
  ChildKey,
  CompositionInterface,
  FontWeight,
  LayerAttributeValue,
  LayerKey,
  LayerType,
  PrimitiveType,
  TextAlignment,
  TextKey,
  TextMethod,
} from 'constant'
import { PositionMixin } from 'features/videos/mixins/positionMixin'
import { SizeMixin } from 'features/videos/mixins/sizeMixin'
import { TimelineMixin } from 'features/videos/mixins/timelineMixin'
import { TransitionsMixin } from 'features/videos/mixins/transitionMixin'
import { TrimMixin } from 'features/videos/mixins/trimMixin'
import { CompositionErrorText } from 'strings'
import {
  validatePresenceOf,
  validateTextAlignment,
  validateValueIsOfType,
  validateValueIsOfTypes,
  withValidation,
} from 'utils'

export class Text extends Mixin(PositionMixin, SizeMixin, TimelineMixin, TransitionsMixin, TrimMixin) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get type(): LayerType {
    return LayerType.text
  }

  get backgroundColor(): string | undefined {
    return this._getTextAttribute<string | undefined>(TextKey.backgroundColor)
  }

  get color(): string | undefined {
    return this._getTextAttribute<string | undefined>(TextKey.color)
  }

  get fontFamily(): string | undefined {
    return this._getTextAttribute<string | undefined>(TextKey.fontFamily)
  }

  get fontSize(): string | undefined {
    return this._getTextAttribute<string | undefined>(TextKey.fontSize)
  }

  get fontWeight(): FontWeight | undefined {
    return this._getTextAttribute<FontWeight | undefined>(TextKey.fontWeight)
  }

  get lineHeight(): number | undefined {
    return this._getTextAttribute<number | undefined>(TextKey.lineHeight)
  }

  get maxFontSize(): number | undefined {
    return this._getTextAttribute<number | undefined>(TextKey.maxFontSize)
  }

  get maxHeight(): number | undefined {
    return this._getTextAttribute<number | undefined>(TextKey.maxHeight)
  }

  get maxWidth(): number | undefined {
    return this._getTextAttribute<number | undefined>(TextKey.maxWidth)
  }

  get padding(): number {
    return this._getTextAttribute<number>(TextKey.padding)
  }

  get text(): string {
    return this._getTextAttribute<string>(TextKey.text)
  }

  get textAlignment(): TextAlignment | undefined {
    return this._getTextAttribute<TextAlignment | undefined>(TextKey.textAlign)
  }

  public [TextMethod.setBackgroundColor](backgroundColor: string): this {
    return withValidation<this>(
      () =>
        validateValueIsOfType(
          TextMethod.setBackgroundColor,
          TextKey.backgroundColor,
          backgroundColor,
          PrimitiveType.string,
          true
        ),
      () => this._setTextAttribute(TextKey.backgroundColor, backgroundColor)
    )
  }

  public [TextMethod.setColor](color?: string): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setColor, TextKey.color, color, PrimitiveType.string, true),
      () => this._setTextAttribute(TextKey.color, color)
    )
  }

  public [TextMethod.setFontFamily](fontFamily?: string): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setFontFamily, TextKey.fontFamily, fontFamily, PrimitiveType.string, true),
      () => this._setTextAttribute(TextKey.fontFamily, fontFamily)
    )
  }

  public [TextMethod.setFontSize](fontSize?: number): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setFontSize, TextKey.fontSize, fontSize, PrimitiveType.number, true),
      () => this._setTextAttribute(TextKey.fontSize, fontSize)
    )
  }

  public [TextMethod.setFontWeight](fontWeight?: FontWeight): this {
    return withValidation<this>(
      () =>
        validateValueIsOfTypes(
          TextMethod.setFontWeight,
          TextKey.fontWeight,
          fontWeight,
          [PrimitiveType.number, PrimitiveType.string],
          true
        ),
      () => this._setTextAttribute(TextKey.fontWeight, fontWeight)
    )
  }

  public [TextMethod.setLineHeight](lineHeight?: number): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setLineHeight, TextKey.lineHeight, lineHeight, PrimitiveType.number, true),
      () => this._setTextAttribute(TextKey.lineHeight, lineHeight)
    )
  }

  public [TextMethod.setMaxFontSize](maxFontSize?: number): this {
    return withValidation<this>(
      () =>
        validateValueIsOfType(TextMethod.setMaxFontSize, TextKey.maxFontSize, maxFontSize, PrimitiveType.number, true),
      () => this._setTextAttribute(TextKey.maxFontSize, maxFontSize)
    )
  }

  public [TextMethod.setMaxHeight](maxHeight?: number): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setMaxHeight, TextKey.maxHeight, maxHeight, PrimitiveType.number, true),
      () => this._setTextAttribute(TextKey.maxHeight, maxHeight)
    )
  }

  public [TextMethod.setMaxWidth](maxWidth?: number): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setMaxWidth, TextKey.maxWidth, maxWidth, PrimitiveType.number, true),
      () => this._setTextAttribute(TextKey.maxWidth, maxWidth)
    )
  }

  public [TextMethod.setPadding](padding: number): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setPadding, TextKey.padding, padding, PrimitiveType.number, true),
      () => this._setTextAttribute(TextKey.padding, padding)
    )
  }

  public [TextMethod.setText](text: string): this {
    return withValidation<this>(
      () => {
        validatePresenceOf(text, CompositionErrorText.textRequired)
        validateValueIsOfType(TextMethod.setText, TextKey.text, text, PrimitiveType.string, true)
      },
      () => this._setTextAttribute(TextKey.text, text)
    )
  }

  public [TextMethod.setTextAlignment](textAlign?: TextAlignment): this {
    return withValidation<this>(
      () => validateTextAlignment(TextMethod.setTextAlignment, textAlign),
      () => this._setTextAttribute(TextKey.textAlign, textAlign)
    )
  }

  private _getTextAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.text })
  }

  private _setTextAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.text, value })
  }
}
