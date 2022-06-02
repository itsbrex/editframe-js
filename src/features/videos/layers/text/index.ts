import { Mixin } from 'ts-mixer'

import {
  ChildKey,
  CompositionInterface,
  FontStyle,
  FontWeight,
  LayerAttributeValue,
  LayerKey,
  LayerType,
  PrimitiveType,
  TextAlign,
  TextHorizontalPosition,
  TextKey,
  TextMethod,
  TextPosition,
  TextVerticalPosition,
} from 'constant'
import { PositionMixin } from 'features/videos/mixins/positionMixin'
import { SizeMixin } from 'features/videos/mixins/sizeMixin'
import { TimelineMixin } from 'features/videos/mixins/timelineMixin'
import { TransitionsMixin } from 'features/videos/mixins/transitionMixin'
import { TrimMixin } from 'features/videos/mixins/trimMixin'
import { CompositionErrorText } from 'strings'
import {
  validateFontStyle,
  validateFontWeight,
  validatePresenceOf,
  validateTextAlign,
  validateTextPosition,
  validateValueIsOfType,
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

  get border(): string {
    return this._getTextAttribute<string>(TextKey.border)
  }

  get borderRadius(): number {
    return this._getTextAttribute<number>(TextKey.borderRadius)
  }

  get color(): string | undefined {
    return this._getTextAttribute<string | undefined>(TextKey.color)
  }

  get fontFamily(): string | undefined {
    return this._getTextAttribute<string | undefined>(TextKey.fontFamily)
  }

  get fontSize(): string {
    return this._getTextAttribute<string>(TextKey.fontSize)
  }

  get fontStyle(): FontStyle {
    return this._getTextAttribute<FontStyle>(TextKey.fontStyle)
  }

  get fontWeight(): FontWeight {
    return this._getTextAttribute<FontWeight>(TextKey.fontWeight)
  }

  get lineHeight(): number {
    return this._getTextAttribute<number>(TextKey.lineHeight)
  }

  get padding(): number {
    return this._getTextAttribute<number>(TextKey.padding)
  }

  get text(): string {
    return this._getTextAttribute<string>(TextKey.text)
  }

  get textAlign(): TextAlign {
    return this._getTextAttribute<TextAlign>(TextKey.textAlign)
  }

  get textDecoration(): string {
    return this._getTextAttribute<string>(TextKey.textDecoration)
  }

  get textPosition(): TextPosition {
    return this._getTextAttribute<TextPosition>(TextKey.textPosition)
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

  public [TextMethod.setBorder](border: string): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setBorder, TextKey.border, border, PrimitiveType.string, true),
      () => this._setTextAttribute(TextKey.border, border)
    )
  }

  public [TextMethod.setBorderRadius](borderRadius: number): this {
    return withValidation<this>(
      () =>
        validateValueIsOfType(
          TextMethod.setBorderRadius,
          TextKey.borderRadius,
          borderRadius,
          PrimitiveType.number,
          true
        ),
      () => this._setTextAttribute(TextKey.borderRadius, borderRadius)
    )
  }

  public [TextMethod.setColor](color: string): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setColor, TextKey.color, color, PrimitiveType.string, true),
      () => this._setTextAttribute(TextKey.color, color)
    )
  }

  public [TextMethod.setFontFamily](fontFamily: string): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setFontFamily, TextKey.fontFamily, fontFamily, PrimitiveType.string, true),
      () => this._setTextAttribute(TextKey.fontFamily, fontFamily)
    )
  }

  public [TextMethod.setFontSize](fontSize: number): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setFontSize, TextKey.fontSize, fontSize, PrimitiveType.number, true),
      () => this._setTextAttribute(TextKey.fontSize, fontSize)
    )
  }

  public [TextMethod.setFontStyle](fontStyle: FontStyle): this {
    return withValidation<this>(
      () => validateFontStyle(TextMethod.setFontStyle, fontStyle),
      () => this._setTextAttribute(TextKey.fontStyle, fontStyle)
    )
  }

  public [TextMethod.setFontWeight](fontWeight: FontWeight): this {
    return withValidation<this>(
      () => validateFontWeight(TextMethod.setFontWeight, fontWeight),
      () => this._setTextAttribute(TextKey.fontWeight, fontWeight)
    )
  }

  public [TextMethod.setLineHeight](lineHeight?: number): this {
    return withValidation<this>(
      () => validateValueIsOfType(TextMethod.setLineHeight, TextKey.lineHeight, lineHeight, PrimitiveType.number, true),
      () => this._setTextAttribute(TextKey.lineHeight, lineHeight)
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

  public [TextMethod.setTextAlign](textAlign: TextAlign): this {
    return withValidation<this>(
      () => validateTextAlign(TextMethod.setTextAlign, textAlign),
      () => this._setTextAttribute(TextKey.textAlign, textAlign)
    )
  }

  public [TextMethod.setTextDecoration](textDecoration: string): this {
    return withValidation<this>(
      () =>
        validateValueIsOfType(
          TextMethod.setTextDecoration,
          TextKey.textDecoration,
          textDecoration,
          PrimitiveType.string,
          true
        ),
      () => this._setTextAttribute(TextKey.textDecoration, textDecoration)
    )
  }

  public [TextMethod.setTextPosition](textPosition: { x: TextHorizontalPosition; y: TextVerticalPosition }): this {
    return withValidation<this>(
      () => validateTextPosition(TextMethod.setTextPosition, textPosition),
      () => this._setTextAttribute(TextKey.textPosition, textPosition)
    )
  }

  private _getTextAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.text })
  }

  private _setTextAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.text, value })
  }
}
