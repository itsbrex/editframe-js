import { Mixin } from 'ts-mixer'

import {
  ChildKey,
  CompositionInterface,
  LayerAttributeValue,
  LayerKey,
  LayerType,
  PrimitiveType,
  SubtitlesKey,
  SubtitlesMethod,
} from 'constant'
import { PositionMixin } from 'features/videos/mixins/positionMixin'
import { TimelineMixin } from 'features/videos/mixins/timelineMixin'
import { TransitionsMixin } from 'features/videos/mixins/transitionMixin'
import { TrimMixin } from 'features/videos/mixins/trimMixin'
import { validateValueIsOfType, withValidation } from 'utils'

export class Subtitles extends Mixin(PositionMixin, TimelineMixin, TransitionsMixin, TrimMixin) {
  constructor({ composition, id }: { composition: CompositionInterface; id: string }) {
    super({ composition, id })
  }

  get type(): LayerType {
    return LayerType.subtitles
  }

  get backgroundColor(): string | undefined {
    return this._getSubtitlesAttribute<string | undefined>(SubtitlesKey.backgroundColor)
  }

  get color(): string | undefined {
    return this._getSubtitlesAttribute<string | undefined>(SubtitlesKey.color)
  }

  get fontSize(): number | undefined {
    return this._getSubtitlesAttribute<number | undefined>(SubtitlesKey.fontSize)
  }

  public [SubtitlesMethod.setBackgroundColor](color?: string): this {
    return withValidation<this>(
      () =>
        validateValueIsOfType(
          SubtitlesMethod.setBackgroundColor,
          SubtitlesKey.backgroundColor,
          color,
          PrimitiveType.string,
          true
        ),
      () => this._setSubtitlesAttribute(SubtitlesKey.backgroundColor, color)
    )
  }

  public [SubtitlesMethod.setColor](color?: string): this {
    return withValidation<this>(
      () => validateValueIsOfType(SubtitlesMethod.setColor, SubtitlesKey.color, color, PrimitiveType.string, true),
      () => this._setSubtitlesAttribute(SubtitlesKey.color, color)
    )
  }

  public [SubtitlesMethod.setFontSize](size?: number): this {
    return withValidation<this>(
      () => validateValueIsOfType(SubtitlesMethod.setFontSize, SubtitlesKey.fontSize, size, PrimitiveType.number, true),
      () => this._setSubtitlesAttribute(SubtitlesKey.fontSize, size)
    )
  }

  private _getSubtitlesAttribute<AttributeValue>(childKey: ChildKey): AttributeValue {
    return this.getAttribute<AttributeValue>({ childKey, layerKey: LayerKey.subtitles })
  }

  private _setSubtitlesAttribute(childKey: ChildKey, value: LayerAttributeValue): this {
    return this.setAttribute({ childKey, layerKey: LayerKey.subtitles, value })
  }
}
